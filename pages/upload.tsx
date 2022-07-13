import React,{ useState,useEffect } from 'react'
import { useRouter  } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {

  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0])
  const [savingPost, setSavingPost] = useState(false)

  const {userProfile}:{userProfile:any} = useAuthStore()

  const handlePost = async () => {
    if(caption && videoAsset?._id && category) {
      setSavingPost(true)
      const document = {
        _type:"post",
        caption,
        video: {
          _type:"file",
          asset: {
            _type:"reference",
            _ref:videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy: {
          _type:'postedBy', 
          _ref: userProfile?._id
        },
        topic: category
      }
      await axios.post(`${BASE_URL}/api/post`,document)
      router.push('/')
    }
  }

  const uploadVideo = async (e:any) => {
      const selectedFile = e.target.files[0]
      const fileTypes = ['video/mp4', 'video/webm','video/ogg']

      console.log("uploading video")

      if(fileTypes.includes(selectedFile.type)) {
        console.log("sending video to sanity")
        await client.assets.upload("file",selectedFile,{
          contentType:selectedFile.type,
          filename:selectedFile.name
        })
        .then((data:any) => {
          console.log(data)
          setVideoAsset(data)
          setLoading(false)
        })
      } else {
        setLoading(false)
        setWrongFileType(true) 
      }
  }
  return (
    <div className="absolute left-0 flex w-full h-full top-[60px] mb-10 pt-10 lg:pt-20  bg-[#f8f8f8] justify-center">
      
      <div className= "bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 w-[60%]">
        
          <div className="">
            <div className="">
            <p className="text-2xl font-bold ">Upload Video</p>
            <p className="mt-1 text-gray-400 text-md">Post a video to your account</p>
          
          </div>
          <div className="flex flex-col items-center justify-center mt-10 border-4 border-gray-200 border-dashed outline-none w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100"  >
              {isLoading ? (
                <p>Uploading</p>
              ) : (
                <div className="">
                    {videoAsset ? (
                      <div className="">
                          <video className="rounded-xl h-[450px] mt-16 bg-black"  loop controls src={videoAsset.url}>
                            
                          </video>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                          <div className="flex flex-col items-center justify-center h-full">
                              <div className="flex flex-col items-center justify-center">
                              <p className="font-bold text-bold"><FaCloudUploadAlt className="text-6xl text-gray-300" /></p>
                              <p className="text-xl font-semibold">Upload Video</p>
                          </div>

                          <p className="mt-10 text-sm leading-10 text-center text-gray-400">
                            MP4 or WebM or ogg <br />
                            720x1280 or higher <br />
                            Upto to 10 minutes <br />
                            Less than 100 MB <br />
                          </p>
                          <p className="bg-[#F51197] rounded text-center mt-10 text-white  text-md font-medium p-2 w-52 outline-none">
                            SELECT FILE
                          </p>
                          </div>
                          <input type="file" name="upload-video" className="w-0 h-0" onChange={(e) => uploadVideo(e)} />
                      </label>
                    )}
                </div>
              )}
              {wrongFileType && (
                 <p className="mt-4 text-xl font-semibold text-center text-red-400 w-[250px]">Please select a video file</p>
              )}
          </div>
          </div>

          <div className="flex flex-col gap-3 pb-10">
            <label htmlFor="" className="font-medium text-md">
              Caption
            </label>
            <input className="border-2 border-gray-200 rounded outline-none text-md text-[#f51997]" type="text" value={caption} onChange={(e) =>{setCaption(e.target.value)}}/>
            <label htmlFor="" className="font-medium text-md">
              Choose a Category
            </label>
            <select 
            className="p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer text-md lg:p-4"
            onChange={(e:any) =>{ setCategory(e.target.value) }}
            name="" id="">
              {topics.map(topic => (
                <option value={topic.name} key={topic.name} className="p-2 text-gray-700 capitalize bg-white outline-none text-md hover:bg-slate-300">
                  {topic.name}
                </option>
              ))}
            </select>

            <div className="flex gap-6 mt-10">
              <button
                onClick={() => {  }}
                type="button"
                className="p-3 font-medium border-2 border-gray-300 rounded text-md w-28 lg:w-44"
              >Discard</button><button
                onClick={() =>{ handlePost() }}
                type="button"
                className="p-3 font-medium border-2 border-gray-300 rounded text-md w-28 lg:w-44 bg-[#f51997] text-white"
              >Post</button>
            </div>
         
          
        </div>
      </div>
    </div>
  )
}

export default Upload