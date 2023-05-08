import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";

import Loader from "./Loader";
import { getInstance } from "../upload/page";
import ReactPlayer from 'react-player';


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
    setVideos(prevVideos => [...prevVideos, dataaa]);
  };

  fetchData();
}, []);
  
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {(videos[0] as any).map((item: any, idx: any) => (
        <Box key={idx}>
          {console.log("---item",item)}
          {/* <pre>{item}</pre> */}
          <ReactPlayer url={`https://ipfs.io/ipfs/${item.IPFSHash}`} controls={true} />
          {/* <iframe src={`https://ipfs.video/gw/${item.IPFSHash}`} title="My iFrame" width="100%" height="500" frameBorder="0"></iframe> */}
          <br></br>
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;