import React from "react";
import { motion } from "framer-motion";

export default function Tracker() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      key={1}
      className="text-3xl"
    >
      Tracker OR Graph visualization
      {/* Code here */}
    </motion.div>
  );
}
