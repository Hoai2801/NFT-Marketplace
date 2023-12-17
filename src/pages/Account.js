import React, { useState, useRef ,useLocation} from 'react';
import { Row, Col } from 'react-bootstrap';
import "../CSS/Account.css"
import { BsCopy } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
// import  useLocation from 'react-router-dom';
function Account() {
    const inputString = "0xFf62669a4A7aeBCabfcc3dA9D2072897D8cB062f";
    const truncatedString = `${inputString.substring(0, 4)}...${inputString.slice(-4)}`;
    const [option, setOption] = useState('nft');
    const textareaRef = useRef(null);
    const [copyNotification, setCopyNotification] = useState('');

    const copyOriginalString = () => {

        const textarea = document.createElement('textarea');
        textarea.value = inputString;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');


        document.body.removeChild(textarea);
        setCopyNotification('Copied!');
        setTimeout(() => setCopyNotification(''), 2000);
    };

    return (
        <section className='container-master-1'>
            <Row className='container-header'>
                <img className='logo-profile' src={require(`../Img/cover.png`)} alt="" />
                <Col lg={12} className='profile-header'>
                    <div className='avatar-profile'>
                        <div className='status-profile'></div>
                        <img src={require(`../Img/avatar2.png`)} alt="" />
                    </div>
                    <section className='title-profile'>
                        <div className='fs-3 d-inline-block me-4'>
                            Unnamed
                        </div>
                        <div className='d-flex gap-3 items-center'>
                            <span
                                style={{ color: 'gray', cursor: 'pointer' }}
                                onClick={copyOriginalString}
                                className='d-flex  items-center gap-2'
                            >
                                {truncatedString}
                                <BsCopy />
                            </span>
                            <div>
                                <span className='role-profile d-inline-block fw-bold p-1'></span>
                                <span> Joined December 2023</span>
                            </div>
                        </div>
                    </section>
                    <div className='email-profile text-black-50 mt-4' >{copyNotification}</div>
                </Col>
            </Row>
            <div className='flex w-full bg-white top-0 border-b-1 h-[50px] items-center justify-between px-20 navbar-master'>
                <div className='flex justify-between w-[700px] gap-8'>
                    {/* menu */}
                    <div className='flex justify-between w-[300px] mt-3 text-gray-500 menu-item  '>
                        <Link to="#"   onClick={() => setOption('nft')}  className={`${option === 'nft' ? 'options-check' : ''}`}>NFT</Link>
                        <Link to="#" onClick={() => setOption('list')} className={`${option === 'list' ? 'options-check' : ''}`}>List</Link>
                        <Link to="#" onClick={() => setOption('auc')} className={`${option === 'auc' ? 'options-check' : ''}`}>Auction</Link>
                    </div>
                </div>
            </div>
            <div className='px-20 mt-5'>
                {option === 'nft' && (
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
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {option === 'list' && (
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
                {option === 'auc' && (
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

            </div>

        </section>
    );
}

export default Account;

