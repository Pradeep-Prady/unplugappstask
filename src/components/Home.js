import { useState } from "react";
import Detail from "./Detail";
import Header from "./Header";
import AddForm from "./AddForm";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedVrNo, setSelectedVrNo] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleSelectedVrNo = (value) => {
    setSelectedVrNo(value);
  };
  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div className="w-full h-screen flex  justify-center">
      <div className="w-10/12 h-full">
        <Header handleSelectedVrNo={handleSelectedVrNo} />
        <Detail selectedVrNo={selectedVrNo} />
      </div>
      <div className="w-2/12 h-full bg-mydark flex items-center justify-center">
        <div className="w-full text-center">
          <div className="flex w-full items-center justify-center my-2">
            <p
              className="bg-black w-6/12 text-white  rounded-sm py-2 cursor-pointer"
              onClick={() => setOpenForm(true)}
            >
              New
            </p>
          </div>

          <div className="flex w-full items-center justify-center my-2">
            <p
              className={`bg-black disabled text-white w-6/12 rounded-sm py-2  ${
                selectedVrNo === null ? "cursor-not-allowed " : "cursor-pointer"
              }
              `}
            >
              Insert
            </p>
          </div>
          <div className="flex w-full items-center justify-center my-2">
            <p
              className={`bg-black disabled text-white w-6/12 rounded-sm py-2  
                
              `}
            >
              Save
            </p>
          </div>
          <div className="flex w-full items-center justify-center my-2">
            <Link
              to={`${selectedVrNo === null ? "" : `/${selectedVrNo}/print`}`}
              className={`bg-black text-white w-6/12 rounded-sm py-2   ${
                selectedVrNo === null ? "cursor-not-allowed " : "cursor-pointer"
              }`}
            >
              Print
            </Link>
          </div>
        </div>
      </div>
      {openForm && <AddForm handleClose={handleClose} />}
    </div>
  );
}
