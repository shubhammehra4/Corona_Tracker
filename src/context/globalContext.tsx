import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import SpeechRecognition, {
  SpeechRecognitionOptions,
  useSpeechRecognition,
} from "react-speech-recognition";
import REGIONLIST from "../regions.json";

type GlobalContext = {
  data: any;
  tab: number;
  setTab: (value: React.SetStateAction<number>) => void;
  listening: boolean;
  transcript: string;
  resetTranscript: () => void;
  startListening: () => void;
  stopListening: () => void;
  displayResult: string;
};

const GlobalContext = createContext<GlobalContext>(null!);

interface GloabContextWrapperProps {
  children: React.ReactChild[] | React.ReactChild;
}

const statusMapping: any = {
  active: "activeCases",
  recovered: "recovered",
  total: "totalInfected",
  deceased: "deceased",
};

const GloabContextWrapper = ({ children }: GloabContextWrapperProps) => {
  const [tab, setTab] = useState<number>(0);
  const [listening, setListening] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [displayResult, setDisplayResult] = useState<string>("");

  const synth = window.speechSynthesis;
  const voice = window.speechSynthesis.getVoices()[1];

  function speakText(text: string) {
    const sayThis = new SpeechSynthesisUtterance(text);
    sayThis.voice = voice;
    sayThis.rate = 0.9;
    sayThis.pitch = 1;
    synth.speak(sayThis);
  }

  function echoCancellation() {
    const AudioContext = window.AudioContext;
    const context = new AudioContext();
    const sineWave = context.createOscillator();

    const gainNode = context.createGain();
    sineWave.connect(gainNode);
    gainNode.connect(context.destination);

    const audioParam = sineWave.detune;
    gainNode.gain.value = 0.9;
  }

  const getRegionData = (region: any) => {
    if (REGIONLIST.data.indexOf(region) !== -1) {
      const f = data.regionData.find((d: any) => d.region === region);
      return [null, f];
    } else {
      return [true, null];
    }
  };

  const commands: SpeechRecognitionOptions["commands"] = [
    {
      command: "statistics of :city",
      callback: (_a: string, val: string, _, { resetTranscript }) => {
        const temp = val.split(" ");
        temp.splice(0, 2);
        const state = temp.join(" ");
        const [err, data] = getRegionData(state);

        if (err) {
          console.log("Please try again");
        } else {
          const text = `Currently, in ${data.region}, the number of total cases are ${data.totalInfected}, active cases are ${data.activeCases} and recovered cases are ${data.recovered}`;
          setDisplayResult(text);
          speakText(text);
          setDisplayResult("");
        }
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.3,
    },
    {
      command: ":status cases in *",
      callback: (_a: string, val: string, _, { resetTranscript }) => {
        const validStatus = ["active", "recovered", "total"];
        const [status, ...temp] = val.split(" ");

        if (validStatus.indexOf(status.toLowerCase()) != -1) {
          temp.splice(0, 2);
          const state = temp.join(" ");
          const [err, data] = getRegionData(state);
          if (err) {
            speakText("Sorry, Can you please repeat?");
          } else {
            const text = `Currently, the ${status} cases in ${state} are ${
              data[statusMapping[status]]
            }`;
            setDisplayResult(text);
            speakText(text);
            setDisplayResult("");
          }
        } else {
          console.log("Invalid status", status);
          speakText("Sorry, Can you please repeat?");
        }
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.3,
    },
    {
      command: "(show) home",
      callback: ({ resetTranscript }) => {
        setTab(0);
        resetTranscript();
      },
    },
    {
      command: "(show) tracker",
      callback: ({ resetTranscript }) => {
        setTab(1);
        resetTranscript();
      },
    },
    {
      command: "(show) guidelines",
      callback: ({ resetTranscript }) => {
        setTab(2);
        resetTranscript();
      },
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "close",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setListening(false);
        SpeechRecognition.stopListening();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({
    commands,
  });

  const startListening = () => {
    setListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopListening = () => {
    setListening(false);
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
      );
      setData(data);
    })();
  }, []);

  function keyDownListener(e: KeyboardEvent) {
    if (e.key === "?") {
      if (!listening) {
        startListening();
      } else {
        stopListening();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDownListener);
    echoCancellation();

    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  return (
    <GlobalContext.Provider
      value={{
        data,
        tab,
        setTab,
        listening,
        transcript,
        resetTranscript,
        startListening,
        stopListening,
        displayResult,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GloabContextWrapper;
export const useGlobalContext = () => useContext(GlobalContext);
