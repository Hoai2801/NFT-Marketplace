import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import { Link } from 'react-router-dom';

import "../CSS/Navbar.css"
const Navbar = () => {
  return (
    <div className='flex w-full sticky bg-white top-0 items-center justify-between px-20 navbar-master' style={{borderBottom: "1px solid #E3DBD7"}}>
        <div className='flex justify-between  gap-20'>
            {/* logo */}
            <Link to="/">
                <img src={require("../Img/logomoixoaphonghd.png")} alt=""style={{width:'80px', height:'80px'}}/>
            </Link>
            <div>
                <input type="text" name="search" id="search" placeholder="Find collection or NFT'name" className='bg-gray-300 w-[300px] mt-3 rounded-lg h-[40px] p-4'/>
            </div>
            {/* nav  */}
            <div className='flex justify-between w-[300px] mt-4 text-gray-500 gap-10 navbar-item'>
                <Link to="/">Explore</Link>
                <Link to="/create">Create</Link>
                <Link to="/drops">Drops</Link>
                <Link to="/account">Account</Link>
            </div>
        </div>
        {/* button connect */}
        <div>
            <ConnectWallet theme="light" />
        </div>
    </div>
  )
}

export default Navbar