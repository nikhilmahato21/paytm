import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TbMoneybag } from "react-icons/tb";
import kbc from "../assets/kbc.gif";

export const Balance = ({ value }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddMoney = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/add-money",
        { amount },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success("Money added successfully!");
      document.getElementById("my_modal_1").showModal();
      navigate("/dashboard");
      closeModal();
    } catch (error) {
      console.error("Error adding money:", error);
      toast.error(error?.response?.data?.message || "Failed to add money");
    }
  };
  return (
    <section>
      <div className="flex items-center  justify-between">
        <div>
          {" "}
          <div className="font-bold text-xl text-slate-900 ">Your balance</div>
          <div className="font-bold text-slate-700 font-sans ml-2 text-lg">
            ₹ {value?.toFixed(2)}
            {value < 100 && (
              <p className="text-sm text-gray-500">
                Congrats, you're officially broke , even with fake money! 😆
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={openModal}
            className="border-2 flex justify-center items-center gap-0.5 border-slate-900 text-black font-semibold px-4 py-2 rounded-lg hover:shadow-sm"
          >
            Add Money <TbMoneybag />
          </button>
        </div>
      </div>

      {/* add money modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-full flex flex-col justify-center">
          <div className=" h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white ">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-gray-700 text-center">
                Add Money
              </h2>
            </div>
            <div className="p-2">
              <div className="space-y-4">
                <form onSubmit={handleAddMoney}>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-lg font-bold text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="amount"
                    >
                      Amount (in Rs)
                    </label>
                    {amount > 10000 && (
                      <p className="text-sm font-semibold py-1 text-gray-600">
                        Can you even count that high? 😜
                      </p>
                    )}
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      name="amount"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                      required
                      disabled={amount > 10000}
                    />
                  </div>
                  <button
                    type="submit"
                    className="justify-center mt-2 rounded-md text-sm font-lg font-semibold tracking-wide transition-colors h-10 px-4 py-2 w-full text-gray-900 border-2 border-slate-900"
                  >
                    Add Money
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box  ">
          <div
            className="flex flex-col gap-2 items-center p-4 mb-4 text-sm  rounded-lg"
            role="alert"
          >
            <img src={kbc} alt="" className="rounded-lg h-40 md:h-60 " />
            <span className="text-green-700 text-lg bg-green-100 p-2 rounded-lg text-center">
              ₹ {amount} added successfully!🤑
              <br /> <span className="text-sm">Now, feel free to splurge on those virtual goods.</span> 
            </span>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="bg-green-50 text-green-700 p-2 px-3 border-2 border-green-200 rounded-lg">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};
