"use client"
import {startTransition, useEffect, useState} from 'react'

const Supa = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const usernames = []
    const fetchPlayers = async () => {
      const resp = await fetch('api/Supabase')
      const data = await resp.json()
      setPlayers(data)
    };
    fetchPlayers() 
  }, []);

  const player_cards = players.map(player => 
    (
    <div className="playerCard" key={player.id}>{player.username}</div>
    ))
  return (
    <>
    <h1>supa component</h1>
    <div className="playersGrid">
      <div>{player_cards}</div>
    </div>
    </>
  )
}

export default Supa;