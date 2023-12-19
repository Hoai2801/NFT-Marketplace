import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "../CSS/Account.css";
import { BsCopy } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
  // const inputString = useAddress();
  const inputString = useParams().id;
  console.log(inputString)
  const truncatedString = inputString ? `${inputString.substring(0, 4)}...${inputString.slice(
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

  const id = useAddress();

  // show nft
  const address = useAddress();

  const [listings, setListing] = useState();
  const { contract } = useContract(
    "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
  );
  const {
    data: nfts,
    isLoading,
    error,
  } = useOwnedNFTs(contract, inputString, { start: 0, count: 100 });

  const signer = useSigner();
  useEffect(() => {
    const effectData = async () => {
      // sdk and contract address of marketplace v3
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });
      const contractMarket = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const listings = await contractMarket.directListings.getAll();
      setListing(listings);
    };
    effectData();
  }, []);
  console.log(listings)

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
    await contractMarket.englishAuctions.createAuction(auction);
  };
  const [showForm1, setShowForm] = useState(false);

  const showForm = () => {
    setShowForm(!showForm1);
  }
  const [show, setShow] = useState(false);

  console.log(nfts)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            <img src={require(`../Img/avatar1.webp`)} alt="" />
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
        <div className={`${option === "nft" ? "" : "hidden"}`}>

          {/* <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Supply</th>
            <th scope="col" className={`col ${id == inputString ? "" : "hidden"}`}>Action</th>
            </tr>
          </thead> */}
          {nfts ? nfts.map((nft) => {
            return(
              <div className="rounded-lg w-[250px] bg-[#7f7777] overflow-hidden">
                <div className="h-[250px] w-full overflow-hidden">
                    <img src={nft.metadata.image} alt="" className="w-full p-0"/>
                </div>
                <div className="h-[80px] w-full pl-5 text-white ">
                    <p>{nft.metadata.name}</p>
                    <p>Supply: {nft.supply}</p>
                </div>
              </div>
              )
          }) : "loading"}
          {option === "nft" && nfts
        //     ? nfts.map((nfts, index) => {
        //         return (
        //           <tbody key={index}>
        //             <tr className="align-middle">
        //               <th scope="row">{nfts.metadata.id}</th>
        //               <td>{nfts.metadata.name}</td>
        //               <td>
        //                 <div className="w-[150px] h-[150px] overflow-hidden rounded-lg">
        //                   <img
        //                     src={nfts.metadata.image}
        //                     alt=""
        //                     className=" object-cover"
        //                   />
        //                 </div>
        //               </td>
        //               <td>{nfts.supply}</td>
        //               <td className={`col ${id == inputString ? "" : "hidden"} w-[350px]`}>
        //                 <button
        //                   onClick={() => listNFT(nfts.metadata.id)}
        //                   className="border rounded-lg p-2 bg-blue-400 px-5"
        //                 >
        //                   List
        //                 </button>
        //                 <button
        //                   onClick={() => bidNFT(nfts.metadata.id)}
        //                   className="border rounded-lg p-2 bg-red-400 ml-5 px-5"
        //                 >
        //                   Aution
        //                 </button>
        //               </td>
        //             </tr>
        //           </tbody>
        //         );
        //       })
        //     : "Loading"}
        // </div>
        //   <table className={`table ${option === "list" ? "" : "hidden"}`}>
        //     <thead>
        //       <tr>
        //         <th scope="col">#</th>
        //         <th scope="col">First</th>
        //         <th scope="col">Last</th>
        //         <th scope="col">Handle</th>
        //       </tr>
        //     </thead>
        // {option === "list" &&  listings ? listings.map((listing, index) => {
          
        //   return (
        //     <tbody key={index}>
        //       <tr className={`${listing.creatorAddress == inputString ? "" : "hidden"}`}>
        //         <th scope="row">{listing.id}</th>
        //         <td>{listing.pricePerToken}</td>
        //         <td><img src={listing.asset.image} alt="" /></td>
        //         <td>@mdo</td>
        //       </tr>
        //     </tbody>
        // )}): "loading"}
        // </table>
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
                    <td className="w-[350px]">
                      <button
                        onClick={() => listNFT(nfts.metadata.id)}
                        className="border rounded-lg p-2 bg-blue-400 px-5"
                      >
                        List
                      </button>
                      <button
                        onClick={() => bidNFT(nfts.metadata.id)}
                        className="border rounded-lg p-2 bg-red-400 ml-5 px-5"
                      >
                        Aution
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
            : "Loading"}
        {/* </table> */}
        {/* List */}
        {option === "list" && (
          <>
            <div className="d-flex flex-row-reverse">
              <Button variant="primary" onClick={handleShow} className="btn-primary btn d-flex items-center p-3">
                <span><LuPlus /> </span><span>Create Direct Listing</span>
              </Button>
            </div>

            <Modal show={show} onHide={handleClose} className="mt-[100px]">
              <Modal.Header closeButton>
                <Modal.Title>Create Direct Listing</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Listing Currency <span className="text-[red]">*</span></Form.Label>
                    <Form.Select aria-label="">
                      <option>Open this select menu</option>
                      <option value="1">MATIC (MATIC)</option>
                    </Form.Select>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The currency you want to sell yours tokens for.</span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Listing Price<span className="text-[red]">*</span></Form.Label>
                    <Form.Control aria-label="" type="text" placeholder="0"></Form.Control>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The price per token a buyer can pay to instantly buyout the auction.</span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Quantity <span className="text-[red]">*</span></Form.Label>
                    <Form.Control aria-label="" type="text" placeholder="1"></Form.Control>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The number of tokens to list for sale</span>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Create Direct Listing
                </Button>
              </Modal.Footer>
            </Modal>
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
          </>
        )}
        {/* Auction */}
        {option === "auc" && (
          <>
            <div className="d-flex flex-row-reverse">
              <Button variant="primary" onClick={handleShow} className="btn-primary btn d-flex items-center p-3">
                <span><LuPlus /> </span><span>Create Auction</span>
              </Button>
            </div>

            <Modal show={show} onHide={handleClose} className="mt-[100px]">
              <Modal.Header closeButton>
                <Modal.Title>Create Action New</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Listing Currency <span className="text-[red]">*</span></Form.Label>
                    <Form.Select aria-label="">
                      <option>Open this select menu</option>
                      <option value="1">MATIC (MATIC)</option>
                    </Form.Select>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The currency you want to sell yours tokens for.</span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Buyout Price Per Token <span className="text-[red]">*</span></Form.Label>
                    <Form.Control aria-label="" type="text" placeholder="0"></Form.Control>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The price per token a buyer can pay to instantly buyout the auction.</span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Quantity <span className="text-[red]">*</span></Form.Label>
                    <Form.Control aria-label="" type="text" placeholder="1"></Form.Control>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The number of tokens to list for sale</span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Reserve Price Per Token<span className="text-[red]">*</span></Form.Label>
                    <Form.Control aria-label="" type="text" placeholder="1"></Form.Control>
                    <span className="" style={{ fontSize: '14px ', color: "gray" }}>The minimum price per token necessary to bid on this auction.</span>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Auction Duration<span className="text-[red]">*</span></Form.Label>
                      <Form.Select aria-label="">
                        <option>Open this select </option>
                        <option value="1">1 Hour</option>
                        <option value="2">1 Day</option>
                        <option value="3">3 Days</option>
                        <option value="3">7 Days</option>
                        <option value="3">1 Month</option>
                      </Form.Select>
                      <span className="" style={{ fontSize: '14px ', color: "gray" }}>The duration of this aution.</span>
                    </Form.Group>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Create Auction
                </Button>
              </Modal.Footer>
            </Modal>

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
          </>
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
      </div>
    </section>
  );
}

export default Account;
