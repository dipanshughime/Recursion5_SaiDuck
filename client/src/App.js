import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { dark } from "@clerk/themes";
import Login from "./pages/Login";
import Onboarding from "./pages/OnBoarding";
import Home from "./pages/Home";
import TravelForm from "./pages/TravelForm";
import ImageDescription from "./pages/ImageDescription";
// import ChatBot from "./pages/ChatBot";
// import { Example } from "@react-three/drei";
import ChatBot from "./pages/Chat";
import Example from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";
import ResponsePg from "./pages/ResponsePg";

const router = createBrowserRouter([
  {
    path: "/speech",
    element: <Example />,
  },
  {
    path: "/chat",
    element: <ChatBot />,
  },
  {
    path: "/res",
    element: <ResponsePg />,
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
  {
    path: "/t-s",
    element: <TextToSpeech />,
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
