import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { dark } from "@clerk/themes";
import Login from "./pages/Login";
import Onboarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import TravelForm from "./pages/TravelForm";
import ImageDescription from "./pages/ImageDescription";
<<<<<<< HEAD
import ChatBot from "./pages/ChatBot";
import { Example } from "@react-three/drei";
=======
import ChatBot from "./pages/Chat";
import Example from "./components/SpeechToText";
>>>>>>> 15b1f4923b4545d4ea43ea9e1946dfb54ddee8b0

const router = createBrowserRouter([
  {
    path: "/speech",
<<<<<<< HEAD
    element: <Example/>,
=======
    element: <Example />,
>>>>>>> 15b1f4923b4545d4ea43ea9e1946dfb54ddee8b0
  },
  {
    path: "/chat",
    element: <ChatBot />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/plannerform",
    element: <TravelForm />,
  },
  {
    path: "/destination/:location",
    element: <ImageDescription />,
  },
]);
function App() {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
        publishableKey={"pk_test_ZGVhci1za2luay05Ny5jbGVyay5hY2NvdW50cy5kZXYk"}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </>
  );
}

export default App;
