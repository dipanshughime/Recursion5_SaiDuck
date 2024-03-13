import React from "react";
import TravelForm from "../pages/TravelForm";

const FormDialog = () => {
  return (
    <>
      <button
        className="btn px-6"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Plan A Trip
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-[#000004] flex flex-col items-center">
          <form method="dialog" className="ml-1/2">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <TravelForm />
        </div>
      </dialog>
    </>
  );
};

export default FormDialog;
