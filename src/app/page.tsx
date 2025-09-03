'use client'; // This directive ensures the component is rendered on the client side

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { amostras } from './data/amostras';

// Use a dynamic import to load ApexCharts on the client side only
// This prevents the "window is not defined" error during server-side rendering
const ApexCharts =
  typeof window !== 'undefined' ? require('apexcharts').default : null;

export default function App() {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  // Define the chart options
  const options = {
    chart: {
      type: 'scatter',
      height: '100%',
      width: '100%',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    legend: {
      labels: {
        colors: ['#6B7280', '#6B7280', '#6B7280'], // Gray-500
        useSeriesColors: false,
      },
    },
    series: [
      {
        name: 'Amostras de solo',
        data: amostras,
      },
    ],
    xaxis: {
      labels: {
        style: {
          colors: '#6B7280', // Gray-500
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280', // Gray-500
        },
      },
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px' },
      custom: function ({
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) {
        const d = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div class='p-2'>
            <div><strong>X:</strong> ${d.x}</div>
            <div><strong>Y:</strong> ${d.y}</div>
            <div><strong>PROD:</strong> ${d.PROD}</div>
            <div><strong>P:</strong> ${d.P} | <strong>K:</strong> ${d.K}</div>
            <div><strong>Ca:</strong> ${d.Ca} | <strong>Mg:</strong> ${d.Mg}</div>
          </div>`;
      },
    },
    grid: {
      borderColor: '#E5E7EB', // Gray-200
      strokeDashArray: 4,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      colors: ['#2563EB', '#10B981', '#EF4444'], // Blue-600, Green-500, Red-500
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    fill: {
      colors: ['#2563EB', '#10B981', '#EF4444'], // Blue-600, Green-500, Red-500
    },
  };

  useEffect(() => {
    if (ApexCharts && chartRef.current) {
      if (!chart) {
        const newChart = new ApexCharts(chartRef.current, options);
        newChart.render();
        setChart(newChart);
      }
    }
  }, [chart]);

  return (
    <div className='font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 bg-gray-50 dark:bg-gray-50text-gray-900 dark:text-gray-900'>
      <h1 className='text-4xl font-bold text-center'>Aula 05 Estatistica</h1>
      <h1 className='text-4xl font-bold text-center mb-4'>Grupo - 04</h1>
      <div className='w-full max-w-4xl p-10 md:p-10 pt-2 md:pt-2 bg-gray-50  rounded-2xl  flex flex-col'>
        <nav className='flex justify-center gap-6 text-sm'>
          <a href='/' className='text-blue-600'>
            Mapa da fazenda
          </a>
          <a
            href='/grafico/produtividade'
            className='text-gray-900 hover:text-blue-600'
          >
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
        <h1 className='text-3xl font-bold text-center sm:text-4xl text-gray-800 dark:text-gray-900'>
          Mapa da Fazenda
        </h1>
        <div id='chart' ref={chartRef} className='w-full h-80 md:h-96'></div>
      </div>
    </div>
  );
}
