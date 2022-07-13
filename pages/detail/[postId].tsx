import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
import useAuthStore from "../../store/authStore";
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [isPlaying, setPlaying] = useState(false);
  const [post, setPost] = useState(postDetails);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const { userProfile }:any = useAuthStore()
  const [comment, setComment] = useState("")
  const [isPostingComment, setIsPostingComment] = useState(false)

  const videoRef = useRef <any>(null);

  const onVideoPress = () => {
    console.log(videoRef);
    if (isPlaying) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };


  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleLike = async(like:boolean) => {
      if(userProfile) {
        const { data } = await axios.put(`${BASE_URL}/api/like`,{
          userId: userProfile._id,
          postId: post._id,
          like
        })
        setPost({ ...post,likes: data.likes });
      }
      
  }

  const addComment = async (e:React.FormEvent) => {
      e.preventDefault();
      if(userProfile && comment) { 
          setIsPostingComment(true)
          console.log("Sending requests!!!")
          const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`,{
            userId: userProfile?._id,
            comment
          })

          setPost({ ...post,comments:data.comments })
          setComment('') 
          setIsPostingComment(false)
      }
      
  }

  if (!post) return null;
  return (
    <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px]  lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
          <p>
            <Link href="/">
              <MdOutlineCancel className="text-white text-[35px]"></MdOutlineCancel>
            </Link>
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoPress}
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer ">
            {!isPlaying && (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
          {isVideoMuted ? (
            <button>
              <HiVolumeOff
                onClick={() => setIsVideoMuted(false)}
                className="text-2xl text-black lg:text-4xl "
              />
            </button>
          ) : (
            <button>
              <HiVolumeUp
                onClick={() => setIsVideoMuted(true)}
                className="text-2xl text-black lg:text-4xl "
              />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
            <div className="w-10 h-10 md:w-16 md:h-16">
              <Link href="/">
                <>
                  <Image
                    width="62"
                    height="62"
                    className="rounded-full"
                    layout="responsive"
                    src={post.postedBy.image}
                  />
                </>
              </Link>
            </div>
            <div className="">
              <Link href="/">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 font-bold md:text-md ">
                    {post.postedBy.userName}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>{" "}
                  {`
              `}
                  <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                    {post.postedBy.userName}
                  </p>
                  {`
              `}
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-400 ">{post.caption}</p>

          <div className="px-10 mt-10 ">
            {
              userProfile && (
                <LikeButton
                likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() =>handleLike(false)}
                  
                />
              ) 
            }
            <Comments 
              comment={comment}
              addComment={addComment}
              isPostingComment={isPostingComment}
              comments={post.comments}
              setComment={setComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { postId },
}: {
  params: { postId: string },
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${postId}`);
  console.log(data);

  return {
    props: {
      postDetails: data,
    },
  };
};

export default Detail;
