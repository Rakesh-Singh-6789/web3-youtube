'use client'
import React, { useState, useRef, useEffect } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
//import saveToIPFS from "../../../utils/saveToIPFS";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";
import { useRouter } from "next/navigation";
import { getInstance } from "../upload/page";
import { Box, Stack, Typography } from "@mui/material";
import Videos from "./Videos";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function listVideos() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        console.log("--newArray", videos);
      }, [videos]);

    // const getVideos = async () => {
    //     const { instance, accounts } = await getInstance();
    //     const dataaa = await instance.methods.getAllVideos().call();
    //     console.log("--dattta",dataaa);
    //     setVideos(() => [...videos,dataaa] as any);
    // }
    
    return (
        <div className="bg-gray-800 ">
            <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
                <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                    <Sidebar />

                    <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                        Team To The Moon.
                    </Typography>
                </Box>

                <Box className="mt-10" p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                        <span style={{ color: "#FC1503" }} >Videos</span>
                        <Videos />
                    </Typography>
                </Box>
            </Stack>
        </div>
    );
};
