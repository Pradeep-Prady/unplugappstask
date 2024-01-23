import React, { useEffect, useState } from "react";

export default function Detail({ selectedVrNo }) {
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    fetch("http://5.189.180.8:8010/detail")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (entry) => entry.vr_no === selectedVrNo
        );
        setDetailData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching detail_table data:", error);
      });
  }, [selectedVrNo]);

  const getTotlal = () => {
    let total = 0;
    detailData.forEach((entry) => {
      total += entry.qty * entry.rate;
    });

    return total;
  };

  return (
    <>
      <div className="w-full h-1/2">
        <div className="bg-mydark flex items-center h-[10%] justify-center">
          <h2 className="text-[20px] font-semibold my-2">Detail</h2>
        </div>

        <ul className="p-3 overflow-y-scroll scroll h-[80%]">
          {detailData.map((entry) => (
            <li
              className="bg-mywhite text-[14px] p-3 my-2 grid grid-cols-6 cursor-pointer"
              key={entry.sr_no}
            >
              {/* <div>
                <p className="font-semibold">Voucher Number</p>
                <p>{entry.vr_no}</p>
              </div> */}
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
              {/* <div>
                <p className="font-semibold">Description</p>
                <p>{entry.description}</p>
              </div>{" "} */}
              <div>
                <p className="font-semibold">Quantity </p>
                <p>{entry.qty}</p>
              </div>{" "}
              <div>
                <p className="font-semibold">Rate</p>
                <p>{entry.rate}</p>
              </div>
              <div>
                <p className="font-semibold">Amount</p>
                <p>{entry.rate * entry.qty}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-[10%] flex bg-mydark items-center justify-end">
          <div className="w-1/3 grid grid-cols-2  font-semibold ">
            <p className="font-semibold">Total</p>
            <p>{getTotlal()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
