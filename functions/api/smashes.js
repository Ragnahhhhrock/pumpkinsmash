// Global "pumpkins smashed" counter for every player, every game.
// Cloudflare Pages Function at /api/smashes, backed by a D1 database bound as `DB`.
//   GET  /api/smashes            -> { total }
//   POST /api/smashes { count }  -> { total }   (count is clamped to 1..MAX_PER_POST)

const KEY = 'smashed';
const MAX_PER_POST = 1000;   // far above any real game; caps abuse from a single request
let ready = false;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });

async function init(db) {
  if (ready) return;
  await db.prepare('CREATE TABLE IF NOT EXISTS counters (name TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0)').run();
  ready = true;
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'counter not configured' }, 503);
  await init(env.DB);
  const row = await env.DB.prepare('SELECT n FROM counters WHERE name = ?').bind(KEY).first();
  return json({ total: row ? row.n : 0 });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: 'counter not configured' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400); }
  const count = Math.floor(Number(body && body.count));
  if (!Number.isFinite(count) || count < 1) return json({ error: 'bad count' }, 400);

  await init(env.DB);
  const row = await env.DB
    .prepare('INSERT INTO counters (name, n) VALUES (?1, ?2) ON CONFLICT(name) DO UPDATE SET n = n + excluded.n RETURNING n')
    .bind(KEY, Math.min(count, MAX_PER_POST))
    .first();
  return json({ total: row.n });
}
