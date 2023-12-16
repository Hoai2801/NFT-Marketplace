import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='flex w-full sticky bg-white top-0 border-b-1 border shadow-lg h-[100px] items-center justify-between px-20'>
        <div className='flex justify-between w-[700px] gap-8'>
            {/* logo */}
            <Link to="/">
                <h2 className='text-[28px] text-black font-bold'>Logo</h2>
            </Link>
            <div>
                <input type="text" name="search" id="search" placeholder="Find collection or NFT'name" className='bg-gray-300 w-[300px] mt-2 rounded-lg h-[40px] p-4'/>
            </div>
            {/* nav  */}
            <div className='flex justify-between w-[300px] mt-3 text-gray-500'>
                <Link to="/create">Create</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/drops">Drops</Link>
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