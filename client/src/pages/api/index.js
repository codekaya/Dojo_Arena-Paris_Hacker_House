export const REST_URL = 'https://dojoarena.onrender.com'

export const getAllGames = async () => {
  const res = await fetch(`${REST_URL}/games/get`)
  const data = await res.json()

  return data.user
}
