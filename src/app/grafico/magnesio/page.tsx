'use client';
import { useEffect, useRef, useState } from 'react';
const ApexCharts =
  typeof window !== 'undefined' ? require('apexcharts').default : null;

const data = [
  1.8, 2.1, 2.0, 2.9, 2.0, 1.0, 2.1, 2.2, 1.6, 1.6, 2.4, 3.0, 1.2, 2.4, 2.2,
  2.9, 2.7, 2.6, 3.5, 2.3, 0.9, 2.0, 1.5, 2.0, 2.3, 2.4, 2.4, 1.8, 1.5, 1.0,
  1.0, 1.5, 1.5, 1.1, 0.9, 0.8, 1.0, 1.2, 4.2, 1.8, 2.0, 2.5, 2.4, 2.4, 1.2,
  1.6, 0.9, 1.4, 1.5, 1.4, 1.2, 2.9, 1.2, 1.3, 1.9, 1.1, 0.9, 0.9, 1.5, 0.6,
  1.1, 1.0, 1.4, 1.0, 0.8, 1.4, 1.1, 0.9, 0.6, 0.9, 1.7, 2.1, 1.7, 1.3,
];

function calculateBoxPlotData(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
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
    strokeLineCap: 'round',
    strokeColor: '#FEB019',
  }));
  return { box: [whiskerMin, q1, q2, q3, whiskerMax], goals };
}

export default function MagnesioBoxplot() {
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
            name: 'Magnésio',
            data: [{ x: 'Magnésio', y: boxplot.box, goals: boxplot.goals }],
          },
        ],
        xaxis: {
          categories: ['Magnésio'],
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
        fill: { colors: ['#8B5CF6'] },
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
      <h1 className='text-3xl font-bold text-center mb-4'>
        Boxplot - Magnésio
      </h1>
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
        <a href='/grafico/calcio' className='text-gray-900 hover:text-blue-600'>
          Cálcio
        </a>
        <a href='/grafico/magnesio' className='text-blue-600 font-bold'>
          Magnésio
        </a>
      </nav>
    </div>
  );
}
