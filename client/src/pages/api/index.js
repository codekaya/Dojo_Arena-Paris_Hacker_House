export const REST_URL = 'https://dojoarena.onrender.com'

export const getAllGames = async () => {
  const res = await fetch(`${REST_URL}/games/alive`)
  const data = await res.json()

  return data.user
}

export const getGame = async (game_id) => {
  const res = await fetch(`${REST_URL}/game`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  })

  const data = await res.json()

  return data.user
}

export const getPlayers = async (game_id) => {
  const res = await fetch(`${REST_URL}/players/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  })

  const data = await res.json()

  return data.user
}

export const getAttacks = async (game_id) => {
  const res = await fetch(`${REST_URL}/game/attacks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  })

  const data = await res.json()

  return data.user
}

export const getHides = async (game_id) => {
  const res = await fetch(`${REST_URL}/game/hides/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  })

  const data = await res.json()

  return data.user
}

export const getHunts = async (game_id) => {
  const res = await fetch(`${REST_URL}/game/hunts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id }),
  })

  const data = await res.json()

  return data.user
}
