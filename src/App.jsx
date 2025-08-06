import { useEffect } from 'react';
import { isTokenValid } from "./services/auth";
import SquadGenerator from './Components/SquadGenerator'

function App() {
  useEffect(() => {
    (async () => {
      const valid = await isTokenValid();
      if (!valid) {
        window.location.href = 'https://gestione.parrocchiacarpaneto.com/login/?returnUrl=' + encodeURIComponent(window.location.href);
      }
    })();
  }, []);
  return <SquadGenerator />
}

export default App