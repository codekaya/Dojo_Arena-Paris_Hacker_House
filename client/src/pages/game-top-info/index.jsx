import { useSelector } from 'react-redux'
import Counter from '../../components/Counter'

const GameTopInfo = () => {
  const game = useSelector((state) => state.game.current_game)

  return (
    <div className='relative w-full h-14 mb-[5px] flex justify-center items-center gap-[54px]'>
      <div className='cardBgStyledEmpty' />
      <div className='text-center'>
        <div className='info-title'>Survivors</div>
        <div className='info-value'>
          {game?.num_players} / {game?.max_players}
        </div>
      </div>
      <div className='text-center'>
        <div className='info-title'>Current turn</div>
        <div className='info-value'>{game?.current_tour}</div>
      </div>
      <div className='text-center'>
        <div className='info-title'>Remaining Time</div>
        <div className='info-value'>
          <Counter
            initialDuration={
              new Date().getTime() / 1000 -
              (game?.start_time + game?.turn_duration * game?.current_tour)
            }
          />
        </div>
      </div>
      <div className='text-center'>
        <div className='info-title'>Total Prize</div>
        <div className='info-value'>${game?.prize}</div>
      </div>
    </div>
  )
}

export default GameTopInfo
