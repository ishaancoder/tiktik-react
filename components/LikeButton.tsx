import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

interface IProps {
    handleLike: () => void,
    handleDislike: () => void,
    likes:any[];
}


const LikeButton = ({handleLike,handleDislike,likes}:IProps) => {


    const [alreadyLiked, setAlreadyLiked] = useState(false) 
    const { userProfile }:any = useAuthStore()
    const filteredLikes = likes?.filter(item => item._ref === userProfile?._id)

    useEffect(() => {
        if(filteredLikes?.length > 0) {
            setAlreadyLiked(true)
        } else 
        {setAlreadyLiked(false)}
    },[likes])
  return (
      <div className="flex">
        <div  className="flex flex-col items-center justify-center cursor-auto">
            {
                alreadyLiked ? (
                    <div className="p-2 rounded-full bg-primary md:p-4 text-[#f51997]" onClick={handleDislike}>
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                ) :(
                    <div className="p-2 rounded-full bg-primary md:p-4" onClick={handleLike}>
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                )
            }
            <p className="font-semibold text-md ">{likes?.length || 0}</p>
        </div>
        </div>
  )
}

export default LikeButton