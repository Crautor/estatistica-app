'use client';
import { useEffect, useRef, useState } from 'react';
const ApexCharts =
  typeof window !== 'undefined' ? require('apexcharts').default : null;

const data = [
  28.1, 37.94, 33.55, 40.12, 36.8, 35.75, 38.67, 41.32, 30.2, 26.1, 34.02,
  36.25, 21.24, 30.85, 28.93, 35.03, 30.56, 30.86, 34.48, 29.65, 14.36, 34.99,
  24.58, 30.48, 36.64, 38.53, 39.87, 37.97, 24.07, 27.62, 25.89, 33.91, 36.8,
  27.38, 24.41, 28.78, 27.42, 28.9, 39.02, 26.13, 32.06, 32.64, 31.73, 32.39,
  33.74, 30.11, 29.49, 36.02, 33.17, 32.41, 34.86, 45.91, 33.88, 37.78, 39.1,
  35.38, 34.54, 30.86, 32.23, 19.19, 7.33, 32.72, 40.33, 41.74, 28.92, 34.74,
  37.36, 29.64, 19.61, 27.25, 30.43, 27.47, 21.07, 17.3,
];

function calculateBoxPlotData(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  // Quartis
  const q1 = sorted[Math.floor(0.25 * (n + 1)) - 1];
  const q2 = sorted[Math.floor(0.5 * (n + 1)) - 1];
  const q3 = sorted[Math.floor(0.75 * (n + 1)) - 1];
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  // Whiskers: menor valor >= lowerFence, maior valor <= upperFence
  const whiskerMin = sorted.find((v) => v >= lowerFence);
  const whiskerMax = [...sorted].reverse().find((v) => v <= upperFence);
  // Outliers
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  const goals = outliers.map((v) => ({
    value: v,
    strokeWidth: 0,
    strokeHeight: 13,
    strokeLineCap: 'round',
    strokeColor: '#FEB019',
  }));
  return { box: [whiskerMin, q1, q2, q3, whiskerMax], goals };
}

export default function CalcioBoxplot() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (ApexCharts && chartRef.current && !chart) {
      const boxplot = calculateBoxPlotData(data);
      const options = {
        chart: {
          type: 'boxPlot',
          height: 350,
          background: 'transparent',
          fontFamily: 'Inter, sans-serif',
          toolbar: { show: false },
        },
        series: [
          {
            type: 'boxPlot',
            name: 'Cálcio',
            data: [{ x: 'Cálcio', y: boxplot.box, goals: boxplot.goals }],
          },
        ],
        xaxis: {
          categories: ['Cálcio'],
          labels: { style: { colors: '#6B7280' } },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: {
          labels: { style: { colors: '#6B7280' } },
          title: { text: 'Valores', style: { color: '#6B7280' } },
        },
        tooltip: { theme: 'dark', style: { fontSize: '12px' } },
        grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
        fill: { colors: ['#F59E0B'] },
        legend: { labels: { colors: ['#6B7280'] } },
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
    <div className='font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-50text-gray-900 dark:text-gray-900'>
      <nav className='flex justify-center gap-6 text-sm'>
        <a href='/' className='text-gray-900 hover:text-blue-600'>
          Mapa da fazenda
        </a>
        <a href='/grafico/produtividade' className='text-blue-600'>
          Boxplot
        </a>
        <a
          href='/grafico/produtividade-dispersao'
          className='text-gray-900 hover:text-blue-600'
        >
          Dispersão
        </a>
        <a
          href='/grafico/heatmap'
          className='text-gray-900 hover:text-blue-600'
        >
          Heatmap
        </a>
      </nav>
      <h1 className='text-3xl font-bold text-center mb-4'>Boxplot - Cálcio</h1>
      <div ref={chartRef} className='w-full h-80 md:h-96'></div>
      <nav className='flex justify-center gap-6 mt-6 text-sm'>
        <a
          href='/grafico/produtividade'
          className='text-gray-900 hover:text-blue-600'
        >
          Produtividade
        </a>
        <a
          href='/grafico/fosforo'
          className='text-gray-900 hover:text-blue-600'
        >
          Fósforo
        </a>
        <a
          href='/grafico/potassio'
          className='text-gray-900 hover:text-blue-600'
        >
          Potássio
        </a>
        <a href='/grafico/calcio' className='text-blue-600 font-bold'>
          Cálcio
        </a>
        <a
          href='/grafico/magnesio'
          className='text-gray-900 hover:text-blue-600'
        >
          Magnésio
        </a>
      </nav>
    </div>
  );
}
