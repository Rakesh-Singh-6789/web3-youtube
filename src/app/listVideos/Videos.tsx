import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";

import Loader from "./Loader";
import { getInstance } from "../upload/page";
import ReactPlayer from 'react-player';
import { getTokenInstance } from "./page";


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

  useEffect(() => {
    const fetchData = async () => {
      const { instance, accounts } = await getInstance();
      const dataaa = await instance.methods.getAllVideos().call();
      console.log("--dattta1", dataaa);
      setVideos(dataaa);
    };

    fetchData();
  }, []);

  const superChat = async () => {
    const { instance, accounts } = await getTokenInstance();
    console.log("----accounts",accounts);
    const donate = await instance.methods.transfer('0x71Fd53C52B500Ee60E9a6887A7DCD3671BaC6016', 1).send({from:accounts[0]});
    //const donate = await instance.methods.transfer('0x71Fd53C52B500Ee60E9a6887A7DCD3671BaC6016', 2000).call({from:accounts[0]});
    console.log("---donate", donate);
  }
  function getTime(timestamp: any) {
    const timeAgo = new Date(timestamp * 1000);
    const now = new Date();
    const diff = Math.abs(now.getTime() - new Date(timestamp).getTime());
    const hoursAgo = Math.floor(diff / (1000 * 60 * 60));
    const daysAgo = Math.floor(hoursAgo / 24);

    return (
      <span>
        {daysAgo > 0
          ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
          : `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`}
      </span>
    );
  }

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {
        (!(videos && videos?.length))
          ?
          <Loader />
          :
          (videos as any).map((item: any, idx: any) => {
            return (<Box key={idx} className="w-3/12 ms-20">
              <div className="relative h-0 pb-56">
                <ReactPlayer className="absolute top-0 left-0" width="100%"
                  height="100%" url={`https://ipfs.io/ipfs/${item.IPFSHash}`} controls={true} />
              </div>
              <div className="">
                <p className="flex text-[#9CA3AF]  text-sm">name: {item.name}
                  <p className="ms-auto text-[#9CA3AF]  text-sm">{getTime(item.publishedOn)}</p>
                </p>
                <p className="text-[#9CA3AF]  text-sm">desciption: {item.description}</p>
                <button onClick={() => superChat()}>
                  superChat
                </button>

              </div>
            </Box>);
          })
      }
    </Stack>
  );
}

export default Videos;