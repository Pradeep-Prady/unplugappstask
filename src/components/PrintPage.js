import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PrintPage() {
  const [detailData, setDetailData] = useState([]);
  const [headerData, setHeaderData] = useState({});

  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    fetch("http://5.189.180.8:8010/detail")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (entry) => entry.vr_no === parseInt(id, 10)
        );
        setDetailData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching detail_table data:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://5.189.180.8:8010/header")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.find(
          (entry) => entry.vr_no === parseInt(id, 10)
        );

        if (filteredData) {
          setHeaderData(filteredData);
        }
      })
      .catch((error) => {
        console.error("Error fetching header_table data:", error);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-mywhite h-screen flex items-center justify-center">
      <div className="box w-10/12 h-auto">
        <h1 className="text-center text-2xl font-semibold">Print Page</h1>
        <div>
          <h2 className="text-xl font-semibold text-center">Header</h2>
          <div>
            <li className="bg-mywhite p-3 text-[14px] my-2 grid grid-cols-5 cursor-pointer">
              <div>
                <p className="font-semibold">Voucher Number</p>
                <p> {headerData.vr_no}</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p>{headerData.vr_date}</p>
              </div>
              <div>
                <p className="font-semibold">Account Name</p>
                <p>{headerData.ac_name} </p>
              </div>
              <div>
                <p className="font-semibold">Amount</p>
                <p> {headerData.ac_amt}</p>
              </div>
              <div>
                <p className="font-semibold">Status</p>
                <p> {headerData.status}</p>
              </div>
            </li>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center">Detail</h2>
          <div>
            {detailData?.map((entry) => (
              <li
                className="bg-mywhite text-[14px] p-3 my-2 grid grid-cols-7 cursor-pointer"
                key={entry.sr_no}
              >
                <div>
                  <p className="font-semibold">Voucher Number</p>
                  <p>{entry.vr_no}</p>
                </div>
                <div>
                  <p className="font-semibold">Serial Number</p>
                  <p>{entry.sr_no}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold">Item Code</p>
                  <p>{entry.item_code}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold">Item Name</p>
                  <p>{entry.item_name}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold">Description</p>
                  <p>{entry.description}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold">Quantity </p>
                  <p>{entry.qty}</p>
                </div>{" "}
                <div>
                  <p className="font-semibold">Rate</p>
                  <p>{entry.rate}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center justify-end p-5">
          <div className="w-1/4 flex items-center justify-between gap-5">
            <Link
              to="/"
              className="border-2 py-2 w-2/3 text-center border-black"
            >
              Back
            </Link>
            <p
              className="bg-black w-2/3 text-white rounded-sm py-3 cursor-pointer text-center"
              onClick={handlePrint}
            >
              Print
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
