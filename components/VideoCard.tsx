import React, { useEffect, useRef, useState } from 'react'

import { NextPage } from 'next'
import {Video} from '../types'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp,HiVolumeOff } from 'react-icons/hi' 
import { BsPlay,BsFillPlayFill,  BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover,setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted,setIsVideoMuted]  = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    console.log(videoRef)
    if(playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
       videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
      if(videoRef?.current) {
        videoRef.current.muted = isVideoMuted;
      } 
  },[isVideoMuted])

  console.log(post)
  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
        <div className="w-10 h-10 md:w-16 md:h-16">
          <Link href="/">
            <>
              <Image width="62" height="62" className="rounded-full" layout="responsive" src={post.postedBy.image} />
            </>
          </Link>
        </div>
        <div className="">
          <Link href="/">
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 font-bold md:text-md ">{post.postedBy.userName}</p> {`
              `}
              <GoVerified className="text-blue-400 text-md" />
              <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">{post.postedBy.userName}</p>{`
              `}
            </div>
          </Link>
        </div>
      </div>

      <div className="relative flex gap-4 lg:ml-2">
        <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}

        
        className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video
            ref={videoRef}
              src={post.video.asset.url}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            >
              
            </video> 
          </Link>
          <div className="flex">
          {isHover && (
              <div className="absolute flex gap-10 p-3 cursor-pointer lg:justify-between bottom-6 left-8 md:left-24 lg:left-0 w-[100px] md:w-[50px]">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-2xl text-black lg:text-4xl " />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-2xl text-black lg:text-4xl " />
                  </button>
                )}
                {isVideoMuted ? (
                  <button>
                    <HiVolumeOff onClick={() => setIsVideoMuted(false)} className="text-2xl text-black lg:text-4xl " />
                  </button>
                ) : (
                  <button>
                    <HiVolumeUp onClick={() => setIsVideoMuted(true)} className="text-2xl text-black lg:text-4xl " />
                  </button>
                )}
              </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard