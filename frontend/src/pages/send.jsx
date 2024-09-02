import axios from "axios";

import toast from "react-hot-toast";
import { Form, redirect, useSearchParams } from "react-router-dom";
import comet2 from "../assets/comet2.png";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");

  try {
    const response = await axios.post(
      "https://parallelpay.onrender.com/api/v1/account/transfer",
      {
        to: id,
        amount: data.amount,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    // toast start//
    toast.success("Transfer successfully!")
    // toast end//
    return redirect("/dashboard?transferSuccess=true");
  } catch (error) {
    console.log(" error in  sending money..");
    toast.error(error?.response?.data?.error);
    return error;
  }
};

export const Send = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 px-6 py-3">
            <div className="flex  justify-center">
              {" "}
              <h2 className="text-3xl  font-bold text-gray-800 text-center">
                Send Money{" "}
              </h2>
              <span>
                <img src={comet2} alt="" className="h-10" />
              </span>
            </div>
          </div>
          <div className="px-6 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 text-slate-600 font-bold  flex items-center justify-center">
                <span className="text-2xl capitalize flex justify-center items-center ">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl text-gray-600 font-semibold capitalize">
                {name}
              </h3>
            </div>
            <div className="space-y-4">
              <Form method="post" className="form">
                <div className="space-y-2 mb-2">
                  <label
                    className="text-sm font-medium tracking-wide  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    name="amount"
                    type="number"
                    className="flex h-10  w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full border-2 border-gray-800 text-black"
                >
                  Initiate Transfer
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Send;
