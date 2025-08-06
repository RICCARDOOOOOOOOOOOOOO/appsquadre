import { useState } from 'react'
import { useRagazzi } from '../data/useRagazzi'

export default function SquadGenerator() {
  const { dati, loading } = useRagazzi()

  const [turno, setTurno] = useState('turno1')
  const [includeCuochi, setIncludeCuochi] = useState(true)
  const [includePersonaggi, setIncludePersonaggi] = useState(true)
  const [annateEscluse, setAnnateEscluse] = useState([])
  const [numSquadre, setNumSquadre] = useState(2)
  const [squadre, setSquadre] = useState([])

  if (loading) return <p>Caricamento in corso...</p>

  const toggleAnnata = (annata) => {
    setAnnateEscluse(prev =>
      prev.includes(annata)
        ? prev.filter(a => a !== annata)
        : [...prev, annata]
    )
  }

  const filtra = () => {
    return dati.filter(p => {
      if (!includeCuochi && p.tipologia === 'cuoco') return false
      if (!includePersonaggi && p.tipologia === 'personaggio') return false
      if (annateEscluse.includes(p.annata)) return false
      return true
    })
  }

  const generaSquadre = () => {
    const filtrati = filtra()
    const educatori = filtrati.filter(p => p.ruolo === 'edu')
    const ragazzi = filtrati.filter(p => p.ruolo === 'ragazzo')

    const squadreVuote = Array.from({ length: numSquadre }, () => [])

    // Distribuisci educatori per grado
    const gradi = ['E', 'J']
    gradi.forEach(grado => {
      const gruppo = educatori.filter(e => e.grado === grado).sort(() => 0.5 - Math.random())
      gruppo.forEach((p, i) => {
        squadreVuote[i % numSquadre].push(p)
      })
    })

    // Distribuisci ragazzi per annata
    const annateUniche = [...new Set(ragazzi.map(r => r.annata))]
    annateUniche.forEach(annata => {
      const gruppo = ragazzi.filter(r => r.annata === annata).sort(() => 0.5 - Math.random())
      gruppo.forEach((p, i) => {
        squadreVuote[i % numSquadre].push(p)
      })
    })

    setSquadre(squadreVuote)
  }

  const annateDisponibili = [...new Set(dati.map(p => p.annata))].filter(Boolean).sort()

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Generatore Squadre – Turno {turno}</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Seleziona turno:
          <select value={turno} onChange={e => setTurno(e.target.value)}>
            <option value="turno1">Turno 1</option>
            <option value="turno2">Turno 2</option>
            <option value="turno3">Turno 3</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeCuochi}
            onChange={() => setIncludeCuochi(!includeCuochi)}
          />
          Includi Cuochi
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includePersonaggi}
            onChange={() => setIncludePersonaggi(!includePersonaggi)}
          />
          Includi Personaggi
        </label>
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Escludi annate:</strong><br />
        {annateDisponibili.map(annata => (
          <label key={annata} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={annateEscluse.includes(annata)}
              onChange={() => toggleAnnata(annata)}
            />
            {annata}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>
          Numero di squadre:
          <input
            type="number"
            min="2"
            value={numSquadre}
            onChange={e => setNumSquadre(parseInt(e.target.value) || 2)}
            style={{ width: '50px', marginLeft: '5px' }}
          />
        </label>
      </div>

      <button style={{ marginTop: '15px' }} onClick={generaSquadre}>
        Genera Squadre
      </button>

      {squadre.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          {squadre.map((gruppo, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <h3>Squadra {i + 1}</h3>
              <ul>
                {gruppo.map((p, j) => (
                  <li key={j}>
                    {p.nome} – {p.ruolo === 'edu' ? `Edu (${p.grado})` : `Annata ${p.annata}`} {p.tipologia !== 'normale' ? `– ${p.tipologia}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}