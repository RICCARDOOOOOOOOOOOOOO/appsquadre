// src/services/auth.js

const API_BASE = 'https://gestione.parrocchiacarpaneto.com/servizi/api/login';

export const getToken = () => localStorage.getItem('token') || null;
export const setToken = (t) => localStorage.setItem('token', t);
export const clearToken = () => localStorage.removeItem('token');

export const authHeader = () => ({
  'Content-Type': 'application/json',
  Customauthorization: 'Bearer ' + getToken(),
});

export async function isTokenValid() {
  const tk = getToken();
  if (!tk) return false;

  try {
    const res = await fetch(`${API_BASE}/checkSession.php`, {
      headers: authHeader(),
    });
    return res.ok;
  } catch {
    return false;
  }
}