import { useEffect } from 'react';
import { isTokenValid, setToken, clearToken } from './services/auth';
import SquadGenerator from './Components/SquadGenerator'

const LOGIN_URL =
  'https://gestione.parrocchiacarpaneto.com/login/#/?returnUrl=' +
  encodeURIComponent(
    location.hostname === 'localhost'
      ? 'http://localhost:5173'
      : 'https://gestione.parrocchiacarpaneto.com/squadre',
  );

function App() {
  useEffect(() => {
    (async () => {
      const qs = new URLSearchParams(location.search);
      const tk = qs.get('token');
      if (tk) {
        setToken(tk);
        qs.delete('token');
        history.replaceState({}, '', location.pathname);
      }
      if (!(await isTokenValid())) {
        clearToken();
        location.href = LOGIN_URL;
      }
    })();
  }, []);
  return <SquadGenerator />
}

export default App