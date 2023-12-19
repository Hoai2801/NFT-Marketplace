import React, { useEffect, useState } from "react";
import "../CSS/CardItem.css";
import { ThirdwebSDK, useContract, useWinningBid } from "@thirdweb-dev/react";
const Auction = (props) => {
  // bid data ! not auction
  const [bid, setBid] = useState();

  const [days, setDays] = useState();
  const [months, setMonths] = useState();
  const [years, setYears] = useState();

  // convert wei to eth
  const convertWeiToEth = (wei) => {
    const ethAmount = wei / 1e18; // 1 ether = 1e18 wei
    return ethAmount;
  };

  useEffect(() => {
    const fetchData = async () => {
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });

      const contract = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const winningBid = await contract.englishAuctions.getWinningBid(props.id);
      setBid(winningBid);

    };
    
    convertSecondsToDate(props.startTime);
    fetchData();
}, [props.id, props.startTime]);

  // convert second to date
  function convertSecondsToDate(seconds) {
    // Tạo đối tượng Date từ dấu thời gian theo giây
    const date = new Date(seconds * 1000);

    // Lấy năm, tháng và ngày
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng được đánh chỉ mục từ 0, vì vậy hãy thêm 1
    const day = date.getDate();

    setDays(day);
    setMonths(month);
    setYears(year);
  }

  // store the eth price from wei
  const ethAmount = convertWeiToEth(bid ? bid.bidAmount : 0);

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

  const shortenedAddress = shortenAddress(props.creatorAddress);

  return (
    <div
      className={`rounded-lg w-[280px] h-[350px] flex items-center flex-col p-2 card-item`}
    >
      <div className="h-[70%] w-[95%] rounded-lg overflow-hidden">
        <img className="w-full h-full object-cover" src={props.img} alt="" />
      </div>
      <div className="w-[95%]">
        <div className="w-[90%] h-[50px] overflow-hidden flex flex-col">
          <p className="my-0">by {shortenedAddress}</p>
          <p className="font-bold my-0">{props.name}</p>
        </div>
        <div className=" w-[90%] h-[60px] rounded-md p-2 text-[14px] bg-opacity-60">
          <div className="text-white grid grid-cols-5 gap-5">
            <div className="flex flex-col text-[gray] col-span-3">
              Start At
              <p style={{ fontSize: "14px", color: "#000", fontWeight: "700" }}>
                {days}/{months}/{years}
              </p>
            </div>
            <div className="flex flex-col text-[gray]">
              Bid
              <p
                style={{ fontSize: "14px", color: "#000", fontWeight: "700" }}
                className="d-flex gap-2"
              >
                {" "}
                <span>{ethAmount} </span> <span> MATIC</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
