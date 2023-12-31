import React, { useEffect, useState } from "react";
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
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
import { IoMdCart } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { Bars } from "react-loading-icons";
import "../CSS/DetailNFT.css";

const contractAddress = "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36";

const DetailNFT = () => {
  const signer = useSigner();
  // get id from the url
  const [balance, setBalance] = useState();

  const { id } = useParams();
  const { contract } = useContract(contractAddress, "marketplace-v3");
  const address = useAddress();
  const [priceMATIC, setPrice] = useState();

  // listing
  const [listing, setListing] = useState();

  // conver wei to ether
  const price = listing ? ethers.utils.formatEther(listing.pricePerToken) : "";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        const sdkBalance = new ThirdwebSDK(signer, "eth", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });

        const balance = await sdkBalance.wallet.balance();

        setBalance(balance ? balance.displayValue : 0);
        // market
        const contractMarket = await sdk.getContract(
          "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
        );

        // get listing detail
        const listing = await contractMarket.directListings.getListing(id);
        setListing(listing);

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
  }, [id]);
  const [isPopup, setIsPopup] = useState(false);
  // buy the nft
  const BuyNFT = async (e) => {
    if (address == null) {
      await connectWallet();
    } else {
      try {
        if (balance < priceMATIC) {
          e.preventdefault();
        }
        buyDirectListing({
          listingId: listing.id, // ID of the listing to buy
          quantity: "1",
          buyer: address, // Wallet to buy for
        });
      } catch (error) {
        Swal.fire({
          title: "Good job!",
          text: "Please try again  :)))",
          icon: "error",
        });
      }
    }
  };
  const hanldeClosePopup = () => {
    setIsPopup(false);
  };
  // function to connect the metamask
  const connect = useConnect();

  const connectWallet = async () => {
    await connect(metamaskWallet());
  };

  console.log(listing);

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
              <Link to={`/account/${listing ? listing.creatorAddress : ""}`}>
                <span style={{ color: "#007aff" }}>
                  {listing ? listing.creatorAddress : ""}
                </span>
              </Link>
            </span>
            <div className="d-flex">
              <div className="d-flex m-3">
                <FaRegEye className="mt-1 me-2 " />
                <span> 24 views</span>
              </div>
              <div className="d-flex m-3">
                <FaRegHeart className="mt-1 me-2" />
                <span>18 favorite</span>
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
                  {/* <div className="card-body">
                    Sale ends 16 tháng 12, 2023 at 7:05 CH
                    <div className="d-flex">
                      <div className="m-2">
                        <div className="text-danger fs-4">00</div>
                        <span>Hours</span>
                      </div>
                      <div className="m-2">
                        <div className="text-danger fs-4">00</div>
                        <span>Hours</span>
                      </div>
                      <div className="m-2">
                        <div className="text-danger fs-4">00</div>
                        <span>Hours</span>
                      </div>
                    </div>
                  </div> */}
                  <div className="card-footer">
                    <div>
                      <span
                        className="text-secondary d-block mb-4 "
                        style={{ fontSize: "18px" }}
                      >
                        Current price
                      </span>
                      <div className="d-flex align-items-center gap-4">
                        <h1 className="fs-3">{price ? price : ""} MATIC</h1>
                        <span className="text-secondary">
                          ${price && priceMATIC ? price * priceMATIC : ""}
                        </span>
                      </div>

                      <div className="row relative">
                        <div className="col-12">
                          <div className="input-group mb-3 w-full mt-4 flex justify-center">
                            {listing && listing.creatorAddress === address ? (
                              <button
                                onClick={() => cancelDirectListing(listing.id)}
                                className="w-[80%] bg-[#0D6EFD] text-white rounded-l-lg"
                              >
                                Cancel Listing
                              </button>
                            ) : (
                              <button
                                onClick={BuyNFT}
                                className={`w-[90%] bg-[#0D6EFD] text-white rounded-l-lg cursor-wait  ${
                                  listing != null && listing.quantity == 0
                                    ? "cursor-move"
                                    : ""
                                }`}
                              >
                                {listing != null && listing.quantity == 0
                                  ? "Sout out"
                                  : "Buy"}
                              </button>
                            )}
                            {/* Popup */}
                            {isPopup && (
                              <div className="popup">
                                <div className="popup-content">
                                  <IoIosCloseCircleOutline
                                    className="w-6 h-6 hover:cursor-pointer"
                                    onClick={hanldeClosePopup}
                                  />
                                  <div className="w-full h-full flex justify-center items-center">
                                    <input
                                      type="text"
                                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                                      placeholder="Please input data"
                                      required
                                    />
                                  </div>
                                </div>{" "}
                              </div>
                            )}

                            <span
                              className="input-group-text btn btn-primary  p-2 fs-3"
                              style={{ marginLeft: "1px" }}
                              id="basic-addon1"
                            >
                              <IoMdCart />
                            </span>
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

export default DetailNFT;
