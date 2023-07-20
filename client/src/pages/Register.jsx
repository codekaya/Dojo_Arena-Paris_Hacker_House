import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { EditIcon } from '../components/Icons'
import { getPlayersOfGame, getGame, getPlayer } from './api'
import { address_shortener } from '../../utils/helper'
import { Provider, Contract } from 'starknet'
import { abi } from '../web3/calls'
import { useAccount } from '@starknet-react/core'

const parseTimestamp = (timestamp) => {
  let seconds = Math.floor(timestamp / 1000) % 60
  let minutes = Math.floor(timestamp / (1000 * 60)) % 60
  let hours = Math.floor(timestamp / (1000 * 60 * 60)) % 24
  let days = Math.floor(timestamp / (1000 * 60 * 60 * 24))

  let result = ''

  if (days > 0) {
    result += days + ' D '
  }
  if (hours > 0) {
    result += hours + ' H '
  }
  if (minutes > 0) {
    result += minutes + ' M '
  }
  if (seconds > 0) {
    result += seconds + ' S '
  }

  return result.trim()
}

function YourInfo() {
  const [playerName, setPlayerName] = useState('')
  const [pixel_hero_id, setPixelHeroId] = useState(1)
  const { account } = useAccount()
  const params = useParams()

  const name = 'Player 1'

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

  const handleNameInputChange = (e) => setPlayerName(e?.currentTarget?.value || '')

  const handleCurrentPlayerNameChange = () => {
    // if (playerName?.length > 0 && !currentPlayer?.name) {
    //   dispatch(setCurrentPlayerName(playerName))
    // }
  }

  const registerHandler = async () => {
    const game_id = params?.game_id
    const nft_id = 0

    contract.invoke('join_game', [game_id, playerName, pixel_hero_id, nft_id]).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className='flex flex-col text-center bg-[#0a1520] border border-[#4FCDF2] py-2 w-1/4'>
      <h2>Your Info</h2>
      <div className='flex flex-col bg-[#0a1520] py-2'>
        <img
          src={`/characters/${pixel_hero_id}.svg`}
          onClick={() => setPixelHeroId(Math.floor(Math.random() * 70) + 1)}
          alt='Character Icon'
          className='md:p-10 lg:p-10 h-[300px] mx-auto cursor-pointer'
        />
        <span>{name}</span>
        <div className='flex flex-row relative w-[80%] rounded-lg mx-auto items-center h-16 mt-4 border-2 border-[#4FCDF2]'>
          <input
            className='w-full h-full text-[14px] text-white border-none pl-3  name-input placeholder:text-[ffffff99] disabled:name-input-disabled'
            placeholder='Name Your Champion'
            value={playerName}
            onChange={handleNameInputChange}
          />
          <div
            className='mr-4 font-light top-1 cursor-pointer opacity-10 hover:opacity-100 edit-icon'
            onClick={handleCurrentPlayerNameChange}
          >
            <EditIcon />
          </div>
        </div>

        <button
          className='text-[18px] bg-[#386A92] mt-2 border-2 border-[#628EAB] py-4 w-[80%] mx-auto rounded-lg'
          onClick={registerHandler}
        >
          Register
        </button>
      </div>
    </div>
  )
}

function HowToPlay() {
  return (
    <div className='flex flex-col text-left px-4 bg-[#0a1520] border border-[#4FCDF2] py-2 w-1/2'>
      <span>How to Play</span>
    </div>
  )
}

function RegisteredPlayers() {
  const [players, setPlayers] = useState([])
  const params = useParams()

  const fetchPlayers = async () => {
    const game_id = params?.game_id
    getPlayersOfGame(game_id).then((res) => {
      setPlayers(res)
    })
  }

  useEffect(() => {
    fetchPlayers()
  }, [params?.game_id])

  return (
    <div className='flex flex-col text-left bg-[#0a1520] border border-[#4FCDF2] py-2 h-1/2'>
      <span className='ml-4'>Registered Players</span>
      <div className='flex flex-col items-start bg-[#0a1520] py-2'>
        {players.slice(0, 20).map((player, index) => (
          <div key={index} className='text-[11px]'>
            <span className='ml-4'>{address_shortener(player?.address)}</span>
          </div>
        ))}
        <span className='ml-4'>...</span>
      </div>
      <span className='ml-4 mb-0 mt-auto'>Total: {players.length} Players</span>
    </div>
  )
}

function GameCard(props) {
  const { image, title, description, creator, player, capacity, fee, reward, time } = props

  return (
    <div className='flex flex-row justify-between items-center border-2 border-[#246CBD] bg-[#000000] rounded-md pr-4'>
      <img src={image} alt={title} className='w-[5rem] aspect-square' />
      <div className='relative flex flex-col space-y-2 md:w-[12rem]'>
        <h2>{title}</h2>
        <p className='text-[12px]'>{description}</p>
        <p className='text-[12px]'>by {address_shortener(creator)}</p>
      </div>
      <div className='relative flex flex-col space-y-2'>
        <span className='text-[9px] text-[#848896] '>Capacity</span>
        <span className='text-[12px]'>
          {player} / {capacity}
        </span>
      </div>
      <div className='relative flex flex-col space-y-2'>
        <span className='text-[9px] text-[#848896] '>Entry Fee</span>
        <span className='text-[12px]'>{fee} ETH</span>
      </div>
      <div className='relative flex flex-col space-y-2'>
        <span className='text-[9px] text-[#848896] '>Reward</span>
        <span className='text-[12px]'>{reward} ETH</span>
      </div>
      <span className='hidden md:block w-[8rem] text-[12px] text-right'>
        {parseTimestamp(time)}
      </span>
    </div>
  )
}

function Result() {
  const [game, setGame] = useState({})
  const params = useParams()

  const fetchGame = async () => {
    const game_id = params?.game_id
    getGame(game_id).then((res) => {
      setGame(res)
    })
  }

  useEffect(() => {
    fetchGame()
  }, [params?.game_id])

  const currentTime = new Date().getTime() / 1000
  const status = game?.is_active
    ? currentTime > game?.start_time
      ? 'Active'
      : 'Pending'
    : 'Finished'

  return (
    <div className='flex flex-col text-left bg-[#0a1520] border border-[#4FCDF2] py-2 h-1/2'>
      <span className='ml-4'>Result</span>
      <div className='flex flex-col items-start bg-[#0a1520] py-2'>
        {status === 'Pending' && <span className='ml-4 text-[13px]'>Game is not started yet</span>}
        {status === 'Active' && <span className='ml-4 text-[13px]'>Game is started</span>}
        {status === 'Finished' && game?.winner && (
          <span className='ml-4 text-[13px]'>Winner: {address_shortener(game?.winner)}</span>
        )}
      </div>
    </div>
  )
}

export default function Register() {
  const [game, setGame] = useState({})
  const params = useParams()

  const fetchGame = async () => {
    const game_id = params?.game_id

    getGame(game_id).then((res) => {
      setGame(res)
    })
  }

  useEffect(() => {
    fetchGame()
  }, [params?.game_id])

  return (
    <Layout bg_url='/main-bg.png'>
      <div className='flex flex-col w-[100vw] bg-[#02040A77] border border-[#4FCDF2] shadow-border_2 py-4'>
        <div className='flex flex-col space-y-4 w-dojo mx-auto px-20 py-10'>
          <GameCard
            image={game?.image_link}
            title={game?.name}
            description={game?.room_name}
            creator={game?.game_creator}
            player={game?.num_players}
            capacity={game?.max_players}
            fee={game?.entry_fee}
            reward={game?.prize}
            time={game?.start_time}
            status={!game?.is_active ? 'Past' : game?.current_tour > 0 ? 'Ongoing' : 'Upcoming'}
            has_nf={game?.has_nft}
            participant={game?.num_players}
            winner={game?.winner}
            first={game?.first}
          />
          <div className='flex flex-row space-x-4'>
            <YourInfo />
            <HowToPlay />
            <div className='flex flex-col w-1/4 space-y-4'>
              <RegisteredPlayers />
              <Result />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
