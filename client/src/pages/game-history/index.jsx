import { RightIcon } from '../../components/Icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import dead_icon from '../../../public/icons/character-dead-icon.svg'
const GameHistory = () => {
  const { history } = useSelector((state) => state.game)

  const [activeTab, setActiveTab] = useState('attacks')

  const renderAttacksHistory = (items) => {
    return items?.map((item, index) => {
      console.log('item', item)
      const p1_hp_positive = item?.player1_hp_change
        ? item?.player1_hp_change > 0
          ? true
          : item?.player1_hp_change < 0
          ? false
          : null
        : null

      return (
        <tr key={'history-attack-item_' + index} className='h-item-attack'>
          <td className='time'>{item?.time}</td>
          <td className={'hp-change-1' + (p1_hp_positive ? ' green' : ' red')}>
            {(p1_hp_positive ? '+' : '') + (item?.player1_hp_change || '')}
          </td>
          <td className='player-1'>
            <div className='player-wrapper first'>
              {item?.pixel_heroes_id != undefined && (
                <img
                  src={`/characters/${item?.pixel_heroes_id}.svg`}
                  className='w-[13px] h-[17px]'
                  alt='Character Icon'
                />
              )}
              {item?.name || item?._id}
            </div>
          </td>
          <td className='arrow'>
            <RightIcon />
          </td>
          <td className='player-2'>
            <div
              className={
                'player-wrapper second' + (item?.player2_hp_change === 'killed' ? ' dead' : '')
              }
            >
              {item?.attacked_pixel_heroes_id !== undefined && (
                <img
                  src={
                    item?.player2_hp_change === 'killed'
                      ? dead_icon
                      : `/characters/${item?.attacked_pixel_heroes_id}.svg`
                  }
                  className='w-[12.24px] h-4'
                  alt='Character Icon'
                />
              )}
              {item?.player2?.name || item?.player2?.player_id}
            </div>
          </td>
          <td className='hp-change-2'>
            {item?.player2_hp_change !== 'killed' ? item?.player2_hp_change : ''}
          </td>
        </tr>
      )
    })
  }

  const renderHides = (items) => {
    return items?.map((item, index) => {
      return (
        <tr key={'history-hide-item_' + index} className='h-item-hide'>
          <td className='time'>{item?.time}</td>
          <td className='hp-change-1'></td>
          <td>
            <div className='player-wrapper'>
              {item?.pixel_heroes_id && (
                <img
                  src={`/characters/${item?.pixel_heroes_id}.svg`}
                  className='w-[13px] h-[17px]'
                  alt='Character Icon'
                />
              )}
              {item?.player?.name || item?.player?.player_id}
            </div>
          </td>
        </tr>
      )
    })
  }

  const renderHunts = (items) => {
    return items?.map((item, index) => {
      return (
        <tr key={'history-hide-item_' + index} className='h-item-hide'>
          <td className='time'>{item?.time}</td>
          <td className={'hp-change-1' + (item?.player_hp_change > 0 ? ' green' : ' red')}>
            {item?.player_hp_change !== 'dead'
              ? (item?.player_hp_change > 0 ? '+' : '') + item?.player_hp_change
              : ''}
          </td>
          <td>
            <div className={'player-wrapper ' + (item?.player_hp_change === 'dead' ? ' dead' : '')}>
              {item?.pixel_heroes_id && (
                <img
                  src={
                    item?.player_hp_change === 'dead'
                      ? '/icons/character-dead-icon.svg'
                      : `/characters/${item?.pixel_heroes_id}.svg`
                  }
                  width={12.24}
                  height={16}
                  className='w-[12.24px] h-4'
                  alt='Character Icon'
                />
              )}
              {item?.player?.name || item?._id}
            </div>
          </td>
        </tr>
      )
    })
  }

  const renderHistory = () => {
    if (activeTab === 'attacks') {
      return renderAttacksHistory(history['attacks'])
    } else if (activeTab === 'hides') {
      return renderHides(history['hides'])
    } else if (activeTab === 'hunts') {
      return renderHunts(history['hunts'])
    }
    return <></>
  }

  return (
    <div className='relative flex w-full flex-col h-[467px]'>
      <div className='cardBgStyledEmpty' />
      <div className='text-[20px] text-white text-opacity-[85] text-center font-bold pt-4'>
        Game History
      </div>

      <div className='flex justify-between px-4 gap-[6px] mx-[9px] mt-6 mb-0'>
        <button onClick={() => setActiveTab('hunts')}>Hunts</button>
        <button onClick={() => setActiveTab('hides')}>Hides</button>
        <button onClick={() => setActiveTab('attacks')}>Attacks!</button>
      </div>

      <div className='relative w-full h-full text-white flex overflow-hidden mt-2'>
        <div className='history-content'>
          <table>
            <tbody>{renderHistory()}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GameHistory

//TODO empty css  h-item-attack
