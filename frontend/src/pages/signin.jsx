import { Form, redirect } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import toast from "react-hot-toast";
import axios from "axios";

export const loader = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.get("https://parallelpay.onrender.com/api/v1/user/current-user", {
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
    const response = await axios.post(
      "https://parallelpay.onrender.com/api/v1/user/signin",
      data
    );
    localStorage.setItem("token", response.data.token);
    toast.success("Login successful!");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error || error?.response?.data?.message );
    return error;
  }
};

const SignIn = () => {
  return (
    <Form method="post" className="form">
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white max-w-xl text-center p-2 h-max px-4">
            <Heading label={"Sign In 💸"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              name={"username"}
              placeholder="nik@gmail.com"
              label={"Email"}
            />
            <InputBox
              name={"password"}
              placeholder="******"
              type={"password"}
              label={"Password"}
            />
            <div className="pt-4">
              <Button label={"Sign In"} type="submit" />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignIn;
