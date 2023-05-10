'use client'
import React from "react";
import LandingPage from "./dapp/page";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/router';


// const LandingPageWithNoSSR : any = dynamic(
//   () => import('./dapp/page'),
//   { ssr: false }
// )


export default function index() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h3 className="text-4xl font-bold text-slate-900">Decentralized Video Sharing: A New Era for Online Content</h3>
        <h1 className="text-3xl text-slate-900">Team To The Moon</h1>
        <h3 className="text-1xl mt-8 text-slate-900">Build <span className="line-through">with extreme patience with no panic attacks</span>
        </h3>

        <h3 className="text-1xl mt-1 text-slate-900">on React.js, TailwindCSS, Solidity, IPFS, and Ethereum</h3>
        <Link className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href="/dapp">
          -- App --
        </Link>
      </div>
    </>

  );
}