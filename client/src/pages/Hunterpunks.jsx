import GameTopInfo from './game-top-info/index'
import CurrentPlayerInfo from './current-player-info/index'
import GameArea from './game-area/index'
import GameHistory from './game-history/index'
import Layout from '../components/Layout'
import CharacterPopup from './character-popup'
import { useDispatch } from 'react-redux'
import { Provider, Contract } from 'starknet'
import { abi } from '../web3/calls'

import { useEffect } from 'react'
import {
  setPlayers,
  setCurrentGame,
  setHistory,
  setCurrentPlayerInfo,
} from '../../stores/game-store'

import { getGame, getPlayers, getAttacks, getHides, getHunts, getPlayer } from './api'
import { useAccount } from '@starknet-react/core'
import { useParams } from 'react-router-dom'

export default function HunterPunks() {
  const dispatch = useDispatch()
  const params = useParams()
  const { isConnected, address, account } = useAccount()

  useEffect(() => {
    const fetchGame = async () => {
      const game_id = params?.game_id
      getGame(game_id).then((res) => {
        dispatch(setCurrentGame(res))
      })
    }

    const fetchPlayers = async () => {
      const game_id = params?.game_id
      getPlayers(game_id).then((res) => {
        dispatch(setPlayers(res))
      })
    }

    const fetchHistory = async () => {
      const game_id = params?.game_id
      const history = {
        attacks: await getAttacks(game_id),
        hides: await getHides(game_id),
        hunts: await getHunts(game_id),
      }

      return history
    }

    fetchGame()
    fetchPlayers()
    fetchHistory().then((res) => {
      dispatch(setHistory(res))
    })
  }, [params?.game_id, dispatch])

  useEffect(() => {
    const fetchPlayer = async () => {
      const game_id = params?.game_id
      const player = await getPlayer(game_id, address)

      return player
    }

    console.log('isConnected', isConnected)
    if (isConnected && address) {
      fetchPlayer().then((player) => {
        console.log('player', player)
        dispatch(setCurrentPlayerInfo(player))
      })
    }
  }, [isConnected, address, params?.game_id, dispatch])

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

  const nextTurnHandler = () => {
    console.log('Next turn clicked')
    const game_id = params?.game_id
    contract.invoke('next_turn', [game_id]).then((res) => {
      console.log(res)
    })
  }

  return (
    <Layout bg_url='/main-bg.png'>
      <div className='flex justify-center items-start gap-[10px] z-0 relative mt-20'>
        <div className='w-[273px] shrink-0'>
          <CurrentPlayerInfo />
          {/* <button onClick={handleConnectWallet}>Connect wallet</button> */}
        </div>
        <div className='w-[640px] flex-shrink-0'>
          <GameTopInfo /> {/* TODO: HERE */}
          <GameArea />
          <div className='game-actions'>
            <div className='game-top-buttons'></div>
            <div className='game-attack-input'></div>
          </div>
        </div>
        <div className='w-[271px]'>
          <GameHistory />
          <button onClick={nextTurnHandler}>Next Turn</button>
        </div>
      </div>
      <CharacterPopup />
    </Layout>
  )
}

//TODO redux entegrasyonu ve func kisimlari tamamlanacak

//TODO 3 divin css tanimi eksik (ana repoda) --> game-actions-game-top-buttons-game-attack-input
