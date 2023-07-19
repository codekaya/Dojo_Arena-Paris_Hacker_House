import { useEffect, useState } from 'react'

function formatTime(duration) {
  const hours = Math.floor(duration / 3600)
    .toString()
    .padStart(2, '0')
    .slice(0, 2)
  const minutes = Math.floor((duration % 3600) / 60)
    .toString()
    .padStart(2, '0')
    .slice(0, 2)
  const seconds = (duration % 60).toString().padStart(2, '0').slice(0, 2)
  return `${hours}:${minutes}:${seconds}`
}

function Counter({ initialDuration }) {
  const [duration, setDuration] = useState(initialDuration)

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prevDuration) => prevDuration - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='text-center'>
      <div className='text-md font-bold'>{formatTime(duration)}</div>
    </div>
  )
}

export default Counter
