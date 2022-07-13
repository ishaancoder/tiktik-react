import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import '../styles/globals.css'
import React from 'react'


import {GoogleOAuthProvider} from '@react-oauth/google'

import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const progress = new ProgressBar({
  size: 6,
  color: "#f51997",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError",  progress.finish);

const MyApp = ({ Component, pageProps }: AppProps) => {


  // return           <Component {...pageProps} />


  const [isSSR,setisSSR] = useState(true)

  useEffect (() => {
    setisSSR(false)
  },[])

  if(isSSR) {
    return null
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_CLIENT_ID}`}>
            <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh] ">

      <Navbar></Navbar>
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar></Sidebar>
        </div>
        <div className="flex flex-col flex-1 h-[88vh] gap-10 mt-4 overflow-auto videos">
          <Component {...pageProps} />

        </div>
      </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp