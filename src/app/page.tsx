'use client'; // This directive ensures the component is rendered on the client side

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
        data: [
          {
            x: 239829.11,
            y: 7236829.14,
            PROD: 3.832,
            P: 27.21,
            K: 0.28,
            Ca: 28.1,
            Mg: 1.8,
          },
          {
            x: 239971.09,
            y: 7236849.03,
            PROD: 2.383,
            P: 14.9,
            K: 0.28,
            Ca: 37.94,
            Mg: 2.1,
          },
          {
            x: 240114.88,
            y: 7236867.54,
            PROD: 3.396,
            P: 20.75,
            K: 0.58,
            Ca: 33.55,
            Mg: 2.0,
          },
          {
            x: 239527.57,
            y: 7236926.47,
            PROD: 2.622,
            P: 9.55,
            K: 0.3,
            Ca: 40.12,
            Mg: 2.9,
          },
          {
            x: 239668.51,
            y: 7236951.33,
            PROD: 3.775,
            P: 11.03,
            K: 0.4,
            Ca: 36.8,
            Mg: 2.0,
          },
          {
            x: 239706.34,
            y: 7236987.66,
            PROD: 3.369,
            P: 8.82,
            K: 0.43,
            Ca: 35.75,
            Mg: 1.0,
          },
          {
            x: 239652.41,
            y: 7236878.87,
            PROD: 3.159,
            P: 15.7,
            K: 0.2,
            Ca: 38.67,
            Mg: 2.1,
          },
          {
            x: 239812.28,
            y: 7236963.82,
            PROD: 3.254,
            P: 5.3,
            K: 0.15,
            Ca: 41.32,
            Mg: 2.2,
          },
          {
            x: 239951.66,
            y: 7236987.67,
            PROD: 3.144,
            P: 20.75,
            K: 0.28,
            Ca: 30.2,
            Mg: 1.6,
          },
          {
            x: 240092.22,
            y: 7237009.17,
            PROD: 3.643,
            P: 43.84,
            K: 0.33,
            Ca: 26.1,
            Mg: 1.6,
          },
          {
            x: 240235.84,
            y: 7237027.58,
            PROD: 3.758,
            P: 14.9,
            K: 0.2,
            Ca: 34.02,
            Mg: 2.4,
          },
          {
            x: 240375.0,
            y: 7237047.32,
            PROD: 3.801,
            P: 13.32,
            K: 0.13,
            Ca: 36.25,
            Mg: 3.0,
          },
          {
            x: 240514.92,
            y: 7237067.43,
            PROD: 2.888,
            P: 7.39,
            K: 0.13,
            Ca: 21.24,
            Mg: 1.2,
          },
          {
            x: 240655.76,
            y: 7237087.05,
            PROD: 2.672,
            P: 14.9,
            K: 0.13,
            Ca: 30.85,
            Mg: 2.4,
          },
          {
            x: 240796.9,
            y: 7237109.19,
            PROD: 3.187,
            P: 8.82,
            K: 0.18,
            Ca: 28.93,
            Mg: 2.2,
          },
          {
            x: 240759.55,
            y: 7237141.01,
            PROD: 2.905,
            P: 7.39,
            K: 0.28,
            Ca: 35.03,
            Mg: 2.9,
          },
          {
            x: 240832.1,
            y: 7237176.63,
            PROD: 3.632,
            P: 7.39,
            K: 0.18,
            Ca: 30.56,
            Mg: 2.7,
          },
          {
            x: 240937.06,
            y: 7237128.47,
            PROD: 2.956,
            P: 16.51,
            K: 0.35,
            Ca: 30.86,
            Mg: 2.6,
          },
          {
            x: 239221.9,
            y: 7237031.04,
            PROD: 3.212,
            P: 6.68,
            K: 0.13,
            Ca: 34.48,
            Mg: 3.5,
          },
          {
            x: 239367.32,
            y: 7237046.24,
            PROD: 2.979,
            P: 12.55,
            K: 0.48,
            Ca: 29.65,
            Mg: 2.3,
          },
          {
            x: 239505.89,
            y: 7237067.85,
            PROD: 3.208,
            P: 15.7,
            K: 0.25,
            Ca: 14.36,
            Mg: 0.9,
          },
          {
            x: 239651.16,
            y: 7237088.58,
            PROD: 3.163,
            P: 15.7,
            K: 0.23,
            Ca: 34.99,
            Mg: 2.0,
          },
          {
            x: 239788.5,
            y: 7237107.78,
            PROD: 2.348,
            P: 9.55,
            K: 0.2,
            Ca: 24.58,
            Mg: 1.5,
          },
          {
            x: 239931.23,
            y: 7237128.04,
            PROD: 3.287,
            P: 19.88,
            K: 0.45,
            Ca: 30.48,
            Mg: 2.0,
          },
          {
            x: 240073.31,
            y: 7237147.33,
            PROD: 3.493,
            P: 4.62,
            K: 0.35,
            Ca: 36.64,
            Mg: 2.3,
          },
          {
            x: 240025.44,
            y: 7237168.42,
            PROD: 2.968,
            P: 14.9,
            K: 0.35,
            Ca: 38.53,
            Mg: 2.4,
          },
          {
            x: 240117.82,
            y: 7237208.71,
            PROD: 3.076,
            P: 11.03,
            K: 0.23,
            Ca: 39.87,
            Mg: 2.4,
          },
          {
            x: 240214.35,
            y: 7237171.79,
            PROD: 3.239,
            P: 15.7,
            K: 0.2,
            Ca: 37.97,
            Mg: 1.8,
          },
          {
            x: 240354.7,
            y: 7237185.04,
            PROD: 3.063,
            P: 18.17,
            K: 0.45,
            Ca: 24.07,
            Mg: 1.5,
          },
          {
            x: 240495.51,
            y: 7237207.34,
            PROD: 3.611,
            P: 24.36,
            K: 0.15,
            Ca: 27.62,
            Mg: 1.0,
          },
          {
            x: 240635.73,
            y: 7237226.68,
            PROD: 3.29,
            P: 11.78,
            K: 0.1,
            Ca: 25.89,
            Mg: 1.0,
          },
          {
            x: 240776.39,
            y: 7237248.41,
            PROD: 3.237,
            P: 22.53,
            K: 0.28,
            Ca: 33.91,
            Mg: 1.5,
          },
          {
            x: 239344.26,
            y: 7237190.22,
            PROD: 3.568,
            P: 25.3,
            K: 0.58,
            Ca: 36.8,
            Mg: 1.5,
          },
          {
            x: 239492.09,
            y: 7237206.66,
            PROD: 2.05,
            P: 19.88,
            K: 0.3,
            Ca: 27.38,
            Mg: 1.1,
          },
          {
            x: 239452.83,
            y: 7237239.7,
            PROD: 3.005,
            P: 14.1,
            K: 0.15,
            Ca: 24.41,
            Mg: 0.9,
          },
          {
            x: 239450.78,
            y: 7237145.97,
            PROD: 2.787,
            P: 4.62,
            K: 0.18,
            Ca: 28.78,
            Mg: 0.8,
          },
          {
            x: 239629.19,
            y: 7237227.25,
            PROD: 3.261,
            P: 32.28,
            K: 0.25,
            Ca: 27.42,
            Mg: 1.0,
          },
          {
            x: 239773.75,
            y: 7237245.19,
            PROD: 2.8,
            P: 30.2,
            K: 0.23,
            Ca: 28.9,
            Mg: 1.2,
          },
          {
            x: 239912.97,
            y: 7237267.34,
            PROD: 2.927,
            P: 19.88,
            K: 0.35,
            Ca: 39.02,
            Mg: 4.2,
          },
          {
            x: 240051.78,
            y: 7237285.72,
            PROD: 2.484,
            P: 40.14,
            K: 0.33,
            Ca: 26.13,
            Mg: 1.8,
          },
          {
            x: 240191.68,
            y: 7237307.55,
            PROD: 2.784,
            P: 21.63,
            K: 0.28,
            Ca: 32.06,
            Mg: 2.0,
          },
          {
            x: 240334.76,
            y: 7237326.11,
            PROD: 3.408,
            P: 36.65,
            K: 0.2,
            Ca: 32.64,
            Mg: 2.5,
          },
          {
            x: 240283.75,
            y: 7237341.34,
            PROD: 3.144,
            P: 24.36,
            K: 0.23,
            Ca: 31.73,
            Mg: 2.4,
          },
          {
            x: 240348.02,
            y: 7237403.31,
            PROD: 2.929,
            P: 23.44,
            K: 0.4,
            Ca: 32.39,
            Mg: 2.4,
          },
          {
            x: 240757.54,
            y: 7237387.58,
            PROD: 3.238,
            P: 11.78,
            K: 0.25,
            Ca: 33.74,
            Mg: 1.2,
          },
          {
            x: 239474.98,
            y: 7237345.47,
            PROD: 4.03,
            P: 14.1,
            K: 0.3,
            Ca: 30.11,
            Mg: 1.6,
          },
          {
            x: 239606.67,
            y: 7237364.64,
            PROD: 3.022,
            P: 24.36,
            K: 0.3,
            Ca: 29.49,
            Mg: 0.9,
          },
          {
            x: 239751.24,
            y: 7237384.54,
            PROD: 3.326,
            P: 21.63,
            K: 0.3,
            Ca: 36.02,
            Mg: 1.4,
          },
          {
            x: 239892.63,
            y: 7237409.11,
            PROD: 3.052,
            P: 29.19,
            K: 0.55,
            Ca: 33.17,
            Mg: 1.5,
          },
          {
            x: 240032.76,
            y: 7237425.18,
            PROD: 3.605,
            P: 26.25,
            K: 0.25,
            Ca: 32.41,
            Mg: 1.4,
          },
          {
            x: 240174.77,
            y: 7237444.04,
            PROD: 2.775,
            P: 19.02,
            K: 0.25,
            Ca: 34.86,
            Mg: 1.2,
          },
          {
            x: 239450.53,
            y: 7237485.3,
            PROD: 2.799,
            P: 50.54,
            K: 0.2,
            Ca: 45.91,
            Mg: 2.9,
          },
          {
            x: 239590.18,
            y: 7237506.52,
            PROD: 3.511,
            P: 28.2,
            K: 0.2,
            Ca: 33.88,
            Mg: 1.2,
          },
          {
            x: 239633.92,
            y: 7237484.17,
            PROD: 2.929,
            P: 21.63,
            K: 0.23,
            Ca: 37.78,
            Mg: 1.3,
          },
          {
            x: 239548.28,
            y: 7237566.41,
            PROD: 2.189,
            P: 12.55,
            K: 0.15,
            Ca: 39.1,
            Mg: 1.9,
          },
          {
            x: 239729.18,
            y: 7237522.18,
            PROD: 3.466,
            P: 33.34,
            K: 0.18,
            Ca: 35.38,
            Mg: 1.1,
          },
          {
            x: 239873.18,
            y: 7237546.22,
            PROD: 3.421,
            P: 26.25,
            K: 0.28,
            Ca: 34.54,
            Mg: 0.9,
          },
          {
            x: 240011.79,
            y: 7237563.84,
            PROD: 2.407,
            P: 19.88,
            K: 0.25,
            Ca: 30.86,
            Mg: 0.9,
          },
          {
            x: 240153.93,
            y: 7237582.36,
            PROD: 3.135,
            P: 14.9,
            K: 0.28,
            Ca: 32.23,
            Mg: 1.5,
          },
          {
            x: 240293.91,
            y: 7237604.12,
            PROD: 2.632,
            P: 30.2,
            K: 0.3,
            Ca: 19.19,
            Mg: 0.6,
          },
          {
            x: 240435.29,
            y: 7237625.26,
            PROD: 3.543,
            P: 28.2,
            K: 0.25,
            Ca: 7.33,
            Mg: 1.1,
          },
          {
            x: 240390.19,
            y: 7237644.66,
            PROD: 3.721,
            P: 56.48,
            K: 0.33,
            Ca: 32.72,
            Mg: 1.0,
          },
          {
            x: 240478.5,
            y: 7237564.06,
            PROD: 3.642,
            P: 21.63,
            K: 0.15,
            Ca: 40.33,
            Mg: 1.4,
          },
          {
            x: 240575.16,
            y: 7237643.98,
            PROD: 3.4,
            P: 8.82,
            K: 0.43,
            Ca: 41.74,
            Mg: 1.0,
          },
          {
            x: 239569.11,
            y: 7237644.74,
            PROD: 1.677,
            P: 14.9,
            K: 0.13,
            Ca: 28.92,
            Mg: 0.8,
          },
          {
            x: 239711.75,
            y: 7237660.79,
            PROD: 2.402,
            P: 31.23,
            K: 0.28,
            Ca: 34.74,
            Mg: 1.4,
          },
          {
            x: 239848.99,
            y: 7237685.99,
            PROD: 1.661,
            P: 23.44,
            K: 0.35,
            Ca: 37.36,
            Mg: 1.1,
          },
          {
            x: 239992.99,
            y: 7237702.49,
            PROD: 1.518,
            P: 28.2,
            K: 0.25,
            Ca: 29.64,
            Mg: 0.9,
          },
          {
            x: 239947.88,
            y: 7237726.41,
            PROD: 1.797,
            P: 24.36,
            K: 0.25,
            Ca: 19.61,
            Mg: 0.6,
          },
          {
            x: 240047.34,
            y: 7237652.33,
            PROD: 2.052,
            P: 45.13,
            K: 0.35,
            Ca: 27.25,
            Mg: 0.9,
          },
          {
            x: 240415.71,
            y: 7237763.88,
            PROD: 3.66,
            P: 41.35,
            K: 0.23,
            Ca: 30.43,
            Mg: 1.7,
          },
          {
            x: 239548.72,
            y: 7237782.14,
            PROD: 3.444,
            P: 11.03,
            K: 0.23,
            Ca: 27.47,
            Mg: 2.1,
          },
          {
            x: 239691.79,
            y: 7237803.4,
            PROD: 3.608,
            P: 21.63,
            K: 0.33,
            Ca: 21.07,
            Mg: 1.7,
          },
          {
            x: 239834.91,
            y: 7237822.35,
            PROD: 2.835,
            P: 18.17,
            K: 0.2,
            Ca: 17.3,
            Mg: 1.3,
          },
        ],
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
      style: {
        fontSize: '12px',
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const dataPoint =
          w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `
          <div class="p-2">
            <ul class="list-none p-0 m-0">
              <li class="mb-1"><strong>X:</strong> ${dataPoint.x}</li>
              <li class="mb-1"><strong>Y:</strong> ${dataPoint.y}</li>
              <li class="mb-1"><strong>PROD:</strong> ${dataPoint.PROD}</li>
              <li class="mb-1"><strong>P:</strong> ${dataPoint.P}</li>
              <li class="mb-1"><strong>K:</strong> ${dataPoint.K}</li>
              <li class="mb-1"><strong>Ca:</strong> ${dataPoint.Ca}</li>
              <li class="mb-1"><strong>Mg:</strong> ${dataPoint.Mg}</li>
            </ul>
          </div>
        `;
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
          <a href='/' className='text-gray-900 hover:text-blue-600'>
            Mapa da fazenda
          </a>
          <a href='/grafico/produtividade' className='text-gray-900 hover:text-blue-600'>
            Boxplot
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
