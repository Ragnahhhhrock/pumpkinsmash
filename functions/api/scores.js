// Global high score table for Pumpkin Smash.
// Cloudflare Pages Function at /api/scores, backed by the same D1 database (binding `DB`) as /api/smashes.
//   GET  /api/scores?limit=10        -> { scores: [{ name, score, date }] }
//   POST /api/scores { name, score } -> { rank, scores }   (rank is 1-based across all scores)

const MAX_SCORE = 1000000;     // far above any real game; rejects obvious junk
const MAX_LIMIT = 50;
const RATE_PER_MIN = 6;        // submissions per IP per minute
let ready = false;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });

async function init(db) {
  if (ready) return;
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, score INTEGER NOT NULL, created INTEGER NOT NULL)'),
    db.prepare('CREATE INDEX IF NOT EXISTS scores_rank ON scores (score DESC, created ASC)'),
    db.prepare('CREATE TABLE IF NOT EXISTS score_rate (ip TEXT NOT NULL, minute INTEGER NOT NULL, n INTEGER NOT NULL, PRIMARY KEY (ip, minute))')
  ]);
  ready = true;
}

const top = (db, limit) =>
  db.prepare('SELECT name, score, created AS date FROM scores ORDER BY score DESC, created ASC LIMIT ?')
    .bind(limit).all().then((r) => r.results);

function cleanName(raw) {
  return String(raw ?? '')
    .normalize('NFC')
    .replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, '')
    .trim()
    .slice(0, 10) || 'Anon';
}

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: 'scores not configured' }, 503);
  await init(env.DB);
  const asked = parseInt(new URL(request.url).searchParams.get('limit'), 10);
  const limit = Math.min(Math.max(asked || 10, 1), MAX_LIMIT);
  return json({ scores: await top(env.DB, limit) });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'scores not configured' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  const score = Math.floor(Number(body && body.score));
  if (!Number.isFinite(score) || score < 1 || score > MAX_SCORE) return json({ error: 'bad score' }, 400);
  const name = cleanName(body.name);

  await init(env.DB);
  const db = env.DB;

  // simple per-IP rate limit
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const minute = Math.floor(Date.now() / 60000);
  const rate = await db
    .prepare('INSERT INTO score_rate (ip, minute, n) VALUES (?1, ?2, 1) ON CONFLICT(ip, minute) DO UPDATE SET n = n + 1 RETURNING n')
    .bind(ip, minute).first();
  if (rate.n > RATE_PER_MIN) return json({ error: 'slow down' }, 429);
  if (Math.random() < 0.05) await db.prepare('DELETE FROM score_rate WHERE minute < ?').bind(minute - 5).run();

  const created = Date.now();
  await db.prepare('INSERT INTO scores (name, score, created) VALUES (?1, ?2, ?3)').bind(name, score, created).run();
  const above = await db
    .prepare('SELECT COUNT(*) AS n FROM scores WHERE score > ?1 OR (score = ?1 AND created < ?2)')
    .bind(score, created).first();
  return json({ rank: above.n + 1, entry: { name, score, date: created }, scores: await top(db, 10) });
}
