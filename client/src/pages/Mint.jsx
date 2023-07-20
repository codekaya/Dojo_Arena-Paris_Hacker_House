import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

export default function Mint() {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    const fetchGame = async () => {}

    fetchGame()
  }, [params?.game_id, dispatch])

  return (
    <Layout bg_url='/main-bg.png'>
      <div className='flex flex-col md:w-[40vw] lg:w-[20vw] space-y-4'>
        <div className='flex flex-col text-center bg-[#0a1520] border border-[#4FCDF2] py-2'>
          <span className='text-[12px] text-[#848896]'>Dojo Arena Original Collection</span>
          <span className='text-[15px]'>Hacker House Demo NFT</span>
        </div>
        <div className='flex flex-col bg-[#0a1520] border border-[#4FCDF2] py-2'>
          <img src='/characters/1.svg' alt='Character Icon' className='p-10' />
          <button className='text-[18px] bg-[#386A92] border-2 border-[#628EAB] py-4 w-[90%] mx-auto rounded-lg'>
            Mint It
          </button>
        </div>
        <div className='flex'>
          <button className='bg-[#02040A] mx-auto w-[80%] border border-[#4FCDF2] py-3'>
            Go to Game
          </button>
        </div>
      </div>
    </Layout>
  )
}

//TODO redux entegrasyonu ve func kisimlari tamamlanacak

//TODO 3 divin css tanimi eksik (ana repoda) --> game-actions-game-top-buttons-game-attack-input
