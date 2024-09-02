import Dashboard from "./pages/dashboard";
import Error from "./pages/Error";
import Home from "./pages/home";
import Send, { action as transferAction } from "./pages/send";
import SignIn, { loader, action as LoginAction } from "./pages/signin";
import SignUp, { action, loader as SignupLoader } from "./pages/signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <SignIn />,
      action: LoginAction,
      loader: loader,
    },
    {
      path: "/signup",
      element: <SignUp />,
      action: action,
      loader: SignupLoader,
    },
    {
      path: "/send",
      element: <Send />,
      action: transferAction,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
