import { DiscordIcon, HeartIcon, TwitterIcon } from '../../components/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { setCharacterPopupInfo } from '../../../stores/game-store'
import { getPlayerById } from '../../../utils/player'
import { useEffect, useMemo, useRef } from 'react'
import Button from '../../styles/button'
import { useAccount } from '@starknet-react/core'
import { useParams } from 'react-router-dom'
import { abi } from '../../web3/calls'
import { Provider, Contract } from 'starknet'
import { getPlayer } from '../api'

const CharacterPopup = () => {
  const { character_popup: popupState, players } = useSelector((state) => state.game)

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

  const dispatch = useDispatch()
  const popupRef = useRef(null)
  const popupOpenRef = useRef(popupState?.open)

  const popupPlayerData = useMemo(() => {
    return getPlayerById(players, popupState?.player_id)
  }, [players, popupState?.player_id])

  console.log('popupPlayerData', popupPlayerData)

  useEffect(() => {
    setTimeout(() => {
      popupOpenRef.current = popupState?.open
    }, 300)
  }, [popupState?.open])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target === true || !popupOpenRef?.current) return false

      if (event.target?.getAttribute('data-player-id')) {
        console.log('clicked another player')
        return true
      }

      if (!popupRef?.current?.contains(event.target)) {
        dispatch(
          setCharacterPopupInfo({
            open: false,
            player_id: '',
            position: {
              x: 0,
              y: 0,
            },
          }),
        )
      }
    }

    //console.log("handleClickOutside - add event listener");
    window.addEventListener('click', handleClickOutside)

    return () => {
      //console.log("handleClickOutside - remove event listener");
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dispatch])

  const handleAttackClick = async () => {
    console.log('Attack clicked')
    const game_id = params?.game_id
    const player_id = (await getPlayer(game_id, address)).player_id
    const attack_player_id = popupPlayerData?.player_id

    contract.invoke('attack', [game_id, player_id, attack_player_id]).then((res) => {
      console.log(res)
    })
  }

  return !popupState?.open ? (
    <></>
  ) : (
    <div
      className='absolute w-[238px] pt-[14px] px-[15px] pb-[17px] text-white z-[60] translate-x-[30px] translate-y-[-30%]'
      ref={popupRef}
      style={{
        left: popupState?.position?.x + 'px',
        top: popupState?.position?.y + 'px',
      }}
    >
      <div className='cardBgStyledCharacterpopup opacity-80' />
      <div className='text-center text-[12px] font-bold mb-[6px]'>
        HunterPunker#{popupPlayerData?.player_id}
      </div>
      <div className='flex items-center justify-between shadow-[0px_12px_13px_-5px_#163048] mb-2.5 px-2.5 py-[5px] rounded-md border-2 border-solid border-[#246cbd] '>
        <div className='character-image'>
          {popupPlayerData?.character_image && (
            <img
              src={popupPlayerData?.character_image}
              className='w-[29px] h-[34px]'
              alt='Character Image'
            />
          )}
        </div>
        <div className='text-center font-semibold text-[12px] grow'>
          {popupPlayerData?.name || 'Not Setted'}
        </div>
      </div>
      <div className='mb-3'>
        <div className='c-detail-group'>
          <div className='c-detail-title'>
            <HeartIcon />
            Health
          </div>
          <div className='c-detail-value'>{popupPlayerData?.health}/4000</div>
        </div>
        <div className='c-detail-group'>
          <div className='c-detail-title'>
            <DiscordIcon />
            Discord
          </div>
          <div className='c-detail-value'>{popupPlayerData?.discord || 'Not Setted'}</div>
        </div>
        <div className='c-detail-group'>
          <div className='c-detail-title'>
            <TwitterIcon />
            Twitter
          </div>
          <div className='c-detail-value'>{popupPlayerData?.twitter || 'Not Setted'}</div>
        </div>
      </div>
      <div className='flex flex-col gap-[11px]'>
        <button className='bg-red-600 py-2 rounded-xl' onClick={handleAttackClick}>
          {/* <InfoTooltip
            content='attack'
            position={{
              x: 'left',
              y: 'center',
            }}
          /> */}
          Attack!
        </button>
        <Button mode='popup'>Go To Profile</Button>
      </div>
    </div>
  )
}

export default CharacterPopup
