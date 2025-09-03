"use client";
import { useEffect, useRef, useState } from "react";
const ApexCharts =
  typeof window !== "undefined" ? require("apexcharts").default : null;

const data = [
  27.21, 14.9, 20.75, 9.55, 11.03, 8.82, 15.7, 5.3, 20.75, 43.84, 14.9, 13.32,
  7.39, 14.9, 8.82, 7.39, 7.39, 16.51, 6.68, 12.55, 15.7, 15.7, 9.55, 19.88,
  4.62, 14.9, 11.03, 15.7, 18.17, 24.36, 11.78, 22.53, 25.3, 19.88, 14.1, 4.62,
  32.28, 30.2, 19.88, 40.14, 21.63, 36.65, 24.36, 23.44, 11.78, 14.1, 24.36,
  21.63, 29.19, 26.25, 19.02, 50.54, 28.2, 21.63, 12.55, 33.34, 26.25, 19.88,
  14.9, 30.2, 28.2, 56.48, 21.63, 8.82, 14.9, 31.23, 23.44, 28.2, 24.36, 45.13,
  41.35, 11.03, 21.63, 18.17,
];

function calculateBoxPlotData(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const q1 = sorted[Math.floor(0.25 * (n + 1)) - 1];
  const q2 = sorted[Math.floor(0.5 * (n + 1)) - 1];
  const q3 = sorted[Math.floor(0.75 * (n + 1)) - 1];
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const whiskerMin = sorted.find((v) => v >= lowerFence);
  const whiskerMax = [...sorted].reverse().find((v) => v <= upperFence);
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  const goals = outliers.map((v) => ({
    value: v,
    strokeWidth: 0,
    strokeHeight: 13,
    strokeLineCap: "round",
    strokeColor: "#FEB019",
  }));
  return { box: [whiskerMin, q1, q2, q3, whiskerMax], goals };
}

export default function FosforoBoxplot() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (ApexCharts && chartRef.current && !chart) {
      const boxplot = calculateBoxPlotData(data);
      const options = {
        chart: {
          type: "boxPlot",
          height: 350,
          background: "transparent",
          fontFamily: "Inter, sans-serif",
          toolbar: { show: false },
        },
        series: [
          {
            type: "boxPlot",
            name: "Fósforo",
            data: [{ x: "Fósforo", y: boxplot.box, goals: boxplot.goals }],
          },
        ],
        xaxis: {
          categories: ["Fósforo"],
          labels: { style: { colors: "#6B7280" } },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          labels: { style: { colors: "#6B7280" } },
          title: { text: "Valores", style: { color: "#6B7280" } },
        },
        tooltip: { theme: "dark", style: { fontSize: "12px" } },
        grid: { borderColor: "#E5E7EB", strokeDashArray: 4 },
        fill: { colors: ["#10B981"] },
        legend: { labels: { colors: ["#6B7280"] } },
      };
      const newChart = new ApexCharts(chartRef.current, options);
      newChart.render();
      setChart(newChart);
    }
    return () => {
      if (chart) chart.destroy();
    };
  }, [chart]);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-50text-gray-900 dark:text-gray-900">
      <nav className="flex justify-center gap-6 text-sm">
        <a href="/" className="text-gray-900 hover:text-blue-600">
          Mapa da Fazenda
        </a>
        <a
          href="/grafico/produtividade"
          className="text-gray-900 hover:text-blue-600"
        >
          Boxplot
        </a>
      </nav>
      <h1 className="text-3xl font-bold text-center mb-4">Boxplot - Fósforo</h1>
      <div ref={chartRef} className="w-full h-80 md:h-96"></div>
      <nav className="flex justify-center gap-6 mt-6 text-sm">
        <a
          href="/grafico/produtividade"
          className="text-gray-900 hover:text-blue-600"
        >
          Produtividade
        </a>
        <a href="/grafico/fosforo" className="text-blue-600 font-bold">
          Fósforo
        </a>
        <a
          href="/grafico/potassio"
          className="text-gray-900 hover:text-blue-600"
        >
          Potássio
        </a>
        <a href="/grafico/calcio" className="text-gray-900 hover:text-blue-600">
          Cálcio
        </a>
        <a
          href="/grafico/magnesio"
          className="text-gray-900 hover:text-blue-600"
        >
          Magnésio
        </a>
      </nav>
    </div>
  );
}
