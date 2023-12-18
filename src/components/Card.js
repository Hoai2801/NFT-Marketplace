import React from 'react'

const Card = (props) => {

    // convert wei to eth
    const convertWeiToEth = (wei) => {
        const ethAmount = wei / 1e18; // 1 ether = 1e18 wei
        return ethAmount;
    };

    // status to word
    const changeStatus = (numberOfStatus) => {
        if (numberOfStatus === 4) return "Active";
        if (numberOfStatus === 3) return "Cancel";
        if (numberOfStatus === 2) return "Completed";
    }

    const status = changeStatus(props.status)
    // store the eth price from wei
    const ethAmount = convertWeiToEth(props.price);

    const shortenAddress = (address) => {
        // Check if the address is valid
        if (!address || address.length !== 42) {
          return 'Invalid address';
        }
    
        // Shorten the address
        const shortenedAddress = `${address.substring(0, 6)}...${address.substring(38)}`;
        return shortenedAddress;
      };
    
      const shortenedAddress = shortenAddress(props.creatorAddress);

  return (
    <div className={`rounded-lg shadow-lg w-[240px] h-[350px] flex items-center flex-col border border-black p-2`}>
        <div className='h-[70%] w-[95%] rounded-lg overflow-hidden bg-red-400'>
            <img className='w-full h-full object-cover' src={props.img} alt="" />
        </div>
        <div className='w-[95%]'>
            <div className='w-[90%] h-[50px] overflow-hidden flex flex-col'>    
                <p className='my-0'>by {shortenedAddress}</p>
                <p className='font-bold my-0'>{props.name}</p>
            </div>
            <div className='border w-[90%] bg-gray-400 h-[60px] rounded-md p-2 text-[14px] bg-opacity-60'>
                <p className='text-white grid grid-cols-2'>
                    <div className=''>
                        Status
                        <p>{status}</p>
                    </div>
                    <div className='flex flex-col'>
                        Price
                        <p>{ethAmount} MATIC</p>
                    </div>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Card