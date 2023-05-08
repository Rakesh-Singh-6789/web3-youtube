'use client'
import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
//import saveToIPFS from "../../../utils/saveToIPFS";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";

export default function signUp() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");


    const signUp = async () => {
        console.log(name, bio, city, age);

        const web3 = await getWeb3();
        console.log(web3);
        console.log('idhar hich hai apun');
        //   // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const deployedNetwork = (useAction as any).networks[networkId];
        console.log("---", web3);
        const instance = new web3.eth.Contract(
            (useAction as any).abi,
            deployedNetwork && deployedNetwork.address,
        );

        console.log("----", deployedNetwork, instance);
        const dataaa = await instance.methods.addUser(name, bio, age, city).send({from: accounts[0]});
        console.log("final commit ment",dataaa);
    }

    return (
        <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
            <div className="flex-1 flex flex-col ms-80">
                <div className="flex flex-col m-10  mt-10  lg:flex-row justify-center">
                    <div className="flex lg:w-3/4 flex-col ">

                        <div className="flex flex-row mt-20 w-[90%]  justify-between">
                            <div className="flex flex-col w-2/5    ">
                                <label className="text-[#9CA3AF]  text-sm">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Enter Full Name"
                                    className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row mt-2 w-[90%]  justify-between">
                            <div className="flex flex-col w-2/5    ">
                                <label className="text-[#9CA3AF]  text-sm">Bio</label>
                                <input
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    type="text"
                                    placeholder="To The Moon and Beyond"
                                    className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row mt-2 w-[90%]  justify-between">
                            <div className="flex flex-col w-2/5    ">
                                <label className="text-[#9CA3AF]  text-sm">City</label>
                                <input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    type="text"
                                    placeholder="California"
                                    className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row mt-2 w-[90%]  justify-between">
                            <div className="flex flex-col w-2/5    ">
                                <label className="text-[#9CA3AF]  text-sm">Age</label>
                                <input
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    type="number"
                                    placeholder="24"
                                    className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-5 mr-10 flex">
                            <div className="flex items-center ms-20">
                                <button
                                    onClick={() => {
                                        signUp();
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
                                >
                                    <BiCloud />
                                    <p className="ml-2">Sign Up</p>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
