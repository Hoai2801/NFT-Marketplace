import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { GoTag } from "react-icons/go";

const BuyDetail = () => {
  return (
    <div>
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
            <div className="d-flex align-items-center">
              <h1 className="fs-3">0,145 ETH</h1>
              <span className="text-secondary">$326,01</span>
            </div>

            <div className="row">
                <div className="col-6">
                    
              <div class="input-group mb-3 ">
               
                <input
                  type="text"
                  className="form-control btn btn-primary p-2"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value="Buy now"
                readOnly
                />
                 <span  className="input-group-text btn btn-primary  p-2 fs-3"  style={{marginLeft:"1px"}} id="basic-addon1">
                 <IoMdCart />
                </span>
              </div>
                </div>
                <div className="col-6 ">
                <div className="btn btn-light  d-flex justify-content-center fs-5 align-items-center">
                <GoTag className="me-3" />
                    Make offer
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyDetail;
