'use client';
import { useEffect, useRef, useState } from 'react';
import {
  amostras,
  VariavelChave,
  variavelLabels,
  Amostra,
} from '../data/amostras';

const ApexCharts =
  typeof window !== 'undefined' ? require('apexcharts').default : null;

interface ScatterOutlierChartProps {
  variavel: VariavelChave;
  color?: string;
}

function calcularOutliers(lista: number[]) {
  const sorted = [...lista].sort((a, b) => a - b);
  const n = sorted.length;
  const q1 = sorted[Math.floor(0.25 * (n + 1)) - 1];
  const q3 = sorted[Math.floor(0.75 * (n + 1)) - 1];
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = new Set(
    sorted.filter((v) => v < lowerFence || v > upperFence)
  );
  return { outliers, lowerFence, upperFence, q1, q3 };
}

export default function ScatterOutlierChart({
  variavel,
  color = '#2563EB',
}: ScatterOutlierChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    if (!ApexCharts || !chartRef.current) return;

    const valores = amostras.map((a) => a[variavel]);
    const { outliers } = calcularOutliers(valores as number[]);

    const normalPoints = amostras
      .filter((a) => !outliers.has(a[variavel]))
      .map((a) => ({ ...a, valor: a[variavel] }));
    const outlierPoints = amostras
      .filter((a) => outliers.has(a[variavel]))
      .map((a) => ({ ...a, valor: a[variavel] }));

    const options = {
      chart: {
        type: 'scatter',
        height: 420,
        background: 'transparent',
        fontFamily: 'Inter, sans-serif',
        toolbar: { show: false },
        animations: { enabled: false },
      },
      series: [
        {
          name: variavelLabels[variavel],
          data: normalPoints,
        },
        {
          name: 'Outliers',
          data: outlierPoints,
        },
      ],
      legend: {
        labels: { colors: ['#6B7280'], useSeriesColors: false },
      },
      xaxis: {
        labels: { style: { colors: '#6B7280' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        title: { text: 'X', style: { color: '#6B7280' } },
      },
      yaxis: {
        labels: { style: { colors: '#6B7280' } },
        title: { text: 'Y', style: { color: '#6B7280' } },
      },
      markers: {
        size: [5, 7],
      },
      colors: [color, '#EF4444'],
      tooltip: {
        theme: 'dark',
        custom: function ({
          seriesIndex,
          dataPointIndex,
          w,
        }: {
          seriesIndex: number;
          dataPointIndex: number;
          w: any;
        }) {
          const point = w.globals.initialSeries[seriesIndex].data[
            dataPointIndex
          ] as Amostra;
          return `<div class='p-2 text-xs'>
            <div><strong>${variavelLabels[variavel]}:</strong> ${point[variavel]}</div>
            <div>X: ${point.x} | Y: ${point.y}</div>
            <div>PROD: ${point.PROD}</div>
            <div>P: ${point.P} | K: ${point.K}</div>
            <div>Ca: ${point.Ca} | Mg: ${point.Mg}</div>
          </div>`;
        },
      },
      grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
      stroke: { width: 0 },
      dataLabels: { enabled: false },
    };

    if (chart) {
      chart.updateOptions(options, false, true);
    } else {
      const newChart = new ApexCharts(chartRef.current, options);
      newChart.render();
      setChart(newChart);
    }
    return () => {
      chart && chart.destroy();
    };
  }, [variavel]);

  return <div ref={chartRef} className='w-full h-[420px]'></div>;
}
