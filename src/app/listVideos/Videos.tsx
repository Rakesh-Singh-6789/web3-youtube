import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";

import Loader from "./Loader";
import { getInstance } from "../upload/page";

const Videos = (videos:any) => {
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
  console.log("----inVideo.tsx",videos);
  const [loader, setLoader] = useState(true);
  // setTimeout(() => {
  //   if(!videos?.length) return <Loader />;
  // }, 500);
  
  
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item: any, idx: any) => (
        <Box key={idx}>
          <h1>{item}</h1>
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;