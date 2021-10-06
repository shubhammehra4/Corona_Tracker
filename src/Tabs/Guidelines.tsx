import { motion } from "framer-motion";
import React from "react";

export default function Guidelines() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      key={2}
      className="text-3xl"
    >
      List of guidelines
    </motion.div>
  );
}
