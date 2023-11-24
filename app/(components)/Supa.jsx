"use client"
import {startTransition, useEffect, useState} from 'react'

const Supa = () => {
  const [players, setPlayers] = useState([])
  const [playerCardTrue, setPlayerCardTrue ] = useState([])
  const [playerCardFalse, setPlayerCardFalse] = useState([])

  useEffect(() => {
    const usernames = []
    const fetchPlayers = async () => {
      const resp = await fetch('api/Supabase')
      const data = await resp.json()
      console.log(data)
      setPlayers(data)


    const cardTrue = [];
    const cardFalse = [];
    data.forEach(player => {
      if (player.card_created) {
        cardTrue.push(player);
      } else {
        cardFalse.push(player);
      }
    });
    setPlayerCardTrue(cardTrue);
    setPlayerCardFalse(cardFalse);

    };
    fetchPlayers() 
  }, []);


  const playerCards = playerCardTrue.map((player, index) => 
    (
    <div className="playerCard" key={index}>{player.username}</div>
    ))

  const playersFloating = playerCardFalse.map((player, index) =>
    (
      <div className="playersFloating" key={index}>{player.username}</div>
    ))
  
  return (
    <>
      <h1>supa component</h1>
      <div className="">
        {playersFloating}
      </div>
      <div className="playersGrid">
        {playerCards}
      </div>
    
    </>
  )
}

export default Supa;