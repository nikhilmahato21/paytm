import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { Form, redirect } from "react-router-dom";
import toast from "react-hot-toast";

export const loader = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.get("http://localhost:3000/api/v1/user/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("http://localhost:3000/api/v1/user/signup", data);
    toast.success("Register successful");
    return redirect("/signin");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error);
    return error;
  }
};

const SignUp = () => {
  return (
    <div className=" bg-moneyYellow h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-zinc-50 shadow-lg max-w-xl text-center p-2 h-max px-4">
          <Heading label={"Sign Up 💸"} />
          <SubHeading
            label={
              "Enter your precious info to create an account and snag your random stash of money—maybe it'll be worth something in another universe!  🌌"
            }
          />
          <Form method="post" className="form">
            <InputBox
              placeholder="broke"
              label={"First Name"}
              name={"firstName"}
            />
            <InputBox placeholder="nik" label={"Last Name"} name={"lastName"} />
            <InputBox
              placeholder="nik@gmail.com"
              label={"Email"}
              name={"username"}
            />
            <InputBox
              placeholder="******"
              label={"Password"}
              name={"password"}
              type={"password"}
            />
            <div className="pt-4">
              <Button label={"Sign up"} type="submit" />
            </div>
          </Form>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
