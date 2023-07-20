import { RightIcon } from '../../components/Icons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import dead_icon from '../../../public/icons/character-dead-icon.svg'
const GameHistory = () => {
  const { history } = useSelector((state) => state.game)

  const [activeTab, setActiveTab] = useState('attacks')

  const renderAttacksHistory = (items) => {
    return items?.map((item, index) => {
      // Attack results
      // 0-> saldırılan kisi ölür
      // 1->saldirilan kisi 600 can kaybeder
      // 2-> hicbir sey olmaz
      // 3-> saldirilan kisi ölür
      // 4->saldirilan kisin ölür, saldıran 500 can kazanır
      // 5->saldiran kisi ölür
      // 6->saldiran kisi olür
      // 7-> saldıran kisi 600 can kaybeder
      const extended_item = { ...item }

      extended_item.did_attacker_died = extended_item.result == 5 || extended_item.result == 6
      extended_item.hp_lost_attacked = extended_item.result == 1 ? 600 : 0
      extended_item.hp_lost_attacker = extended_item.result == 7 ? -600 : 0
      extended_item.hp_gained_attacker = extended_item.result == 4 ? 500 : 0
      extended_item.attacker_hp_change =
        extended_item.hp_gained_attacker + extended_item.hp_lost_attacker
      extended_item.did_attacked_died =
        extended_item.result == 0 || extended_item.result == 3 || extended_item.result == 4

      return (
        <tr key={'history-attack-item_' + index} className='h-item-attack'>
          {/* <td className='time'>{extended_item?.time}</td> */}
          <td
            className={
              'hp-change-1' +
              (extended_item.attacker_hp_change > 0
                ? ' green'
                : extended_item.hp_lost_attacker < 0
                ? ' red'
                : '')
            }
          >
            {(extended_item.attacker_hp_change > 0 ? '+' : '') +
              (extended_item?.attacker_hp_change || '')}
          </td>
          <td className='player-1'>
            <div className='player-wrapper first'>
              {extended_item?.pixel_heroes_id != undefined && (
                <img
                  src={
                    extended_item?.did_attacker_died
                      ? dead_icon
                      : `/characters/${extended_item?.pixel_heroes_id}.svg`
                  }
                  className='w-[13px] h-[17px]'
                  alt='Character Icon'
                />
              )}
              {extended_item?.name}
            </div>
          </td>
          <td className='arrow'>
            <RightIcon />
          </td>
          <td className='player-2'>
            <div
              className={
                'player-wrapper second' + (extended_item?.did_attacked_died ? ' dead' : '')
              }
            >
              {extended_item?.attacked_pixel_heroes_id !== undefined && (
                <img
                  src={
                    extended_item?.did_attacked_died === 'killed'
                      ? dead_icon
                      : `/characters/${extended_item?.attacked_pixel_heroes_id}.svg`
                  }
                  className='w-[13px] h-[17px]'
                  alt='Character Icon'
                />
              )}
              {/* {extended_item?.player2?.name || extended_item?.player2?.player_id} */}
            </div>
          </td>

          <td className='hp-change-2'>
            {extended_item?.hp_lost_attacked > 0 && -extended_item?.hp_lost_attacked}
          </td>
        </tr>
      )
    })
  }

  const renderHides = (items) => {
    return items?.map((item, index) => {
      const extended_item = { ...item }
      const is_dead = extended_item?.result === '1'
      const hp_change = extended_item?.result === '0' ? -300 : 0
      return (
        <tr key={'history-hide-item_' + index} className='h-item-hide'>
          {/* <td className='time'>{item?.time}</td> */}
          <td className='hp-change-1'>{hp_change}</td>
          <td>
            <div className='player-wrapper'>
              {item?.pixel_heroes_id && (
                <img
                  src={is_dead ? dead_icon : `/characters/${item?.pixel_heroes_id}.svg`}
                  className='w-[13px] h-[17px]'
                  alt='Character Icon'
                />
              )}
              {/* {item?.player?.name || item?.player?.player_id} */}
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
          {/* <td className={'hp-change-1' + (item?.player_hp_change > 0 ? ' green' : ' red')}>
            {item?.player_hp_change !== 'dead'
              ? (item?.player_hp_change > 0 ? '+' : '') + item?.player_hp_change
              : ''}
          </td> */}
          <td>
            <div className={'player-wrapper ' + (item?.player_hp_change === 'dead' ? ' dead' : '')}>
              {item?.pixel_heroes_id && (
                <img
                  src={
                    item?.player_hp_change === 'dead'
                      ? dead_icon
                      : `/characters/${item?.pixel_heroes_id}.svg`
                  }
                  width={12.24}
                  height={16}
                  className='w-[12.24px] h-4'
                  alt='Character Icon'
                />
              )}
              {/* {item?.player?.name || item?._id} */}
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
