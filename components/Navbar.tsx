import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import Link from "next/link";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [search, setSearch] = useState('')
  const { userProfile, addUser,removeUser } : {userProfile:any, addUser:any, removeUser:any} = useAuthStore();
  const router = useRouter()
  const handleSearch = (e:{ preventDefault:() => void }) => {
    e.preventDefault()
        
    if(search) {
      router.push(`/search/${search}`)
    }
  }

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            layout="responsive"
          ></Image>
        </div>
      </Link>

      <div className="relative hidden md:block ">
        <form onSubmit={handleSearch} className="absolute bg-white md:static top-10 -left-10 ">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Your Videos"
            className="p-3 font-medium border-2 border-gray-100 bg-primary md:text-md focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0 "
          />
          <button>
            <BiSearch onClick={handleSearch} className="absolute pl-4 text-4xl text-gray-400 border-l-2 border-gray-300 top-1.5 md:right-5 right-6" />
          </button>
        </form>
      </div>

      <div className="">
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 ">
            <Link href="/upload">
              <button className="flex items-center gap-2 px-2 font-semibold border-2 md:px-4 text-m">
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                  <Image
                    width={62}
                    height={62}
                    className="cursor-pointer"
                    src={userProfile.image}
                  ></Image>
                </div>
              </Link>
            )}
            <button onClick={() => {
              googleLogout()
              removeUser()
            }} type="button" className="">
              <AiOutlineLogout color="red" fontSize="21" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("erroe")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
