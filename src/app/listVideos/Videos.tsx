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
      setVideos(dataaa);
    };

    fetchData();
  }, []);

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {
        (!(videos && videos?.length))
          ?
          <Loader />
          :
          (videos as any).map((item: any, idx: any) => {
            return (<Box  key={idx} className="w-3/12">
              {console.log("---item", item)}
              {/* <pre>{item}</pre> */}
              <div className="flex flex-row w-12/12">
              <ReactPlayer width="100%"
                height="100%" url={`https://ipfs.io/ipfs/${item.IPFSHash}`} controls={true} />
              </div>

              
              {/* <iframe src={`https://ipfs.video/gw/${item.IPFSHash}`} title="My iFrame" width="100%" height="500" frameBorder="0"></iframe> */}
              <br></br>
            </Box>);
          })
      }
    </Stack>
  );
}

export default Videos;