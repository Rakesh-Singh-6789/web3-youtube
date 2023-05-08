'use client'
import React, { useState, useRef, useEffect } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
//import saveToIPFS from "../../../utils/saveToIPFS";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";
import TTMToken from "../../../build/contracts/TTMToken.json";
import { useRouter } from "next/navigation";
import { getInstance } from "../upload/page";
import { Box, Stack, Typography } from "@mui/material";
import Videos from "./Videos";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



export const getTokenInstance:any = async () => {
    console.log('idhar hich hai apun');
      const web3 = await getWeb3();
      console.log(web3);
      console.log('idhar hich hai apun');
      //   // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
     
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = (TTMToken as any).networks[networkId];
      console.log("---",web3);
      const instance = new web3.eth.Contract(
        (TTMToken as any).abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("----", deployedNetwork, instance);
      return {instance, accounts};
  }

const buyToken = async () => {
    const { instance, accounts } = await getTokenInstance();
    const buy = await instance.methods.mint().send({value:1,from:accounts[0]});
    console.log("---buy",buy);
}




export default function listVideos() {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const { instance, accounts } = await getTokenInstance();
            const balance = await instance.methods.balanceOf(accounts[0]).call();
            console.log("--dattta1", balance);
            setBalance(balance);
          };
          fetchData();
      }, [balance]);
    
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
                        <div>
                            <button onClick={()=>{
                                buyToken();
                            }}>
                                Buy
                            </button>   
                            <span>{balance}
                            </span>
                        </div>
                        

                    </Typography>
                </Box>
            </Stack>
        </div>
    );
};
