import { useEffect, useState } from 'react'

export function useRagazzi() {
  const [dati, setDati] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/ragazzi.json')
      .then(res => res.json())
      .then(data => {
        setDati(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Errore nel caricamento:', err)
        setLoading(false)
      })
  }, [])

  return { dati, loading }
}