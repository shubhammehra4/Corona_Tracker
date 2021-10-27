import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useEffect } from "react";
import { Mic } from "./components/Mic";
import GloabContextWrapper, { useGlobalContext } from "./context/globalContext";
import Guidelines from "./Tabs/Guidelines";
import Home from "./Tabs/Home";
import Tracker from "./Tabs/Tracker";

function App() {
  const { tab, setTab, listening, transcript, resetTranscript, stopListening } =
    useGlobalContext();
  const navs = ["Home", "Tracker", "Guidelines"];

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
      {listening && (
        <Mic
          transcript={transcript}
          reset={resetTranscript}
          stop={stopListening}
        />
      )}
    </div>
  );
}

export default App;
