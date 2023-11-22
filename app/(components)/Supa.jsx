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

  const player_cards = players.map((player, index) => 
    (
    <div className="playerCard" key={index}>{player.username}</div>
    ))
  return (
    <>
    <h1>supa component</h1>
    <div className="playersGrid">
      {player_cards}
    </div>
    </>
  )
}

export default Supa;