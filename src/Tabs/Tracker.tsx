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

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      key={1}
    >
      <div>
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                ticks: {
                  color: "#fff",
                  font: { size: 14 },
                },
              },
              x: {
                ticks: {
                  color: "#fff",
                  font: { size: 14 },
                },
              },
            },
            plugins: {
              legend: {
                labels: { color: "#fff", padding: 30, font: { size: 20 } },
              },
            },
          }}
        />
      </div>
    </motion.div>
  );
}
{
}
