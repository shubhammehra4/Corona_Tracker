import { motion } from "framer-motion";
import SpeechRecognition from "react-speech-recognition";
import { Mic } from "../components/Mic";
import { useGlobalContext } from "../context/globalContext";
import corona from "../Images/corona.svg";
import mic from "../Images/mic.svg";

export default function Home() {
  const { listening, startListening, stopListening } = useGlobalContext();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert(
      "Browser doest not Support Speech Recognition, please switch to the latest version!"
    );
    return <></>;
  }

  // function keyDownListener(e: KeyboardEvent) {
  //   console.log("Keypress", e.code, e.key);
  // }

  // useEffect(() => {
  //   window.addEventListener("keydown", keyDownListener);

  //   return () => {
  //     window.removeEventListener("keydown", keyDownListener);
  //   };
  // }, [keyDownListener]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        key={0}
        className="flex flex-col md:flex-row justify-between items-center px-3"
      >
        <div className="flex flex-col">
          <p className="md:text-[30px] text-[#B4FFFF] font-semibold">
            Get Vaccinated, Boost You Health
          </p>
          <h1 className="text-2xl md:text-5xl lg:text-[80px] leading-none font-bold my-5 lg:my-10">
            Track the Corona <br /> Stats in Your City
          </h1>
          <p className="font-semibold text-lg lg:text-2xl">
            Be aware of the trends of corona around you and take neccessary
            measures
          </p>

          <button
            onClick={() => startListening()}
            className="my-4 lg:my-10 bg-[#E45E5E] w-[fit-content] px-5 lg:px-16 py-1 lg:py-3 rounded-full text-lg md:text-xl font-bold hover:opacity-90 flex items-center"
          >
            <span className="mr-3">
              <img className="text-white w-[1.2em] h-[1.2em]" src={mic} />
            </span>
            Voice Search
          </button>
        </div>
        <div>
          <img src={corona} className="h-[240px]  md:h-[480px] md:w-[500px]" />
        </div>
      </motion.div>
    </>
  );
}
