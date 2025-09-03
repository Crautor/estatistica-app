'use client';
import ScatterOutlierChart from '@/app/components/ScatterOutlierChart';

export default function PotassioDispersao() {
  return (
    <div className='font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-gray-900'>
      <nav className='flex justify-center gap-6 text-sm'>
        <a href='/' className='text-gray-900 hover:text-blue-600'>
          Mapa da fazenda
        </a>
        <a
          href='/grafico/produtividade'
          className='text-gray-900 hover:text-blue-600'
        >
          Boxplot
        </a>
        <a href='/grafico/produtividade-dispersao' className='text-blue-600'>
          Dispersão
        </a>
        <a
          href='/grafico/heatmap'
          className='text-gray-900 hover:text-blue-600'
        >
          Heatmap
        </a>
      </nav>
      <nav className='flex justify-center gap-6 text-sm mb-4'>
        <a
          href='/grafico/produtividade-dispersao'
          className='text-gray-900 hover:text-blue-600'
        >
          Dispersão Produtividade
        </a>
        <a
          href='/grafico/fosforo-dispersao'
          className='text-gray-900 hover:text-blue-600'
        >
          Dispersão Fósforo
        </a>
        <a href='/grafico/potassio-dispersao' className='text-blue-600'>
          Dispersão Potássio
        </a>
        <a
          href='/grafico/calcio-dispersao'
          className='text-gray-900 hover:text-blue-600'
        >
          Dispersão Cálcio
        </a>
        <a
          href='/grafico/magnesio-dispersao'
          className='text-gray-900 hover:text-blue-600'
        >
          Dispersão Magnésio
        </a>
      </nav>
      <h1 className='text-3xl font-bold mb-2 text-center'>
        Dispersão - Potássio
      </h1>
      <p className='mb-4 text-sm text-gray-600'>
        Pontos vermelhos representam outliers de Potássio pelo critério IQR.
      </p>
      <div className='w-full max-w-5xl'>
        <ScatterOutlierChart variavel='K' color='#8B5CF6' />
      </div>
    </div>
  );
}
