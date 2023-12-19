import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Link, useParams } from "react-router-dom";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useSigner,
} from "@thirdweb-dev/react";
import { LiaHandshake } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
import axios from "axios";
import { Bars } from "react-loading-icons";

const AuctionDetail = () => {
  // get id from the url
  const { id } = useParams();
  const address = useAddress();
  const [priceMATIC, setPrice] = useState();

  // time countdown
  const [hoursRemaining, setHours] = useState();
  const [minutesRemaining, setMinutes] = useState();
  const [secondsRemaining, setSeconds] = useState();

  // date end
  const [days, setDays] = useState();
  const [months, setMonths] = useState();
  const [years, setYears] = useState();

  const [winningBid, setWinningBid] = useState();

  // listing
  const [listing, setListing] = useState();

  const [view, setView] = useState("24");
  const [fav, setFav] = useState("18");

  const signer = useSigner();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        // market
        const contractMarket = await sdk.getContract(
          "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
        );

        // get listing detail
        const auction = await contractMarket.englishAuctions.getAuction(id);
        countdown(auction.endTimeInSeconds);
        // console.log(auction)

        const winningBid = await contractMarket.englishAuctions.getWinningBid(
          id
        );
        // console.log(winningBid);
        setWinningBid(winningBid);

        setListing(auction);

        // change endTimeInSecond to date
        convertSecondsToDate(auction.endTimeInSeconds);

        // api get MATIC price
        const price = await axios.get(
          "https://api.diadata.org/v1/assetQuotation/Polygon/0x0000000000000000000000000000000000001010"
        );
        setPrice(price.data.Price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, secondsRemaining, countdown, signer]);

  // convert second to date
  function convertSecondsToDate(seconds) {
    // Tạo đối tượng Date từ dấu thời gian theo giây
    const date = new Date(seconds * 1000);

    // Lấy năm, tháng và ngày
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    setDays(day);
    setMonths(month);
    setYears(year);
  }

  const cancelAuction = async() => {
    const sdk = new ThirdwebSDK(signer, "mumbai", {
      clientId: "598b4f1195f15842446b09538ba00622",
    });

    const contract = await sdk.getContract("0x5237bcc6f1848CDdF2785a12e1114Cd639895e36");

    await contract.englishAuctions.cancelAuction(id);
    await contract.call("collectAuctionPayout", id);
    await contract.call("collectAuctionTokens", id);
  }

  // function to connect the metamask
  const connect = useConnect();


  // make a bid 
  const bidAuction = async () => {
    try {
      const sdk = new ThirdwebSDK(signer, "mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });
  
      const contract = await sdk.getContract("0x5237bcc6f1848CDdF2785a12e1114Cd639895e36");

      await contract.englishAuctions.makeBid(id, 0.15);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  function countdown(endTimeInSeconds) {
    // Create date object from timestamp
    const endTime = new Date(endTimeInSeconds * 1000);

    // Get current time
    const now = new Date();

    // Calculate remaining time
    const timeRemaining = endTime.getTime() - now.getTime();

    // Convert remaining time to hours, minutes, and seconds
    const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

    // Update state with calculated values
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

    // Update countdown every second
    setTimeout(() => countdown(endTimeInSeconds), 1000);
  }

  const connectWallet = async () => {
    await connect(metamaskWallet());
  };

  return (
    <div className="mt-5">
      <div
        className={`${
          listing
            ? "hidden"
            : "d-flex justify-content-center align-items-center"
        }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(1, 1, 1, 0.6)",
          zIndex: 9999,
        }}
      >
        <Bars />
      </div>
      <div className={`container-master-img-infor ${listing ? "" : "hidden"}`}>
        <div className="flex w-full px-20 gap-5 justify-between">
          {/* card-detail */}
          <div className="w-[50%] h-[80vh] rounded-lg overflow-hidden">
            <img
              src={`${listing ? listing.asset.image : ""}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col  w-full">
            <div
              className="d-flex justify-content-between w-full"
              style={{ width: " 100%" }}
            >
              <h2 className="text-decoration-none font-bold text-[52px]">
                {listing ? listing.asset.name : ""}
              </h2>
              <div className="d-flex fs-5 ">
                <LiaHandshake style={{ color: "#ccc" }} className="cursor" />
                <MdOutlineIosShare className="me-3 ms-3 cursor" />
                <FiMoreHorizontal className="cusor" />
              </div>
            </div>
            <h1 className="fs-2 mt-3  fw-semibold">
              {" "}
              #{listing ? listing.id : ""}
            </h1>
            <span className="fw-semibold">
              Owned by{" "}
              <Link to={`/account/${listing ? listing.creatorAddress : ""}`} >
                <span style={{ color: "#007aff" }}>
                  {listing ? listing.creatorAddress : ""}
                </span>
              </Link>
            </span>
            <div className="d-flex">
              <div className="d-flex m-3">
                <FaRegEye className="mt-1 me-2 " />
                <span> {view} views</span>
              </div>
              <div className="d-flex m-3">
                <FaRegHeart className="mt-1 me-2" />
                <span>{fav} favorite</span>
              </div>

              <div className="d-flex m-3">
                <TbTriangleSquareCircle className="mt-1 me-2" />
                <span> Art</span>
              </div>
            </div>
            {/* info right */}
            <div className="col-lg-7 px-3 ">
              <div className="">
                <div className="card">
                  <div className="card-body">
                    Aution ends {days} - {months} - {years}
                    <div className="d-flex">
                      <div className="m-2">
                        <div className="text-danger fs-4">{hoursRemaining}</div>
                        <span>Hours</span>
                      </div>
                      <div className="m-2">
                        <div className="text-danger fs-4">
                          {minutesRemaining}
                        </div>
                        <span>Minutes</span>
                      </div>
                      <div className="m-2">
                        <div className="text-danger fs-4">
                          {secondsRemaining}
                        </div>
                        <span>Second</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div>
                      <span
                        className="text-secondary d-block mb-4 font-bold"
                        style={{ fontSize: "18px" }}
                      >
                        Hightest bid belong to{" "}
                        <Link to={`/account/${winningBid ? winningBid.bidderAddress : ""}`} >
                          <span className="text-orange-400">
                            {winningBid ? winningBid.bidderAddress : "nobody"}
                          </span>
                        </Link>
                      </span>
                      <div className="d-flex align-items-center gap-4">
                        <h1 className="fs-3">
                          {winningBid ? winningBid.bidAmount / 1e18 : "0"} MATIC
                        </h1>
                        <span className="text-secondary">
                          $
                          {winningBid && priceMATIC
                            ? (winningBid.bidAmount / 1e18) * priceMATIC
                            : "0"}
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="input-group mb-3 w-full mt-4 flex justify-center">
                            {listing && listing.creatorAddress === address ? (
                              <button
                                onClick={() => cancelAuction()}
                                className="w-[90%] bg-[#0D6EFD] text-white rounded-lg h-[45px] font-bold"
                              >
                                Cancel Auction and get the bid now
                              </button>
                            ) : (
                              <button
                                onClick={() => bidAuction()}
                                className={`w-[90%] bg-[#0D6EFD] text-white rounded-lg h-[45px] font-bold cursor-wait  ${
                                  listing != null && listing.quantity == 0
                                    ? "cursor-move"
                                    : ""
                                }`}
                              >
                                Make a bid with {listing ? (winningBid.bidAmount / 1e18 + listing.minimumBidAmount / 1e18) : 0}
                              </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
