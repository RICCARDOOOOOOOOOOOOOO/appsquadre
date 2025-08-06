README

> Generatore di squadre per turni parrocchiali, con supporto a ruoli speciali, filtro per annate ed autenticazione via token.

---

## ✅ Funzionalità Implementate

### 🛠️ Struttura e Setup

* Creato progetto React con **Vite**.
* Inizializzato repository Git e pubblicato su **GitHub**.
* Struttura componenti organizzata in:

  * `src/components/`
  * `src/data/`
  * `src/services/`

---

### 🔐 Autenticazione

* Aggiunto **controllo del token** come nel sistema "Cassa".
* Creato file `src/services/auth.js` con:

  * `getToken`, `setToken`, `clearToken`
  * `authHeader()` per inviare il token nei fetch
  * `isTokenValid()` per validarlo all'avvio tramite `checkSession.php`
* Se il token è assente o invalido → redirect automatico alla login con `returnUrl`.

---

### 📥 Caricamento dati

* Dati di esempio caricati da `public/ragazzi.json`
* Ogni partecipante ha:

  * `nome`, `ruolo`, `grado`, `annata`, `tipologia`
* In futuro il JSON verrà sostituito da chiamata PHP autenticata.

---

### 🧠 Logica squadre

* Distinzione tra:

  * Educatori (`E` = senòr, `J` = aiuto edu)
  * Ragazzi, separati per **annata**
* Logica di distribuzione:

  * Gli educatori vengono distribuiti uno per squadra, alternando per grado
  * I ragazzi vengono distribuiti equamente per annata

---

### 🧰 Filtri avanzati

* Checkbox:

  * “Includi cuochi”
  * “Includi personaggi”
* Esclusione annate selezionabili
* Selezione del numero di squadre
* Selezione del **turno** (placeholder per ora)

---

### 📄 UI & Comportamento

* Interfaccia semplice, chiara e responsive.
* Generazione squadre visualizzata in tempo reale.
* Token salvato automaticamente se presente in URL (`?token=...`).
* Navigazione pulita (`history.replaceState`) dopo lettura del token.

---

## 📦 File principali

| File                                | Descrizione                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `src/App.jsx`                       | Entry point dell'app – contiene controllo token e rendering      |
| `src/components/SquadGenerator.jsx` | Logica UI di filtro e generazione squadre                        |
| `src/data/useRagazzi.js`            | Hook per caricare dati da `ragazzi.json` (simulazione fetch PHP) |
| `src/services/auth.js`              | Gestione token come nel progetto “cassa”                         |

---

## 🧪 Sviluppo locale

1. Avvia il server con:

   ```bash
   npm run dev
   ```

2. Per autenticarti:

   * Recupera un `token` valido (es. dal progetto cassa)
   * Apri:

     ```
     http://localhost:5173/?token=IL_TUO_TOKEN
     ```

---

## 📌 Prossimi miglioramenti (roadmap)

* Collegamento a servizi PHP reali (`getPartecipanti.php`)
* Esportazione squadre in PDF
* Salvataggio squadre in localStorage
* Login automatico o form inserimento token
* UI con Tailwind o Material UI
* Drag-and-drop per spostare partecipanti

---

Se vuoi posso anche salvarti questo README come file `.md` nel progetto. Vuoi che lo faccia?
