import React from "react";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { useGlobalContext } from "../context/globalContext";
import REGIONLIST from "../regions.json";

export default function Tracker() {
  const { data: responseData } = useGlobalContext();

  const activeCasesMap = responseData.regionData.flatMap(
    ({ activeCases }: any) => activeCases
  );

  const totalCasesMap = responseData.regionData.flatMap(
    ({ totalInfected }: any) => totalInfected
  );

  const recoveredCasesMap = responseData.regionData.flatMap(
    ({ recovered }: any) => recovered
  );

  const data = {
    labels: REGIONLIST.data,
    datasets: [
      {
        label: "Active Cases",
        data: activeCasesMap,
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        stack: "Active",
      },
      {
        label: "Recovered Cases",
        data: recoveredCasesMap,
        backgroundColor: "rgb(54, 162, 235, 0.8)",
        stack: "Recovered",
      },
      {
        label: "Total Cases",
        data: totalCasesMap,
        backgroundColor: "rgb(75, 192, 192, 0.8)",
        stack: "Total",
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "X axe name",
            fontColor: "#000000",
            fontSize: 10,
          },
          ticks: {
            fontColor: "black",
            fontSize: 14,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Y axe name",
            fontColor: "#000000",
            fontSize: 10,
          },
          ticks: {
            fontColor: "black",
            fontSize: 14,
          },
        },
      ],
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      key={1}
      className="text-3xl"
    >
      <Bar data={data} className="text-white !text-white" />
    </motion.div>
  );
}
