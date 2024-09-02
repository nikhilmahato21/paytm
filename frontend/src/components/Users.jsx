import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import comet2 from "../assets/comet2.png";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://parallelpay.onrender.com/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-xl text-gray-800">Users 👽</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-96 px-2 py-2 border-2 border-gray-500 rounded-xl "
        ></input>
      </div>
      <div>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between py-1.5">
      <div className="flex  justify-center items-center">
        <div className="rounded-full h-10 w-10 border-2 border-gray-700 text-slate-600 font-bold flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center  h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <button
          onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          className="flex justify-center items-center gap-1 border-2 border-gray-800 rounded-lg p-2"
          type="button"
        >
          send money <span><img src={comet2} alt="" className="h-5" /></span>
        </button>
      </div>
    </div>
  );
}
