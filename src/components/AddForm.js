import React, { useEffect, useState } from "react";

export default function AddForm({ handleClose }) {
  const [formData, setFormData] = useState({
    vr_no: "",
    sr_no: "",
    vr_date: "",
    status: "",
    ac_name: "",
    ac_amt: "",
  });

  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");

  const [srNo, setSrNo] = useState(1);

  const [detailsData, setDetailsData] = useState([]);

  const addDetails = () => {
    if (!itemCode || !itemName || !description || !qty || !rate) {
      alert("Please fill in all the fields");
    } else {
      setDetailsData([
        ...detailsData,
        {
          vr_no: formData.vr_no,
          sr_no: srNo,
          item_code: itemCode,
          item_name: itemName,
          qty: qty,
          rate: rate,
        },
      ]);
      setItemCode("");
      setItemName("");
      setDescription("");
      setQty("");
      setRate("");
      setSrNo((prevSrNo) => prevSrNo + 1);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedDetails = [...detailsData];
    updatedDetails.splice(index, 1);
    setDetailsData(updatedDetails);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      header_table: {
        vr_no: formData.vr_no,
        vr_date: formData.vr_date,
        status: formData.status,
        ac_name: formData.ac_name,
        ac_amt: formData.ac_amt,
      },
      detail_table: detailsData,
    };
    fetch("http://5.189.180.8:8010/header/multiple", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data submitted successfully:", data);
        setSrNo((prevSrNo) => prevSrNo + 1);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    fetch("http://5.189.180.8:8010/item")
      .then((response) => response.json())
      .then((data) => {
        setItemData(data);
      })
      .catch((error) => {
        console.error("Error fetching header_table data:", error);
      });
  }, []);
  return (
    <div className="absolute w-full z-50 flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-mymedium w-10/12 h-5/6 p-5">
        <div className="w-full h-[92%] overflow-y-scroll scroll">
          <div className="flex  items-center justify-end">
            <i
              className="fa-solid fa-xmark text-[22px] cursor-pointer"
              onClick={handleClose}
            ></i>
          </div>
          <div>
            <h2 className="text-center mb-5 text-[20px] font-semibold">
              Header
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:px-5">
            <div className="grid grid-cols-2 p-2">
              <p className="font-semibold">Vr No</p>
              <div>
                <input
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  name="vr_no"
                  required
                  value={formData.vr_no}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 p-2">
              <p className="font-semibold">Vr Date</p>
              <div>
                <input
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  name="vr_date"
                  required
                  value={formData.vr_date}
                  onChange={handleInputChange}
                  type="date"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 p-2">
              <p className="font-semibold">Status</p>
              <div>
                <select
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option>Select</option>
                  <option value="A">A</option>
                  <option value="I">I</option>
                </select>
              </div>
            </div>
          </div>
          <div className="sm:flex sm:px-5 my-5">
            <div className="sm:w-7/12 flex p-2">
              <h2 className="font-semibold w-2/12">Ac Name</h2>
              <div className="sm:w-8/12">
                <input
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  name="ac_name"
                  value={formData.ac_name}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
            </div>
            <div className="flex p-2 sm:w-5/12">
              <h2 className="font-semibold sm:w-4/12">Ac Amount</h2>
              <div>
                <input
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  name="ac_amt"
                  value={formData.ac_amt}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-center mb-5 text-[20px] font-semibold">
              Details
            </h2>
          </div>
          <div className="px-5">
            <div className="grid grid-cols-2 ">
              <div className=" grid grid-cols-2 p-2">
                <h2 className="font-semibold">Item Code</h2>
                <div>
                  <select
                    className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                    name="item_code"
                    value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)}
                  >
                    <option>Select</option>

                    {itemData?.map((data) => (
                      <option value={data.item_code} key={data.item_code}>
                        {data.item_code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className=" grid grid-cols-2 p-2">
                <h2 className="font-semibold">Item Name</h2>
                <div>
                  <select
                    className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                    name="item_name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  >
                    <option>Select</option>

                    {itemData?.map((data) => (
                      <option value={data.item_name} key={data.item_name}>
                        {data.item_name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-2 p-2">
              <h2 className="font-semibold">Description </h2>
              <div>
                <input
                  className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className=" grid grid-cols-2 p-2">
                <h2 className="font-semibold">Quantity </h2>
                <div>
                  <input
                    className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                    name="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className=" grid grid-cols-2 p-2">
                <h2 className="font-semibold">Rate</h2>
                <div>
                  <input
                    className="bg-mydark w-full px-2 py-1 rounded-sm outline-none "
                    name="rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    type="text"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p
                  className="font-semibold bg-black text-white px-10 py-2 rounded-sm cursor-pointer"
                  onClick={addDetails}
                >
                  Add
                </p>
              </div>
            </div>
          </div>
          <div className="border-t-2 my-2 p-2">
            <ul>
              {detailsData.map((entry, index) => (
                <li
                  className="bg-mywhite  text-[14px] p-3 my-2 grid grid-cols-8    cursor-pointer"
                  key={entry.sr_no}
                >
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
                  <div>
                    <p className="font-semibold">Amount</p>
                    <p>{entry.rate * entry.qty}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="font-semibold bg-black text-white px-10 py-2 rounded-sm"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center h-[8%]">
          <button
            type="submit"
            className="font-semibold bg-black text-white px-10 py-2 rounded-sm cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
