'use client'
import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
//import saveToIPFS from "../../../utils/saveToIPFS";
import getWeb3 from "../../../utils/getWeb3";
import useAction from "../../../build/contracts/UserActions.json";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";

export const getInstance = async () => {
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
    return {instance, accounts};
}

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail]: any = useState("");
  const [video, setVideo]: any = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);


  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  

  const finalAttempt = async () => {
    // console.log('idhar hich hai apun');
    // const web3 = await getWeb3();
    // console.log(web3);
    // console.log('idhar hich hai apun');
    // //   // Use web3 to get the user's accounts.
    // const accounts = await web3.eth.getAccounts();
   
    // const networkId = await web3.eth.net.getId();
    // console.log(networkId);
    // const deployedNetwork = (useAction as any).networks[networkId];
    // console.log("---",web3);
    // const instance = new web3.eth.Contract(
    //   (useAction as any).abi,
    //   deployedNetwork && deployedNetwork.address,
    // );

    // console.log("----", deployedNetwork, instance);
    // console.log("--video", video);
    const {instance , accounts} = await getInstance();
    const ipfs = create({ url: "/ip4/127.0.0.1/tcp/5001" });

    const result = await ipfs.add(video);
    const ipfsHash = result.path;
    console.log('---', result);
    console.log(accounts[0])
    const dataaa = await instance.methods.addVideo(title, description, ipfsHash).send({from: accounts[0]});
    console.log("final commit ment",dataaa);
    if(dataaa.status) {
       setShowModal(true);
       setUploadStatus(true);
      } else {
        setShowModal(true);
       setUploadStatus(false);
      }
  }


  function RouteToListPage() {

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
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Upload Status
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      {}
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    {
                      uploadStatus ? <p className="my-4 text-slate-500 text-lg leading-relaxed">Video Uploaded Successfully :)</p> : <p className="my-4 text-slate-500 text-lg leading-relaxed">Something went wrong try again :/</p>
                    }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      RouteToListPage();
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
      }
    </div>
  );
}
