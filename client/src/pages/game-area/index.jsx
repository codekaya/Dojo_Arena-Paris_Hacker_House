import { useSelector } from 'react-redux'

import AttackInput from '../attack-input'
import Character from '../character'
import { abi } from '../../web3/calls'
import { useAccount } from '@starknet-react/core'
import { Provider, Contract } from 'starknet'
import { getPlayer } from '../api'
import { useParams } from 'react-router-dom'

const GameArea = () => {
  const gameState = useSelector((state) => state.game)
  const params = useParams()
  const { isConnected, address, account } = useAccount()

  const provider = new Provider({
    sequencer: {
      baseUrl: 'https://starknet-testnet.public.blastapi.io',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
    },
  })

  const contractAddress = '0x025c54cc9d49825338dfe117e4bbe94ac7bf006679f2cd0c50c3cba25457b24f'

  const contract = new Contract(abi, contractAddress, provider)
  contract.connect(account)

  const handleHuntClick = async () => {
    console.log('Hunt clicked')
    const game_id = params?.game_id
    const player_id = (await getPlayer(game_id, address)).player_id

    contract.invoke('hunt', [game_id, player_id]).then((res) => {
      console.log(res)
    })
  }

  const handleHideClick = async () => {
    console.log('Hide clicked')
    const game_id = params?.game_id
    const player_id = (await getPlayer(game_id, address)).player_id

    contract.invoke('hide', [game_id, player_id]).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className='relative w-full '>
      <div className='wrapper'>
        <div className='cardBgStyledEmpty' />
        <div className='game-area-content'>
          <div className='game-area-section-group'>
            <div className='game-area-section'>
              <div className='game-area-section-title'>Hunting</div>
              <div className='game-area-section-players'>
                {gameState?.players_by_states?.hunting?.map((player) => (
                  <Character
                    key={'character_' + player?.player_id}
                    character_image={`/characters/${player?.pixel_heroes_id}.svg`}
                    player_data={player}
                  />
                ))}
              </div>
            </div>
            <div className='game-area-section'>
              <div className='game-area-section-title'>Hiding</div>
              <div className='game-area-section-players'>
                {gameState?.players_by_states?.hiding?.map((player) => (
                  <Character
                    key={'character_' + player?.player_id}
                    character_image={`/characters/${player?.pixel_heroes_id}.svg`}
                    player_data={player}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='game-area-section-group'>
            <div className='game-area-section'>
              <div className='game-area-section-title'>Playing</div>
              <div className='game-area-section-players'>
                {gameState?.players_by_states?.playing?.map((player) => (
                  <Character
                    key={'character_' + player?.player_id}
                    character_image={`/characters/${player?.pixel_heroes_id}.svg`}
                    player_data={player}
                  />
                ))}
              </div>
            </div>
            <div className='game-area-section'>
              <div className='game-area-section-title'>Attacking</div>
              <div className='game-area-section-players'>
                {gameState?.players_by_states?.attacking?.map((player) => (
                  <Character
                    key={'character_' + player?.player_id}
                    character_image={`/characters/${player?.pixel_heroes_id}.svg`}
                    player_data={player}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-[15px] flex gap-[17px]'>
        <button onClick={handleHuntClick} style={{ opacity: isConnected ? 1 : 0.5 }}>
          {/* <InfoTooltip content='hunt' position={{ x: 'right' }} /> */}
          Hunt!
        </button>
        <button onClick={handleHideClick} style={{ opacity: isConnected ? 1 : 0.5 }}>
          {/* <InfoTooltip content='hide' position={{ x: 'right' }} /> */}
          Hide!
        </button>
      </div>

      <AttackInput />
    </div>
  )
}

export default GameArea
