'use client'
import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] : any = useState("");
  const [video, setVideo] : any = useState("");

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

    function handleSubmit() {
        throw new Error("Function not implemented.");
    }

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
                handleSubmit();
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
