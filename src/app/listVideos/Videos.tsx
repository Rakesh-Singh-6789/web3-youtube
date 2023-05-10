import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";

import Loader from "./Loader";
import { getInstance } from "../upload/page";
import ReactPlayer from 'react-player';
import { getTokenInstance } from "./page";
import { BiDonateBlood, BiDonateHeart } from "react-icons/bi";
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiFillShopping } from "react-icons/ai";


const Videos = () => {
  //const [videos, setVideo] = useState([""]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {instance, accounts} = await getInstance();
  //     console.log("--inst",instance);
  //     const videoData = await (instance as any).methods.getAllVideos.call();
  //     console.log("---VD",videoData);
  //   }
  //   fetchData();
  // },[]);
  //const [loader, setLoader] = useState(true);
  // setTimeout(() => {
  //   if(!videos?.length) return <Loader />;
  // }, 500);

  const [videos, setVideos] = useState([]);
  const [token, setToken] = useState(1000000000000000000);
  const [donateToken, setDonateToken] = useState(1000000000000000000);
  const [showDonateModal, setShowDonateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { instance, accounts } = await getInstance();
      const dataaa = await instance.methods.getAllVideos().call();
      console.log("--dattta1", dataaa);
      setVideos(dataaa);
    };

    fetchData();
  }, []);

  const showDonateModalCall = () => {
    setShowDonateModal(true);
  }
  const superChat = async (userAddress: any) => {
    const { instance, accounts } = await getTokenInstance();
    console.log("----accounts", accounts);
    const donate = await instance.methods.transfer(userAddress, donateToken).send({ from: accounts[0] });
    //const donate = await instance.methods.transfer('0x71Fd53C52B500Ee60E9a6887A7DCD3671BaC6016', 2000).call({from:accounts[0]});
    console.log("---donate", donate);
  }
  // function getTime(timestamp: any) {
  //   const timeAgo = new Date(timestamp * 1000);
  //   const now = new Date();
  //   const diff = Math.abs(now.getTime() - timeAgo.getTime());
  //   const hoursAgo = Math.floor(diff / (1000 * 60 * 60));
  //   const daysAgo = Math.floor(hoursAgo / 24);

  //   return (
  //     <span>
  //       {daysAgo > 0
  //         ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  //         : `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`}
  //     </span>
  //   );
  // }
  function getTime(timestamp: any) {
    const timeAgo = new Date(timestamp * 1000);
    const now = new Date();
    const diff = Math.abs(now.getTime() - timeAgo.getTime());
    const secondsAgo = Math.floor(diff / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (daysAgo > 0) {
      return <span>{`${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}</span>;
    } else if (hoursAgo > 0) {
      return <span>{`${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`}</span>;
    } else if (minutesAgo > 0) {
      return <span>{`${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`}</span>;
    } else {
      return <span>{`${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`}</span>;
    }
  }
  

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {
        (!(videos && videos?.length))
          ?
          <Loader />
          :
          (videos as any).map((item: any, idx: any) => {
            return (<Box key={idx} className="w-3/12 ms-10">
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-500">
                <ReactPlayer className="w-full" width="100%"
                  height="100%" url={`https://ipfs.io/ipfs/${item.IPFSHash}`} controls={true} />
                <div className="px-6 py-4">
                  <div className="flex font-bold text-base mb-2 fl">
                    {item.name}
                    <p className="ms-auto text-[#9CA3AF]  text-sm">{getTime(item.publishedOn)}</p>
                  </div>
                  <p className="text-gray-900 text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="px-6 pb-2">
                  <div className="flex">
                    <span onClick={() => showDonateModalCall()} className="cursor-pointer flex inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <div className="text-2xl">
                        <BiDonateHeart />
                      </div>
                      Donate
                    </span>
                  </div>
                </div>
              </div>
              {showDonateModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="p-5 border-b rounded-t text-gray-700 flex items-center">
                          <div className="flex text-3xl">
                            <BiDonateBlood />
                            <span className="text-1xl text-gray-700 font-semibold">
                              Donate TTM tokens to the publisher.
                            </span>
                          </div>
                          <button
                            className="flex text-3xl ml-auto"
                            onClick={() => setShowDonateModal(false)}
                          >
                            <AiFillCloseCircle />
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto justify-center text-center">
                          <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                            Enter the amount of tokens you want to donate.
                          </p>
                          <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                            1 TTM Token = 1 Wei Token
                          </p>
                          <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                            Enter TTM Tokens below
                          </p>
                          <div className="flex flex-row items-center ms-20">
                            <div className="flex flex-row items-center space-x-2">
                              <button
                                onClick={() => {
                                  setDonateToken(donateToken - 1);
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                              >
                                <AiFillMinusCircle />
                              </button>
                              <div className="flex items-center justify-center">
                                <textarea style={{ height: '45px' }} className="w-full p-2 rounded-lg border-gray-900 text-gray-700" type="number"
                                  inputMode="numeric"
                                  value={donateToken}
                                  onChange={(event) => {
                                    setDonateToken(parseInt(event.target.value));
                                  }}></textarea>
                              </div>
                              <button
                                onClick={() => {
                                  setDonateToken(donateToken + 1);
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                              >
                                <AiFillPlusCircle />
                              </button>
                            </div>
                          </div>
                          <p className="my-4 text-slate-500 text-base leading-relaxed text-center">
                            Equivalent Eth Value = {donateToken / 1000000000000000000}
                          </p>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={async () => {
                              await superChat(item.userAddress);
                              setShowDonateModal(false);
                            }}
                          >
                            Donate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null
              }
            </Box>);
          })
      }
    </Stack>
  );
}

export default Videos;