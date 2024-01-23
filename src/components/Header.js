import React, { useEffect, useState } from "react";

export default function Header({ handleSelectedVrNo }) {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    fetch("http://5.189.180.8:8010/header")
      .then((response) => response.json())
      .then((data) => {
        setHeaderData(data);
      })
      .catch((error) => {
        console.error("Error fetching header_table data:", error);
      });
  }, []);
  return (
    <>
      <div className="w-full h-1/2 overflow-hidden b">
        <div className="bg-mydark flex items-center h-[10%] justify-center">
          <h2 className="text-[20px] font-semibold my-2">Header</h2>
        </div>

        <div className="overflow-y-scroll scroll h-[90%] p-3">
          <ul>
            {headerData.map((entry) => (
              <li
                className="bg-mywhite p-3 text-[14px] my-2 grid grid-cols-5 cursor-pointer"
                key={entry.vr_no}
                onClick={() => handleSelectedVrNo(entry.vr_no)}
              >
                <div>
                  <p className="font-semibold">Voucher Number</p>
                  <p> {entry.vr_no}</p>
                </div>
                <div>
                  <p className="font-semibold">Date</p>
                  <p>{entry.vr_date}</p>
                </div>
                <div>
                  <p className="font-semibold">Account Name</p>
                  <p>{entry.ac_name} </p>
                </div>
                <div>
                  <p className="font-semibold">Amount</p>
                  <p> {entry.ac_amt}</p>
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <p> {entry.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
