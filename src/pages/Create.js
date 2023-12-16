import React, { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useMetamask } from "@thirdweb-dev/react";

const Create = () => {
  const address = useAddress();

  const connectWithMetamask = useMetamask();

  // shorten the address of wallet
  const shortenAddress = (address) => {
    // Check if the address is valid
    if (!address || address.length !== 42) {
      return "Invalid address";
    }

    // Shorten the address
    const shortenedAddress = `${address.substring(0, 6)}...${address.substring(
      38
    )}`;
    return shortenedAddress;
  };

  const shortenedAddress = shortenAddress(address);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [supply, setSupply] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSupplyChange = (e) => {
    setSupply(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-[42px] font-bold">Create New NFT</h1>
        <div className="border rounded-lg border-gray-400 p-2 flex gap-5 mt-5">
          <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/11744586?s=280&v=4"
              alt=""
            />
          </div>
          <p className="mt-3">
            {shortenedAddress !== null
              ? shortenedAddress
              : "You are not connect"}
          </p>
          <div className="bg-gray-200 items-center justify-end flex h-fit mt-1 p-2 rounded-lg ">
            <div className={`${address !== null ? "" : "hidden"}`}>
              Connected
            </div>
            <button
              className={`${address ? "hidden" : ""}`}
              onClick={() => connectWithMetamask()}
            >
              Connect
            </button>
          </div>
        </div>
        <div className="mt-5">
          <h3>Upload file</h3>
          <div className="rounded-lg border-dashed mt-2 border-gray-400 border p-2 h-[200px] flex justify-center items-center">
            <div>
              <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
              <div className="flex w-full justify-center mt-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  hidden
                  id="actual-btn"
                />
                <label
                  htmlFor="actual-btn"
                  className="border h-fit rounded-lg p-2 bg-slate-200 cursor-pointer"
                >
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form className="gap-2 flex flex-col">
            <label>
              Name <span className="text-orange-400">*</span>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="ml-12 border-b border-black focus:border-b focus:outline-none p-2"
              />
            </label>
            <br />

            <label>
              Description
              <input
                value={description}
                onChange={handleDescriptionChange}
                className="ml-2 border-b border-black focus:border-b focus:outline-none p-2"
              />
            </label>
            <label>
                Initial Supply <span className="text-orange-400">*</span>
              <input
                value={supply}
                onChange={handleSupplyChange}
                className="ml-2 border-b border-black focus:border-b focus:outline-none p-2"
              />
            </label>
          </form>
        </div>
        <div>Put on marketplace</div>
      </div>
    </div>
  );
};

export default Create;
