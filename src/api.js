export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  'https://petaloid-mariella-enorm.ngrok-free.dev';

  const text = await r.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { ok:false, error:'bad_json', detail:text }; }
  if (!r.ok) throw new Error(data?.detail || data?.error || `HTTP ${r.status}`);
  return data;