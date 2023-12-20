import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "../CSS/Account.css";
import { BsCopy } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  useContract,
  useOwnedNFTs,
  useAddress,
  NATIVE_TOKEN_ADDRESS,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Card from "../components/Card";
import Auction from "../components/Auction";
// import  useLocation from 'react-router-dom';
import { Alchemy, Network } from "alchemy-sdk";

function Account() {
  const config = {
    apiKey: "ZEIgYqZicvI84G_XlfzAu1YU6sdqJGOo",
    network: Network.MATIC_MUMBAI,
  };
  // const [newNFT, setNewNFT] = useState();
  const newNFT = [
    {
      "contract": {
        "address": "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373",
        "name": "Create NFT",
        "tokenType": "ERC1155",
        "contractDeployer": "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07",
        "deployedBlockNumber": 43557168,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-14T10:12:16.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "0",
      "tokenType": "ERC1155",
      "name": "Sea",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmdQvb8iA8aHAuDxpPrMauDUML4ZtRvMLvzMGjVJiyxb5k/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/6749ba4e5c471bae55203216d896ff71",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/6749ba4e5c471bae55203216d896ff71",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/6749ba4e5c471bae55203216d896ff71",
        "contentType": "image/png",
        "size": 190827,
        "originalUrl": "https://ipfs.io/ipfs/QmeorfCzsAAbQCCvUwsoKLBF6DUUApfyuKojWP7LWscKc7/photo-1701986789743-62603f3cc027.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmdQvb8iA8aHAuDxpPrMauDUML4ZtRvMLvzMGjVJiyxb5k/0",
        "metadata": {
          "image": "ipfs://QmeorfCzsAAbQCCvUwsoKLBF6DUUApfyuKojWP7LWscKc7/photo-1701986789743-62603f3cc027.png",
          "external_url": "",
          "background_color": "",
          "name": "Sea",
          "description": "",
          "customImage": "",
          "attributes": [
            {
              "value": "10",
              "trait_type": "cool"
            }
          ],
          "customAnimationUrl": "",
          "supply": "10"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.493Z",
      "balance": "19",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373",
        "name": "Create NFT",
        "tokenType": "ERC1155",
        "contractDeployer": "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07",
        "deployedBlockNumber": 43557168,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-14T10:12:16.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "1",
      "tokenType": "ERC1155",
      "name": "girl",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmVo4dgwuWNsuVBjrdmdDPTFDsLdQ4ynDMR9Z6wvqMxnDn/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/878a8355ed733be2ca129ecf5fc0e75a",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/878a8355ed733be2ca129ecf5fc0e75a",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/878a8355ed733be2ca129ecf5fc0e75a",
        "contentType": "image/png",
        "size": 38769,
        "originalUrl": "https://ipfs.io/ipfs/QmYxXDwFouzeAvLHimJb9yV6GuomWtxNHW3fGGPkK4qcf1/photo-1702651249751-9a5ab91c11dc.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmVo4dgwuWNsuVBjrdmdDPTFDsLdQ4ynDMR9Z6wvqMxnDn/0",
        "metadata": {
          "image": "ipfs://QmYxXDwFouzeAvLHimJb9yV6GuomWtxNHW3fGGPkK4qcf1/photo-1702651249751-9a5ab91c11dc.png",
          "external_url": "",
          "background_color": "",
          "name": "girl",
          "description": "",
          "customImage": "",
          "customAnimationUrl": "",
          "supply": "1"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.487Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x1fe1da2C775c491c40cBF451735495b0F5932B8E",
        "name": "Card",
        "tokenType": "ERC1155",
        "contractDeployer": "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07",
        "deployedBlockNumber": 43510544,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-16T04:57:15.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "0",
      "tokenType": "ERC1155",
      "name": "views",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmU1dBMLj1h8EuzvtuMGFSJ869si3bZrcZtRKLKPGwjXH3/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/2552b7c3e3b795beaa15821f3056085d",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/2552b7c3e3b795beaa15821f3056085d",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/2552b7c3e3b795beaa15821f3056085d",
        "contentType": "image/png",
        "size": 74542,
        "originalUrl": "https://ipfs.io/ipfs/QmVuYspVgA42dxSV9fWM8fS6DEzxRUtiXit6odme7EXuCF/0.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmU1dBMLj1h8EuzvtuMGFSJ869si3bZrcZtRKLKPGwjXH3/0",
        "metadata": {
          "image": "ipfs://QmVuYspVgA42dxSV9fWM8fS6DEzxRUtiXit6odme7EXuCF/0.png",
          "external_url": "",
          "background_color": "",
          "name": "views",
          "description": "",
          "customImage": "",
          "attributes": [
            {
              "value": "2",
              "trait_type": "rare"
            },
            {
              "value": "1",
              "trait_type": "cool"
            }
          ],
          "customAnimationUrl": ""
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.411Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x21b8D019da4C820F2582420F805221f65Cab20FF",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07",
        "deployedBlockNumber": 36235498,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-14T15:30:27.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "1",
      "tokenType": "ERC721",
      "name": "Wild #123",
      "description": "This is a photograph of Wild",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmVSALHBpoyiiiWZHshKexRnVE3c6Qw8VwL7e4NeXBZ4bh/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/ee86d8da5cd5364c6b1d7ec983cfc8ee",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/ee86d8da5cd5364c6b1d7ec983cfc8ee",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/ee86d8da5cd5364c6b1d7ec983cfc8ee",
        "contentType": "image/png",
        "size": 29626,
        "originalUrl": "https://ipfs.io/ipfs/QmbQtFEcAmoNAQuWNHSemgG5CYMdGmwPSw9a7WRJdARNwg/photo-1682687982093-4773cb0dbc2e.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmVSALHBpoyiiiWZHshKexRnVE3c6Qw8VwL7e4NeXBZ4bh/0",
        "metadata": {
          "title": "Wild #123",
          "description": "This is a photograph of Wild",
          "image": "ipfs://QmbQtFEcAmoNAQuWNHSemgG5CYMdGmwPSw9a7WRJdARNwg/photo-1682687982093-4773cb0dbc2e.png"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.799Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "2",
      "tokenType": "ERC721",
      "name": "this is a test 29",
      "description": "huhahuha",
      "tokenUri": "https://ipfs.io/ipfs/QmdKE3ogG1sM9btVwHXHTWmhkunaJYA9LVZq7yAEbfz1P3/0",
      "image": {
        "cachedUrl": "C:\\fakepath\\Screenshot (33).png",
        "originalUrl": "C:\\fakepath\\Screenshot (33).png"
      },
      "raw": {
        "tokenUri": "ipfs://QmdKE3ogG1sM9btVwHXHTWmhkunaJYA9LVZq7yAEbfz1P3/0",
        "metadata": {
          "description": "huhahuha",
          "image": "C:\\fakepath\\Screenshot (33).png",
          "title": "this is a test 29",
          "price": "5"
        }
      },
      "mint": {
        "mintAddress": "0xbdba9d8889c6acfc3cee850dc6de393b01989d07",
        "blockNumber": 36276991,
        "timestamp": "2023-05-31T16:21:17Z",
        "transactionHash": "0xf93bc578f75ca3fda7352379f1ec75fc606facdb69e1e9bdd123bff307bedce1"
      },
      "timeLastUpdated": "2023-12-19T18:16:37.541Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "3",
      "tokenType": "ERC721",
      "name": "this is a test 230",
      "description": "huhahuha",
      "tokenUri": "https://ipfs.io/ipfs/QmQ54EZUARxCFbGu2FnagG3Fy396Wd1H3zsKrxJvnRXR5W/0",
      "image": {
        "cachedUrl": "C:\\fakepath\\Screenshot (33).png",
        "originalUrl": "C:\\fakepath\\Screenshot (33).png"
      },
      "raw": {
        "tokenUri": "ipfs://QmQ54EZUARxCFbGu2FnagG3Fy396Wd1H3zsKrxJvnRXR5W/0",
        "metadata": {
          "description": "huhahuha",
          "image": "C:\\fakepath\\Screenshot (33).png",
          "title": "this is a test 230",
          "price": "5"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:17:08.370Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "4",
      "tokenType": "ERC721",
      "name": "this is Tin's NFT",
      "description": "this is a nft",
      "tokenUri": "https://ipfs.io/ipfs/QmQeX4Zvf6ycusSrbhQRwuVseeDDqNB1xWeaM1RV626b3F/0",
      "image": {},
      "raw": {
        "tokenUri": "ipfs://QmQeX4Zvf6ycusSrbhQRwuVseeDDqNB1xWeaM1RV626b3F/0",
        "metadata": {
          "description": "this is a nft",
          "title": "this is Tin's NFT",
          "price": "5"
        }
      },
      "mint": {
        "mintAddress": "0xbdba9d8889c6acfc3cee850dc6de393b01989d07",
        "blockNumber": 36335442,
        "timestamp": "2023-06-02T02:51:27Z",
        "transactionHash": "0xf630f9e2bb807f471a0c9325be8b2bdba8738ce7b94467fbff3eab015e58c618"
      },
      "timeLastUpdated": "2023-06-09T04:35:30.607Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "5",
      "tokenType": "ERC721",
      "name": "this is Tin's NFT",
      "description": "this is a nft",
      "tokenUri": "https://ipfs.io/ipfs/QmQeX4Zvf6ycusSrbhQRwuVseeDDqNB1xWeaM1RV626b3F/0",
      "image": {},
      "raw": {
        "tokenUri": "ipfs://QmQeX4Zvf6ycusSrbhQRwuVseeDDqNB1xWeaM1RV626b3F/0",
        "metadata": {
          "description": "this is a nft",
          "title": "this is Tin's NFT",
          "price": "5"
        }
      },
      "mint": {
        "mintAddress": "0xbdba9d8889c6acfc3cee850dc6de393b01989d07",
        "blockNumber": 36335467,
        "timestamp": "2023-06-02T02:52:19Z",
        "transactionHash": "0x64a7324e97f1001d256e0625d893f4c571fa61cbbb8d3a1f4ac2b33366a56d6f"
      },
      "timeLastUpdated": "2023-06-09T02:28:42.212Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "6",
      "tokenType": "ERC721",
      "name": "Real NFT",
      "description": "This is a real NFT",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmXtpQRZHUw5U6SGHyvNDezG1pwJd6UnoyurAMaXtxtGo2/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/8a5d15bfce8509654c8a86377a13c3d9",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/8a5d15bfce8509654c8a86377a13c3d9",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/8a5d15bfce8509654c8a86377a13c3d9",
        "contentType": "image/png",
        "size": 10941,
        "originalUrl": "https://ipfs.io/ipfs/QmSRQMLeRVL6C46rgaKbCefTJgNFb8Z28qShgjJCQdsByL/download.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmXtpQRZHUw5U6SGHyvNDezG1pwJd6UnoyurAMaXtxtGo2/0",
        "metadata": {
          "description": "This is a real NFT",
          "image": "ipfs://QmSRQMLeRVL6C46rgaKbCefTJgNFb8Z28qShgjJCQdsByL/download.png",
          "title": "Real NFT",
          "price": "5"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:17:08.110Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x3d8dB409C1aBFb54e7d15FC8BF0EAba161E80b37",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36183322,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-13T19:44:36.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "7",
      "tokenType": "ERC721",
      "name": "Car NFT",
      "description": "this is a car NFT",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmeXHchiE2f2Jida4pt6K3UHz6kYszocjZrMPAacMJDviz/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/a814cd6f4682f2f21f8dec4104728e82",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/a814cd6f4682f2f21f8dec4104728e82",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/a814cd6f4682f2f21f8dec4104728e82",
        "contentType": "image/png",
        "size": 8112,
        "originalUrl": "https://ipfs.io/ipfs/Qmbzd4WjtA4yvRXToonvAozXuPpTEi7eXenwfkjQHfyTkL/photo-1654157925394-4b7809721149.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmeXHchiE2f2Jida4pt6K3UHz6kYszocjZrMPAacMJDviz/0",
        "metadata": {
          "description": "this is a car NFT",
          "image": "ipfs://Qmbzd4WjtA4yvRXToonvAozXuPpTEi7eXenwfkjQHfyTkL/photo-1654157925394-4b7809721149.png",
          "title": "Car NFT",
          "price": "1"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:17:08.696Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x436492DBc2E30E56FaC8F2297BD1964833c0687d",
        "name": "Demo NFT Drop",
        "symbol": "DEMO",
        "totalSupply": "452",
        "tokenType": "ERC721",
        "contractDeployer": "0xb371d1C5629C70ACd726B20a045D197c256E1054",
        "deployedBlockNumber": 35690876,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-18T00:15:18.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "450",
      "tokenType": "ERC721",
      "name": "Blue Square",
      "description": "A blue square NFT from the Shapes Collection",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmaDtdmSxm9rtcZZ1AjP3fBbXXUuNrV8qubDMSBi9wz3eS/450",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/3ede76aadfb06970fc7e0d06a59c1ca2",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/3ede76aadfb06970fc7e0d06a59c1ca2",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/3ede76aadfb06970fc7e0d06a59c1ca2",
        "contentType": "image/png",
        "size": 19785,
        "originalUrl": "https://ipfs.io/ipfs/QmZtYKMzfmMMZXnZdnQeABvwnfzvhh6KdLRuqqvaCzaCzA/450.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmaDtdmSxm9rtcZZ1AjP3fBbXXUuNrV8qubDMSBi9wz3eS/450",
        "metadata": {
          "name": "Blue Square",
          "description": "A blue square NFT from the Shapes Collection",
          "image": "ipfs://QmZtYKMzfmMMZXnZdnQeABvwnfzvhh6KdLRuqqvaCzaCzA/450.png",
          "attributes": [
            {
              "value": "square",
              "trait_type": "shape"
            },
            {
              "value": "blue",
              "trait_type": "color"
            },
            {
              "value": "4",
              "trait_type": "sides"
            }
          ]
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:38.336Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0x7de78c6d70Be58D300C6Afe45E1ef7480B4055BF",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36518769,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-12T18:29:28.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "6",
      "tokenType": "ERC721",
      "name": "robot war #000",
      "description": "beau of robot",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmboFE9zeKbETQ9x4NxvKXxLE3TzTGwvgofQ664LjqZqfz/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/c1cfcde5761d2f324295c8cfe42fde25",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/c1cfcde5761d2f324295c8cfe42fde25",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/c1cfcde5761d2f324295c8cfe42fde25",
        "contentType": "image/png",
        "size": 41576,
        "originalUrl": "https://ipfs.io/ipfs/QmNhSp2pi8wzNYjezyzz41zo5da1bTVCGeuqJuxMT9YnFN/premium_photo-1682001801106-eea59fb4ac99.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmboFE9zeKbETQ9x4NxvKXxLE3TzTGwvgofQ664LjqZqfz/0",
        "metadata": {
          "title": "robot war #000",
          "description": "beau of robot",
          "image": "ipfs://QmNhSp2pi8wzNYjezyzz41zo5da1bTVCGeuqJuxMT9YnFN/premium_photo-1682001801106-eea59fb4ac99.png"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:38.039Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0xd9C891F2164612e629A6c281D3Ba8E16b91A7Fc0",
        "name": "Hoai",
        "symbol": "HNFT",
        "tokenType": "ERC721",
        "contractDeployer": "0xCfB877BF0278285213dAE447af69D47124F16eff",
        "deployedBlockNumber": 36636670,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-15T01:29:23.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "1",
      "tokenType": "ERC721",
      "name": "Hyundai NFT #1",
      "description": "membership NFT",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmUaLUBWzXExkwo6zXUc4aspKWMiS1MQETeuwCaGvDY6iG/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/4da66f7cabe38db8091639a23ccf32b3",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/4da66f7cabe38db8091639a23ccf32b3",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/4da66f7cabe38db8091639a23ccf32b3",
        "contentType": "image/png",
        "size": 22576,
        "originalUrl": "https://ipfs.io/ipfs/QmZHXNWr5oYWjjaNoHTyeXouq3wafgz1VYpADPpsn4yVsj/photo-1666919643134-d97687c1826c.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmUaLUBWzXExkwo6zXUc4aspKWMiS1MQETeuwCaGvDY6iG/0",
        "metadata": {
          "title": "Hyundai NFT #1",
          "description": "membership NFT",
          "image": "ipfs://QmZHXNWr5oYWjjaNoHTyeXouq3wafgz1VYpADPpsn4yVsj/photo-1666919643134-d97687c1826c.png"
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.974Z",
      "balance": "1",
      "acquiredAt": {}
    },
    {
      "contract": {
        "address": "0xEcC15845c668c8E5Bd6CF6fF39aF8C5E916D30f4",
        "name": "NFTDrop",
        "totalSupply": "2",
        "tokenType": "ERC721",
        "contractDeployer": "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07",
        "deployedBlockNumber": 43675211,
        "openSeaMetadata": {
          "lastIngestedAt": "2023-12-17T12:42:16.000Z"
        },
        "spamClassifications": []
      },
      "tokenId": "0",
      "tokenType": "ERC721",
      "name": "dog",
      "description": "this is a dog",
      "tokenUri": "https://alchemy.mypinata.cloud/ipfs/QmeeyCavdpNvH9HLuXAL2X4k3pmdZiSkMowr3A6jAYetbQ/0",
      "image": {
        "cachedUrl": "https://nft-cdn.alchemy.com/matic-mumbai/d347704e236c13b542f4eaaaf1056090",
        "thumbnailUrl": "https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mumbai/d347704e236c13b542f4eaaaf1056090",
        "pngUrl": "https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mumbai/d347704e236c13b542f4eaaaf1056090",
        "contentType": "image/png",
        "size": 72965,
        "originalUrl": "https://ipfs.io/ipfs/QmQPS3Z78HLfgD8FM93VaANBmdxUhGSHpFhewv2uApwFtv/0.png"
      },
      "raw": {
        "tokenUri": "ipfs://QmeeyCavdpNvH9HLuXAL2X4k3pmdZiSkMowr3A6jAYetbQ/0",
        "metadata": {
          "image": "ipfs://QmQPS3Z78HLfgD8FM93VaANBmdxUhGSHpFhewv2uApwFtv/0.png",
          "external_url": "",
          "background_color": "",
          "name": "dog",
          "description": "this is a dog",
          "customImage": "",
          "customAnimationUrl": ""
        }
      },
      "mint": {},
      "timeLastUpdated": "2023-12-19T18:16:37.589Z",
      "balance": "1",
      "acquiredAt": {}
    }
  ]
  const alchemy = new Alchemy(config);
  // const inputString = useAddress();
  const inputString = useParams().id;

  const truncatedString = inputString
    ? `${inputString.substring(0, 4)}...${inputString.slice(-4)}`
    : "";
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

  const [listings, setListing] = useState();
  const [auction, setAuction] = useState();
  const { contract } = useContract(
    "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
  );


  const signer = useSigner();
  useEffect(() => {
    const effectData = async () => {
      // const nfts = await alchemy.nft.getNftsForOwner(inputString);
      // setNewNFT(nfts.ownedNfts)
      // sdk and contract address of marketplace v3
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "598b4f1195f15842446b09538ba00622",
      });
      const contractMarket = await sdk.getContract(
        "0x5237bcc6f1848CDdF2785a12e1114Cd639895e36"
      );
      const listings = await contractMarket.directListings.getAll();
      setListing(listings);
      const auctions = await contractMarket.englishAuctions.getAll();
      setAuction(auctions)
    };
    effectData();
  }, [inputString]);
  console.log(newNFT ? newNFT : "");

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

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  // console.log(nfts);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);


  const [listingCurrency, setListingCurrency] = useState('');
  const [buyoutPrice, setBuyoutPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reservePrice, setReservePrice] = useState('');
  const [auctionDuration, setAuctionDuration] = useState('');

  const [errors, setErrors] = useState({
    listingCurrency: '',
    buyoutPrice: '',
    quantity: '',
    reservePrice: '',
    auctionDuration: '',
  });

  const handleListingCurrencyChange = (event) => {
    setListingCurrency(event.target.value);
    setErrors({ ...errors, listingCurrency: '' });
  };

  const handleBuyoutPriceChange = (event) => {
    const value = event.target.value;
    setBuyoutPrice(value);
    setErrors({ ...errors, buyoutPrice: isNaN(value) ? 'Buyout price must be a number' : '' });
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    setErrors({ ...errors, quantity: isNaN(value) ? 'Quantity must be a number' : '' });
  };

  const handleReservePriceChange = (event) => {
    const value = event.target.value;
    setReservePrice(value);
    setErrors({ ...errors, reservePrice: isNaN(value) ? 'Reserve price must be a number' : '' });
  };

  const handleAuctionDurationChange = (event) => {
    const value = event.target.value;
    setAuctionDuration(value);
    setErrors({ ...errors, auctionDuration: isNaN(value) ? 'Auction duration must be a number' : '' });
  };

  const handleCreateAuction = () => {
    // Kiểm tra xem tất cả các trường có được nhập không
    let isValid = true;

    if (!listingCurrency) {
      setErrors((prevErrors) => ({ ...prevErrors, listingCurrency: 'Listing currency is required' }));
      isValid = false;
    }

    if (!buyoutPrice || isNaN(buyoutPrice)) {
      setErrors((prevErrors) => ({ ...prevErrors, buyoutPrice: 'Buyout price is required' }));
      isValid = false;
    }

    if (!quantity || isNaN(quantity)) {
      setErrors((prevErrors) => ({ ...prevErrors, quantity: 'Quantity is required' }));
      isValid = false;
    }

    if (!reservePrice || isNaN(reservePrice)) {
      setErrors((prevErrors) => ({ ...prevErrors, reservePrice: 'Reserve price is required' }));
      isValid = false;
    }

    if (!auctionDuration || isNaN(auctionDuration)) {
      setErrors((prevErrors) => ({ ...prevErrors, auctionDuration: 'Auction duration is required' }));
      isValid = false;
    }

    if (isValid) {
      // Tiếp tục với logic tạo đấu giá nếu tất cả đều hợp lệ
      console.log('Listing Currency:', listingCurrency);
      console.log('Buyout Price:', buyoutPrice);
      console.log('Quantity:', quantity);
      console.log('Reserve Price:', reservePrice);
      console.log('Auction Duration:', auctionDuration);
      handleClose2();
    }

  };
  const [listingCurrency1, setListingCurrency1] = useState('');
  const [listingPrice, setListingPrice] = useState('');
  const [quantity1, setQuantity1] = useState('');

  const [errors1, setErrors1] = useState({
    listingCurrency1: '',
    listingPrice: '',
    quantity1: '',
  });

  const handleListingCurrencyChange2 = (event) => {
    setListingCurrency1(event.target.value);
    setErrors1({ ...errors1, listingCurrency1: '' });
  };

  const handleListingPriceChange2 = (event) => {
    const value = event.target.value;
    setListingPrice(value);
    setErrors1({ ...errors1, listingPrice: isNaN(value) ? 'Listing price must be a number' : '' });
  };

  const handleQuantityChange2 = (event) => {
    const value = event.target.value;
    setQuantity1(value);
    setErrors1({ ...errors1, quantity1: isNaN(value) ? 'Quantity must be a number' : '' });
  };

  const handleCreateDirectListing2 = () => {
    let isValid = true;

    if (!listingCurrency1) {
      setErrors1((prevErrors) => ({ ...prevErrors, listingCurrency1: 'Listing currency is required' }));
      isValid = false;
    }

    if (!listingPrice || isNaN(listingPrice)) {
      setErrors1((prevErrors) => ({ ...prevErrors, listingPrice: 'Listing price must be a number' }));
      isValid = false;
    }

    if (!quantity1 || isNaN(quantity1)) {
      setErrors1((prevErrors) => ({ ...prevErrors, quantity1: 'Quantity must be a number' }));
      isValid = false;
    }

    if (isValid) {
      // Tiếp tục với logic tạo Direct Listing nếu tất cả đều hợp lệ
      console.log('Listing Currency:', listingCurrency1);
      console.log('Listing Price:', listingPrice);
      console.log('Quantity:', quantity1);


      handleClose();
    }
  }
  const [isHovered, setIsHovered] = useState(true);

  const handleMouseEnter = () => {
    setIsHovered(!isHovered);
    console.log("da")
    console.log(isHovered)
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
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
        {/* <div className="d-flex flex-row-reverse mt-3 gap-3">
          <Button
            variant="primary"
            onClick={handleShow}
            className="btn-primary btn d-flex items-center p-2"
          >
            <span>
              <LuPlus />{" "}
            </span>
            <span>Create Direct Listing</span>
          </Button>
          <Button
            variant="primary"
            onClick={handleShow2}
            className="btn-primary btn d-flex items-center p-2"
          >
            <span>
              <LuPlus />{" "}
            </span>
            <span>Create Auction</span>
          </Button>
        </div> */}
        {/* ========================Create Direct Listing============================ */}
        <Modal show={show} onHide={handleClose} className="mt-[100px]">
          <Modal.Header closeButton>
            <Modal.Title>Create Direct Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Listing Currency <span className="text-[red]">*</span></Form.Label>
                <Form.Select aria-label="" onChange={handleListingCurrencyChange2} value={listingCurrency1}>
                  <option value="">Select a currency</option>
                  <option value="matic">MATIC (MATIC)</option>
                </Form.Select>
                {errors1.listingCurrency1 && <div className="text-danger">{errors1.listingCurrency1}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The currency you want to sell your tokens for.
                </span>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Listing Price<span className="text-[red]">*</span></Form.Label>
                <Form.Control
                  aria-label=""
                  type="text"
                  placeholder="0"
                  onChange={handleListingPriceChange2}
                  value={listingPrice}
                ></Form.Control>
                {errors1.listingPrice && <div className="text-danger">{errors1.listingPrice}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The price per token a buyer can pay to instantly buyout the auction.
                </span>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Quantity <span className="text-[red]">*</span></Form.Label>
                <Form.Control
                  aria-label=""
                  type="text"
                  placeholder="1"
                  onChange={handleQuantityChange2}
                  value={quantity1}
                ></Form.Control>
                {errors1.quantity1 && <div className="text-danger">{errors1.quantity1}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The number of tokens to list for sale.
                </span>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateDirectListing2}>
              Create Direct Listing
            </Button>
          </Modal.Footer>
        </Modal>
        {/*========================Create Auction===============================*/}
        <Modal show={show2} onHide={handleClose2} className="mt-[80px] overflow-scroll" style={{ maxHeight: '100vh' }}>
          <Modal.Header closeButton>
            <Modal.Title>Create Auction New</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Listing Currency <span className="text-[red]">*</span></Form.Label>
                <Form.Select aria-label="" onChange={handleListingCurrencyChange} value={listingCurrency}>
                  <option value="">Select a currency</option>
                  <option value="matic">MATIC (MATIC)</option>
                </Form.Select>
                {errors.listingCurrency && <div className="text-danger">{errors.listingCurrency}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The currency you want to sell your tokens for.
                </span>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Buyout Price Per Token <span className="text-[red]">*</span></Form.Label>
                <Form.Control
                  aria-label=""
                  type="text"
                  placeholder="0"
                  onChange={handleBuyoutPriceChange}
                  value={buyoutPrice}
                ></Form.Control>
                {errors.buyoutPrice && <div className="text-danger">{errors.buyoutPrice}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The price per token a buyer can pay to instantly buyout the auction.
                </span>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Quantity <span className="text-[red]">*</span></Form.Label>
                <Form.Control
                  aria-label=""
                  type="text"
                  placeholder="1"
                  onChange={handleQuantityChange}
                  value={quantity}
                ></Form.Control>
                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The number of tokens to list for sale.
                </span>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Reserve Price Per Token<span className="text-[red]">*</span></Form.Label>
                <Form.Control
                  aria-label=""
                  type="text"
                  placeholder="1"
                  onChange={handleReservePriceChange}
                  value={reservePrice}
                ></Form.Control>
                {errors.reservePrice && <div className="text-danger">{errors.reservePrice}</div>}
                <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                  The minimum price per token necessary to bid on this auction.
                </span>
              </Form.Group>
              <Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Auction Duration<span className="text-[red]">*</span></Form.Label>
                  <Form.Select aria-label="" onChange={handleAuctionDurationChange} value={auctionDuration}>
                    <option value="">Select a duration</option>
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                    <option value="259200">3 Days</option>
                    <option value="604800">7 Days</option>
                    <option value="2629800">1 Month</option>
                  </Form.Select>
                  {errors.auctionDuration && <div className="text-danger">{errors.auctionDuration}</div>}
                  <span className="" style={{ fontSize: '14px ', color: 'gray' }}>
                    The duration of this auction.
                  </span>
                </Form.Group>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateAuction}>
              Create Auction
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="px-20 mt-5">
        {/* show nft of account */}
        <div className={`${option === "nft" ? "" : "hidden"} w-full flex gap-3 flex-wrap `}>
          {option === "nft" && newNFT
            ? newNFT.map((nft) => {
              return (
                <div className="rounded-lg w-[250px] bg-slate-800 overflow-hidden cardNFT"   >
                  <div className="h-[250px] w-full overflow-hidden bg-slate-300">
                    <img
                      src={nft.image.pngUrl}
                      alt=""
                      className="w-full p-0"
                    />
                  </div>
                  <div className="h-[90px] w-full pl-5 text-white flex gap-1 flex-col my-0 pr-2">
                    <p className="font-bold text-[18px] my-0">{nft.name}</p>
                    <span className="font-medium text-[16px] my-0">Type: {nft.tokenType}</span>
                    <p className="flex w-full justify-end">Supply: {nft.balance}</p>
                  </div>
                  {/* btn create  */}
                  <div  className={`${isHovered ? "d-flex flex-row-reverse" : "hiddenBtnCreate"} `}  >
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      className="btn-primary btn d-flex items-center "
                      style={{fontSize:"12px" , borderRadius:'0px'}}
                    >
                      {/* <span>
                        <LuPlus />{" "}
                      </span> */}
                      <b>Create Direct Listing</b>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleShow2}
                      className="btn-primary btn d-flex items-center "
                      style={{fontSize:"12px" , borderRadius:'0px', borderRight:'1px solid gray '}}
                      
                    >
                      {/* <span>
                        <LuPlus />{" "}
                      </span> */}
                      <b>Create Auction</b>
                    </Button>
                  </div>
                </div>
              );
            })
            : "loading nft"}{" "}
        </div>

        {/* show listings */}
        <div
          className={`${option === "list" ? "" : "hidden"} w-full flex gap-3`}
        >
          {listings
            ? listings.map((listing, index) => (
              <>
                <div
                  key={index}
                  className={`${listing.status == 3 ? "hidden" : ""} ${listing.creatorAddress == inputString ? "" : "hidden"}`}
                >
                  <Link to={`/nft/${index}`}>
                    <Card
                      img={listing.asset.image}
                      name={listing.asset.name}
                      creatorAddress={listing.creatorAddress}
                      price={listing.pricePerToken}
                      status={listing.status}
                    />
                  </Link>
                </div>
              </>
            ))
            : "Loading listing"}
        </div>
        {/* Auction */}
        <div className={`${option === "auc" ? "" : "hidden"} w-full flex gap-3`}>
          {auction ? auction.map((listing, index) => (
            <>
              <div key={index} className={`${listing.status == 3 ? "hidden" : ""} ${listing.creatorAddress == inputString ? "" : "hidden"}`}>
                <Link to={`/auction/${listing.id}`}>
                  <Auction
                    id={listing.id}
                    img={listing.asset.image}
                    name={listing.asset.name}
                    creatorAddress={listing.creatorAddress}
                    price={listing.pricePerToken}
                    status={listing.status}
                    startTime={listing.startTimeInSeconds}
                  />
                </Link>
              </div>
            </>
          )) : "Loading"}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Account;
