'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React from "react";
import { useState } from "react";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";


function LandingPage() {
  const router = useRouter();
  // Creating a function to connect user's wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);

      console.log('in wallet');
      const web3 = await getWeb3();
      console.log(web3);
      //   // Use web3 to get the user's accounts.
      //const accountsTemp = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();

      console.log(networkId);
      const deployedNetwork = (useAction as any).networks[networkId];
      console.log("---", web3);
      const instance = new web3.eth.Contract(
        (useAction as any).abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log(accounts[0])

      const dataaa = await instance.methods.checkUserExists(accounts[0]).call();
      console.log("user exists", dataaa);
      if (!dataaa) {
        router.push("/signUp");
      } else {
        setTimeout(() => {
          router.push("/listVideos");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <section className="relative bg-black flex flex-col h-screen justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Join the Decentralized Video Revolution With{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Decentralized-YouTube
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-gray-400 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  A YouTube Clone built on top of Ethereum network, allow users
                  to create, share and watch videos, without worrying about
                  their privacy.
                </p>
                <button
                  className="items-center  bg-white rounded-full font-medium  p-4 shadow-lg"
                  onClick={() => {
                    // Calling the connectWallet function when user clicks on the button
                    connectWallet();
                    //alert();
                  }}
                >
                  <span>Connect wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
