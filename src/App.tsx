import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { Mic } from "./components/Mic";
import { useGlobalContext } from "./context/globalContext";
import Guidelines from "./Tabs/Guidelines";
import Home from "./Tabs/Home";
import Tracker from "./Tabs/Tracker";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { tab, setTab, listening, transcript, stopListening, displayResult } =
    useGlobalContext();
  const navs = ["Home", "Tracker", "Guidelines"];

  useEffect(() => {
    if (displayResult !== "") {
      toast(displayResult, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  }, [displayResult]);

  return (
    <div className="text-white max-w-7xl mx-auto h-full">
      <nav className="flex justify-between items-center py-8  px-4">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
          Corona Tracker
        </h1>
        <AnimateSharedLayout>
          <div className="flex text-md md:text-2xl">
            {navs.map((title, i) => (
              <motion.button
                animate
                key={i}
                className="font-semibold relative md:py-2 mx-1 md:mx-5"
                style={tab === i ? { color: "white" } : { color: "#989898" }}
                onClick={() => setTab(i)}
              >
                {i === tab && (
                  <motion.div layoutId="underline" className="underline" />
                )}
                {title}
              </motion.button>
            ))}
          </div>
        </AnimateSharedLayout>
      </nav>
      <div className="mt-36">
        <AnimatePresence exitBeforeEnter>
          {tab == 0 ? <Home /> : tab == 1 ? <Tracker /> : <Guidelines />}
        </AnimatePresence>
      </div>
      <AnimatePresence exitBeforeEnter>
        {listening && <Mic transcript={transcript} stop={stopListening} />}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}

export default App;
