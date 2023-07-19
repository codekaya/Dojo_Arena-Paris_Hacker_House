const rand_character_image = () => {
  let randomIndex = Math.floor(Math.random() * 70 + 1)
  return '/characters/' + randomIndex + '.svg'
}

const rand_current_state = () =>
  ['hunting', 'attacking', 'hiding', 'playing'][Math.floor(Math.random() * 4)]

const rand_hp = () => Math.floor(Math.random() * 4000)

export const createRandomPlayers = (length) => {
  return Array.from({ length }).map((e, index) => {
    return createRandomPlayer(index)
  })
}

export const createCurrentPlayer = () => {
  const c_player = createRandomPlayer(100000)

  c_player.name = ''

  return c_player
}

const createRandomPlayer = (id) => {
  return {
    name: 'hunter' + id,
    character_image: rand_character_image(),
    current_state: rand_current_state(),
    player_hp: rand_hp(),
    player_id: id + '',
  }
}

// PLAYER HELPERS

const sortPlayersByHp = (players) => {
  return players.sort((a, b) => b?.player_hp - a?.player_hp)
}

export const seperatePlayersByState = (players) => {
  let seperatedPlayers = {
    playing: [],
    hunting: [],
    hiding: [],
    attacking: [],
  }

  players?.forEach((player) => {
    const player_move = player?.move
    if (player_move === '1') {
      seperatedPlayers['hunting'].push(player)
    } else if (player_move === '2') {
      seperatedPlayers['hiding'].push(player)
    } else if (player_move === '3') {
      seperatedPlayers['attacking'].push(player)
    }
  })

  seperatedPlayers.attacking = sortPlayersByHp(seperatedPlayers.attacking)
  seperatedPlayers.hiding = sortPlayersByHp(seperatedPlayers.hiding)
  seperatedPlayers.hunting = sortPlayersByHp(seperatedPlayers.hunting)
  seperatedPlayers.playing = sortPlayersByHp(players)

  return seperatedPlayers
}

export const getPlayerById = (players, player_id) => {
  return players.find((elm) => elm?.player_id === player_id)
}
