import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import comet2 from "../assets/comet2.png";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transferSuccess = searchParams.get("transferSuccess"); // Get query parameter

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        // Make the request with the Bearer token
        const response = await axios.get(
          "https://parallelpay.onrender.com/api/v1/user/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the user data in state
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching current user:", err);
        toast.error(err?.response?.data?.error);
        return navigate("/signin");
      }
    };

    fetchCurrentUser();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        {" "}
        <img src={comet2} alt="" /> <span>Loading...</span>{" "}
      </div>
    );
  }

  return (
    <div className="bg-moneyYellow  bg-opacity-10 ">
      <Appbar name={user.user.firstName} />
      <div className="m-8 min-h-screen">
        <Balance id={user.user._id} value={user.balance} />
        <Users />
      </div>
      {transferSuccess && (
        <div>
          <Modal
            navigate="/dashboard"
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <div
              className="flex flex-col gap-2 items-center p-4 mb-4 text-sm  rounded-lg"
              role="alert"
            >
              <img src="https://res.cloudinary.com/dynbpb9u0/image/upload/v1725129571/ezgif-7-ab25e61532_mxxrgy.gif" alt="" className="rounded-lg h-40 md:h-60 " />
              <span className="text-green-700 text-lg bg-green-100 p-2 rounded-lg text-center">
                Money sent successfully!
                <br />{" "}
                <span className="text-sm">
                Hopefully, they won’t spend it all in one place... or at all.😏
                </span>
              </span>
            </div>
          </Modal>
          {/* rest of the component */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
