import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "../CSS/Account.css";
import { BsCopy } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import {
  useContract,
  useOwnedNFTs,
  useAddress,
  NATIVE_TOKEN_ADDRESS,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import  useLocation from 'react-router-dom';
function Account() {
  const inputString = useAddress();
  const truncatedString = inputString? `${inputString.substring(0, 4)}...${inputString.slice(
    -4
  )}` : "";
  const [option, setOption] = useState("nft");
  const textareaRef = useRef(null);
  const [copyNotification, setCopyNotification] = useState("");

  const copyOriginalString = () => {
    const textarea = document.createElement("textarea");
    textarea.value = inputString;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);
    setCopyNotification("Copied!");
    setTimeout(() => setCopyNotification(""), 2000);
  };

  // show nft
  const address = useAddress();

  const [contractMarket, setContractMarket] = useState();
  const [listings, setListing] = useState();
  const { contract } = useContract(
    "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
  );
  const {
    data: nfts,
    isLoading,
    error,
  } = useOwnedNFTs(contract, address, { start: 0, count: 100 });

  const signer = useSigner();
  useEffect(() => {
    const effectData = async () => {
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36",
      });
      const contractMarket = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const listings = await contractMarket.directListings.getAll();
      setListing(listings);
    };
    effectData();
  }, []);

  const listNFT = async (id) => {
    const sdk = new ThirdwebSDK(signer, "mumbai", {
      clientId: "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36",
    });
    const contractMarket = await sdk.getContract(
      "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
    );

    const listing = {
      // address of the contract the asset you want to list is on
      assetContractAddress: "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373",
      // token ID of the asset you want to list
      tokenId: id,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      // The price to pay per unit of NFTs listed.
      pricePerToken: 0.01,
      // when should the listing open up for offers
      startTimestamp: new Date(Date.now()),
      // how long the listing will be open for
      endTimestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      // Whether the listing is reserved for a specific set of buyers.
      isReservedListing: false,
    };
    await contractMarket.directListings.createListing(listing);
  };
  const bidNFT = async (id) => {
    const sdk = new ThirdwebSDK(signer, "mumbai", {
      clientId: "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36",
    });
    const contractMarket = await sdk.getContract(
      "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
    );

    const auction = {
      assetContractAddress: "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373",
      tokenId: id,
      quantity: "1",
      currency: NATIVE_TOKEN_ADDRESS,
      minimumBidAmount: "0.01",
      buyoutBidAmount: "0.01",
      timeBufferInSeconds: 60 * 60 * 24,
      bidBufferBps: "500",
      startTimestamp: new Date(Date.now()),
      endTimestamp: new Date(Date.now() + 60 * 60 * 24 * 7),
    };
    const tx = await contractMarket.englishAuctions.createAuction(auction);
  };

  return (
    <section className="container-master-1">
      <Row className="container-header">
        <img
          className="logo-profile"
          src={require(`../Img/cover.png`)}
          alt=""
        />
        <Col lg={12} className="profile-header">
          <div className="avatar-profile">
            <div className="status-profile"></div>
            <img src={require(`../Img/avatar2.png`)} alt="" />
          </div>
          <section className="title-profile">
            <div className="fs-3 d-inline-block me-4">Unnamed</div>
            <div className="d-flex gap-3 items-center">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={copyOriginalString}
                className="d-flex  items-center gap-2"
              >
                {truncatedString}
                <BsCopy />
              </span>
              <div>
                <span className="role-profile d-inline-block fw-bold p-1"></span>
                <span> Joined December 2023</span>
              </div>
            </div>
          </section>
          <div className="email-profile text-black-50 mt-4">
            {copyNotification}
          </div>
        </Col>
      </Row>
      <div className="flex w-full bg-white top-0 border-b-1 h-[50px] items-center justify-between px-20 navbar-master">
        <div className="flex justify-between w-[700px] gap-8">
          {/* menu */}
          <div className="flex justify-between w-[300px] mt-3 text-gray-500 menu-item  ">
            <Link
              to="#"
              onClick={() => setOption("nft")}
              className={`${option === "nft" ? "options-check" : ""}`}
            >
              NFT
            </Link>
            <Link
              to="#"
              onClick={() => setOption("list")}
              className={`${option === "list" ? "options-check" : ""}`}
            >
              List
            </Link>
            <Link
              to="#"
              onClick={() => setOption("auc")}
              className={`${option === "auc" ? "options-check" : ""}`}
            >
              Auction
            </Link>
          </div>
        </div>
      </div>
      <div className="px-20 mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Supply</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {option === "nft" && nfts
            ? nfts.map((nfts) => {
                return (
                  <tbody>
                    <tr className="align-middle">
                      <th scope="row">{nfts.metadata.id}</th>
                      <td>{nfts.metadata.name}</td>
                      <td>
                        <div className="w-[150px] h-[150px] overflow-hidden rounded-lg">
                          <img
                            src={nfts.metadata.image}
                            alt=""
                            className=" object-cover"
                          />
                        </div>
                      </td>
                      <td>{nfts.supply}</td>
                      <td>
                        <button
                          onClick={() => listNFT(nfts.metadata.id)}
                          className="border rounded-lg p-2 bg-blue-400"
                        >
                          List
                        </button>
                        <button
                          onClick={() => bidNFT(nfts.metadata.id)}
                          className="border rounded-lg p-2 bg-blue-400"
                        >
                          Aution
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            : "Loading"}
        </table>
        {option === "list" && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>list</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        )}
        {option === "auc" && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>1</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        )}
        <div>
          {/* {nfts
        ? nfts.map((nft) => {
            return (
              <div>
                <div className="border">
                  <div className="w-[150px] h-[150px] overflow-hidden rounded-lg">
                    <img
                      src={nft.metadata.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div> 
                  <button onClick={() => listNFT(nft.metadata.id)}>
                    Create Direct Listing!
                  </button>
                </div>
              </div>
            );
          })
        : "loading"} */}
        </div>
      </div>
    </section>
  );
}

export default Account;
