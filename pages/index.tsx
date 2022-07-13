import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { Video } from '../types'





import { BASE_URL } from '../utils'
import { useEffect } from 'react'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'

interface IProps {
  videos:Video[]
}

const Home: NextPage<IProps> = ({videos}) => {

  return (
    <div className="flex flex-col h-full gap-10 videos">
     {videos?.length ? videos.map((video:Video) => (
       <VideoCard post={video} key={video._id} />
     )) : (
       <NoResults text={`No videos found`}/>
     )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${BASE_URL}api/post`)
  console.log(data)
    return {
        props: {
          videos:data
        }
    }
}

export default Home