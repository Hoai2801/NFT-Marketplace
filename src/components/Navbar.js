import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../CSS/Navbar.css";
const Navbar = () => {
    const address = useAddress();
    // State to store the input value
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

  // Event handler to update the state when the input changes
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle form submission or any other action you need
  const handleSubmit = (event) => {
    event.preventDefault();

    // Redirect to the search page with the searchValue parameter
    navigate(`/search/${searchValue}`);
  };

  return (
    <div
      className="flex w-full sticky bg-white top-0 items-center justify-between px-20 navbar-master"
      style={{ borderBottom: "1px solid #E3DBD7" }}
    >
      <div className="flex justify-between  gap-20">
        {/* logo */}
        <Link to="/">
          <img
            src={require("../Img/logomoixoaphonghd.png")}
            alt=""
            style={{ width: "80px", height: "80px", minWidth: "80px" }}
          />
        </Link>
        <div>
          {/* <input type="text" name="search" id="search" placeholder="Find collection or NFT'name" className='bg-gray-300 w-[300px] mt-3 rounded-lg h-[40px] p-4'/> */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Name of NFT is listing"
              className="bg-gray-300 w-[300px] mt-3 rounded-lg h-[40px] p-4"
              value={searchValue}
              onChange={handleInputChange}
            />
          </form>
        </div>
        {/* nav  */}
        <div className="flex justify-between w-[300px] mt-4 text-gray-500 gap-10 navbar-item">
          <Link to="/">Explore</Link>
          <Link to="/create">Create</Link>
          {/* <Link to="/drops">Drops</Link> */}
          <Link to={`/account/` + address}>Account</Link>
        </div>
      </div>
      {/* button connect */}
      <div>
        <ConnectWallet theme="light" />
      </div>
    </div>
  );
};

export default Navbar;
