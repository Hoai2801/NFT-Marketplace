import React, { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useParams } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import {
  useBuyDirectListing,
  useContract,
  useCancelDirectListing
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { LiaHandshake } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { IoMdCart } from "react-icons/io";
import { GoTag } from "react-icons/go";
import axios from "axios";
const contractAddress = "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36";

const DetailNFT = () => {
  // id of url
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
        const listing = await contractMarket.directListings.getListing(id);
        // console.log()
        console.log(listing);
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

  const BuyNFT = async () => {
    buyDirectListing({
      listingId: listing.asset.id, // ID of the listing to buy
      quantity: "1",
      buyer: address, // Wallet to buy for
    })
  };

  return (
    <div className="mt-5">
      <h2 className={`${listing ? "hidden" : ""}`}>Loading</h2>
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
              #{listing ? listing.asset.id : ""}
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
                <div class="card">
                  <div class="card-body">
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
                  </div>
                  <div className="card-footer">
                    <div>
                      <span className="text-secondary">Current price</span>
                      <div className="d-flex align-items-center gap-3">
                        <h1 className="fs-3">{price ? price : ""} MATIC</h1>
                        <span className="text-secondary">
                          ${price && priceMATIC ? price * priceMATIC : ""}
                        </span>
                      </div>

                      <div className="row">
                        <div className="col-7">
                          <div className="input-group mb-3">
                            {listing && listing.creatorAddress ?
                              <button onClick={() => cancelDirectListing(listing.asset.id)} className="w-[80%] bg-[#0D6EFD] text-white rounded-l-lg">Cancel Listing</button> :
                              <button onClick={BuyNFT} className="w-[80%] bg-[#0D6EFD] text-white rounded-l-lg">Buy</button>}

                            <span
                              className="input-group-text btn btn-primary  p-2 fs-3"
                              style={{ marginLeft: "1px" }}
                              id="basic-addon1"
                            >
                              <IoMdCart />
                            </span>
                          </div>
                        </div>
                        <div className="col-5 ">
                          <div className="btn btn-light  d-flex justify-content-center fs-5 align-items-center">
                            <GoTag className="me-3" />
                            Make offer
                          </div>
                        </div>
                        <span className="d-none"> hello</span>
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
