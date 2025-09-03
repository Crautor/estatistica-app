"use client";
import { useEffect, useRef, useState } from "react";
const ApexCharts =
  typeof window !== "undefined" ? require("apexcharts").default : null;

const data = [
  3832, 2383, 3396, 2622, 3775, 3369, 3159, 3254, 3144, 3643, 3758, 3801, 2888,
  2672, 3187, 2905, 3632, 2956, 3212, 2979, 3208, 3163, 2348, 3287, 3493, 2968,
  3076, 3239, 3063, 3611, 3290, 3237, 3568, 2050, 3005, 2787, 3261, 2800, 2927,
  2484, 2784, 3408, 3144, 2929, 3238, 4030, 3022, 3326, 3052, 3605, 2775, 2799,
  3511, 2929, 2189, 3466, 3421, 2407, 3135, 2632, 3543, 3721, 3642, 3400, 1677,
  2402, 1661, 1518, 1797, 2052, 3660, 3444, 3608, 2835,
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

export default function ProdutividadeBoxplot() {
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
            name: "Produtividade",
            data: [
              { x: "Produtividade", y: boxplot.box, goals: boxplot.goals },
            ],
          },
        ],
        xaxis: {
          categories: ["Produtividade"],
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
        fill: { colors: ["#2563EB"] },
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
      <h1 className="text-3xl font-bold text-center mb-4">
        Boxplot - Produtividade
      </h1>
      <div ref={chartRef} className="w-full h-80 md:h-96"></div>
      <nav className="flex justify-center gap-6 mt-6 text-sm">
        <a href="/grafico/produtividade" className="text-blue-600 font-bold">
          Produtividade
        </a>
        <a
          href="/grafico/fosforo"
          className="text-gray-900 hover:text-blue-600"
        >
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
