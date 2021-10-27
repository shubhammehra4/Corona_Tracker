import { motion } from "framer-motion";
import React from "react";

export default function Guidelines() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      key={2}
      className="text-2xl"
    >
      <h1 className="text-5xl mb-10 text-center">Important Guidelines</h1>
      <ul className="list-disc">
        <li className="my-5">
          Keep physical distance of at least 1 metre from others, even if they
          don’t appear to be sick. Avoid crowds and close contact.
        </li>
        <li className="my-5">
          Cover your mouth and nose with a bent elbow or tissue when you cough
          or sneeze. Dispose of used tissues immediately and clean hands
          regularly
        </li>
        <li className="my-5">
          Wear a properly fitted mask when physical distancing is not possible
          and in poorly ventilated settings.
        </li>
        <li className="my-5">
          When you take off your mask, store it in a clean plastic bag, and
          every day either wash it if it’s a fabric mask or dispose of it in a
          trash bin if it’s a medical mask.
        </li>
        <li className="my-5">
          Avoid the 3Cs: spaces that are closed, crowded or involve close
          contact.
        </li>
      </ul>
    </motion.div>
  );
}
