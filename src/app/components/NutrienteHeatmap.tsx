'use client';
import { useEffect, useRef, useState } from 'react';
import {
  amostras,
  classifica_P,
  classifica_K,
  classifica_Ca,
  classifica_Mg,
  VariavelChave,
  variavelLabels,
} from '../data/amostras';

const ApexCharts =
  typeof window !== 'undefined' ? require('apexcharts').default : null;

// Map de funções de classificação por nutriente
const classes: Record<Exclude<VariavelChave, 'PROD'>, (v: number) => string> = {
  P: classifica_P,
  K: classifica_K,
  Ca: classifica_Ca,
  Mg: classifica_Mg,
};

// Paleta de cores por classe
const cores: Record<string, string> = {
  Baixo: '#F87171', // vermelho
  Médio: '#FBBF24', // amarelo
  Alto: '#34D399', // verde
  'Muito Alto': '#2563EB', // azul
};

export default function NutrienteHeatmap() {
  const [nutriente, setNutriente] =
    useState<Exclude<VariavelChave, 'PROD'>>('P');
  const chartId = 'heatmap-chart';
  const chartRef = useRef<any>(null);

  // Prepara os dados para o heatmap, separando por classe
  const pontos = amostras.map((a) => {
    const valor = a[nutriente];
    const classe = classes[nutriente](valor);
    return {
      x: a.x,
      y: a.y,
      valor,
      classe,
    };
  });

  const series = ['Baixo', 'Médio', 'Alto', 'Muito Alto'].map((classe) => ({
    name: classe,
    data: pontos.filter((p) => p.classe === classe),
    color: cores[classe as keyof typeof cores],
  }));

  useEffect(() => {
    if (typeof window === 'undefined' || !ApexCharts) return;

    const el = document.getElementById(chartId);
    if (!el) return;

    // Destroi gráfico anterior
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const options = {
      chart: {
        type: 'scatter',
        height: 500,
        background: 'transparent',
        fontFamily: 'Inter, sans-serif',
        toolbar: { show: false },
      },
      series,
      xaxis: {
        labels: { style: { colors: '#6B7280' } },
        title: { text: 'X', style: { color: '#6B7280' } },
      },
      yaxis: {
        labels: { style: { colors: '#6B7280' } },
        title: { text: 'Y', style: { color: '#6B7280' } },
      },
      markers: {
        size: 12,
        strokeColors: '#fff',
        strokeWidth: 2,
      },
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
          const p = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          return `<div class='p-2 text-xs'>
            <div><strong>Classe:</strong> ${w.globals.initialSeries[seriesIndex].name}</div>
            <div><strong>${variavelLabels[nutriente]}:</strong> ${p.valor}</div>
            <div>X: ${p.x} | Y: ${p.y}</div>
          </div>`;
        },
      },
      grid: { borderColor: '#E5E7EB', strokeDashArray: 4 },
      legend: { show: true },
    };

    chartRef.current = new ApexCharts(el, options);
    chartRef.current.render();

    // Cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [nutriente]);

  return (
    <div className='w-full'>
      {/* Botões de seleção de nutriente */}
      <div className='flex gap-4 mb-4 justify-center'>
        {(['P', 'K', 'Ca', 'Mg'] as Exclude<VariavelChave, 'PROD'>[]).map(
          (v) => (
            <button
              key={v}
              className={`px-4 py-2 rounded font-bold border transition-colors ${
                nutriente === v
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setNutriente(v)}
            >
              {variavelLabels[v]}
            </button>
          )
        )}
      </div>

      {/* Gráfico */}
      <div id={chartId} className='w-full h-[500px]' />
    </div>
  );
}
