'use client'
import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
//import saveToIPFS from "../../../utils/saveToIPFS";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";


export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail]: any = useState("");
  const [video, setVideo]: any = useState("");

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();


  const finalAttempt = async () => {
    console.log('idhar hich hai apun');
    const web3 = await getWeb3();
    console.log(web3);
    console.log('idhar hich hai apun');
    //   // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
   
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    const deployedNetwork = (useAction as any).networks[networkId];
    console.log("---",web3);
    const instance = new web3.eth.Contract(
      (useAction as any).abi,
      deployedNetwork && deployedNetwork.address,
    );

    console.log("----", deployedNetwork, instance);
    console.log("--video", video);
    const ipfs = create({ url: "/ip4/127.0.0.1/tcp/5001" });

    const result = await ipfs.add(video);
    console.log('---', result);
    console.log(accounts[0])
    const dataaa = await instance.methods.checkUserExists(accounts[0]).call();
    console.log("final commit ment",dataaa);

  }

  // When a user clicks on the upload button

  // Function to upload the video to IPFS
  // const uploadThumbnail = async () => {
  //   // Passing the file to the saveToIPFS function and getting the CID
  //   const cid = await saveToIPFS(thumbnail);
  //   // Returning the CID
  //   return cid;
  // };

  // Function to upload the video to Livepeer
  // const uploadVideo = async () => {
  //   // Calling the createAsset function from the useCreateAsset hook to upload the video
  //   createAsset({
  //     name: title,
  //     file: video,
  //   } as any);
  // };

  // Function to save the video to the Contract
  // const saveVideo = async (data) => {
  //   // Get the contract from the getContract function
  //   let contract = await getContract();

  //   console.log()

  //   // Upload the video to the contract
  //   // await contract.uploadVideo(
  //   //   data.video,
  //   //   data.title,
  //   //   data.description,
  //   //   data.location,
  //   //   data.category,
  //   //   data.thumbnail,
  //   //   false,
  //   //   data.UploadedDate
  //   // );
  // };


  return (
    <div className="w-full h-screen bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            <button
              onClick={() => {
                finalAttempt();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TBD: Naam likhde"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="TBD: Kuch bhi likhde"
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="California - USA"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

            <div
              onClick={() => {
                (thumbnailRef.current as any).click();
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    (thumbnailRef.current as any).click();
                  }}
                  src={URL.createObjectURL(thumbnail as any)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef as any}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              (videoRef.current as any).click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
