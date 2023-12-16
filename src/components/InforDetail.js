import { ConnectWallet } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { LiaHandshake } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
const InforDetail = () => {
  const [name, setName] = useState("#2068");
  const [onwer, setOnwser] = useState("5970D8");
  const [view, setView] = useState("24");
  const [fav, setFav] = useState("18");
  return (
    <div className="">
      <div
        className="d-flex justify-content-between"
        style={{ width: " 100%" }}
      >
        <Link
          style={{ color: "#007aff" }}
          className="text-decoration-none fs-5"
        >
          {" "}
          Descendants of Smurfcat
        </Link>
        <div className="d-flex fs-5 ">
          <LiaHandshake style={{ color: "#ccc" }} className="cursor" />
          <MdOutlineIosShare className="me-3 ms-3 cursor" />
          <FiMoreHorizontal className="cusor" />
        </div>
      </div>
      <h1 className="fs-2 mt-3  fw-semibold"> {name}</h1>
      <span className="fw-semibold">
        Owned by <span style={{ color: "#007aff" }}>{onwer}</span>
      </span>
      <div className="d-flex">
        <div className="d-flex m-3">
          <FaRegEye  className="mt-1 me-2 "/>
         <span>   {view} views</span>
        </div>
        <div className="d-flex m-3">
          <FaRegHeart  className="mt-1 me-2"/>
          <span>
          {fav} favorite
          </span>
        </div>

        <div className="d-flex m-3">
          <TbTriangleSquareCircle  className="mt-1 me-2"/>
          <span> Art</span>
         
        </div>
      </div>
    </div>
  );
};

export default InforDetail;
