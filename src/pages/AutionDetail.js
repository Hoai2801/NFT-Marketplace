import React, { useEffect, useState } from "react";
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useParams } from "react-router-dom";
import {
  metamaskWallet,
  useAddress,
  useConnect,
  useSigner,
} from "@thirdweb-dev/react";
import {
  useBuyDirectListing,
  useContract,
  useCancelDirectListing,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { LiaHandshake } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
import axios from "axios";
import { Bars } from "react-loading-icons";
const contractAddress = "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36";

const AutionDetail = () => {
  // get id from the url
  const { id } = useParams();
  const { contract } = useContract(contractAddress, "marketplace-v3");
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

  // conver wei to ether
  const price = listing
    ? ethers.utils.formatEther(listing.buyoutBidAmount)
    : "";
  const {
    mutateAsync: buyDirectListing,
    isLoading,
    error,
  } = useBuyDirectListing(contract);

  // cancel the derect listing
  const {
    mutateAsync: cancelDirectListing,
    isCanelLoading,
    cancelError,
  } = useCancelDirectListing(contract);

  const [view, setView] = useState("24");
  const [fav, setFav] = useState("18");

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
        console.log(winningBid)
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
  }, [id, secondsRemaining]);

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

  // buy the nft
  const BuyNFT = async () => {
    if (address == null) {
      await connectWallet();
    } else {
      buyDirectListing({
        listingId: listing.asset.id, // ID of the listing to buy
        quantity: "1",
        buyer: address, // Wallet to buy for
      });
    }
  };
  // function to connect the metamask
  const connect = useConnect();
  const signer = useSigner();
  const mintNFT = async () => {
    try {
      const sdk = new ThirdwebSDK(signer, "mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });

      const contract = await sdk.getContract(
        "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
      );
      const metadata = {
        name: "name",
        description: "description",
        image:
          "https://images.unsplash.com/photo-1702611120121-e03dafc14150?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8", // This can be an image url or file
      };
      const toAddress = "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07";

      const metadataWithSupply = {
        metadata,
        supply: 1000, // The number of this NFT you want to mint
      };

      const tx = await contract.erc1155.mintTo(toAddress, metadataWithSupply);
      const receipt = tx.receipt; // the transaction receipt
      const tokenId = tx.id; // the id of the NFT minted
      const nft = await tx.data(); // (optional) fetch details of minted NFT
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  function countdown(endTimeInSeconds) {
    // Tạo đối tượng Date từ dấu thời gian theo giây
    const endTime = new Date(endTimeInSeconds * 1000);

    // Lấy thời gian hiện tại
    const now = new Date();

    // Tính toán thời gian còn lại
    const timeRemaining = endTime.getTime() - now.getTime();

    // Chuyển đổi thời gian còn lại thành giờ, phút và giây
    const hoursRemaining = Math.floor(timeRemaining / (60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (60 * 60)) / 60);
    const secondsRemaining = timeRemaining % 60;

    // Trả về các giá trị thời gian còn lại
    setHours(hoursRemaining);
    setMinutes(minutesRemaining);
    setSeconds(secondsRemaining);
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
              <span style={{ color: "#007aff" }}>
                {listing ? listing.creatorAddress : ""}
              </span>
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
                        Hightest bid belong to <span className="text-orange-400">{winningBid ? winningBid.bidderAddress : "nobody"} </span>
                      </span>
                      <div className="d-flex align-items-center gap-4">
                        <h1 className="fs-3">{winningBid ? winningBid.bidAmount / 1e18 : "0"} MATIC</h1>
                        <span className="text-secondary">
                          ${winningBid && priceMATIC ? winningBid.bidAmount / 1e18 * priceMATIC : ""}
                        </span>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <div className="input-group mb-3 w-full mt-4 flex justify-center">
                            {listing && listing.creatorAddress === address ? (
                              <button
                                onClick={() => cancelDirectListing(listing.id)}
                                className="w-[90%] bg-[#0D6EFD] text-white rounded-lg h-[45px] font-bold"
                              >
                                Cancel Auction
                              </button>
                            ) : (
                              <button
                                onClick={BuyNFT}
                                className={`w-[90%] bg-[#0D6EFD] text-white rounded-lg h-[45px] font-bold cursor-wait  ${
                                  listing != null && listing.quantity == 0
                                    ? "cursor-move"
                                    : ""
                                }`}
                              >
                                Make a bid
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

export default AutionDetail;
