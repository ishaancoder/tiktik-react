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
  const { userProfile, addUser,removeUser } : {userProfile:any, addUser:any, removeUser:any} = useAuthStore();

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
{/* 
      <div className="relative hidden md:block ">
        <form onSubmit={handleSearch} className="absolute ">
          
          
        </form>
      </div> */}

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
