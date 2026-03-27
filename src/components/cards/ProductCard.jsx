import { ExternalLink, Heart, ShoppingCart } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ data }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <Link
      to={`/products/${data?.id}`}
      className='bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group'
    >
      <button
        onClick={(e) => e?.stopPropagation()}
        className='absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-outline hover:text-error transition-colors'
      >
        <Heart />
      </button>
      <div className='aspect-square rounded-DEFAULT overflow-hidden bg-surface-container mb-4'>
        <img
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
          data-alt='Pallet of high quality gray cement bags'
          src={baseUrl + data?.image}
        />
      </div>
      <div className='space-y-2'>
        <div className='flex gap-1'>
          <span
            className={`bg-success/10 text-xs font-bold ${data?.is_certificated == 1 ? 'text-green-600' : 'text-red-400'} px-2 py-0.5 rounded`}
          >
            {data?.is_certificated == 1
              ? 'Sertifikatlangan'
              : 'Sertifikatlanmagan'}
          </span>

          <span
            className={`${data?.have_nds == 1 ? 'bg-surface-tint/10' : 'bg-orange-400/10'} text-xs font-bold ${data?.have_nds == 1 ? 'text-surface-tint' : 'text-orange-400'} px-2 py-0.5 rounded`}
          >
            QQS {data?.have_nds == 1 ? 'bilan' : 'siz'}
          </span>
        </div>
        <h3 className='font-bold text-lg leading-tight'>{data?.name || ''}</h3>
        <p className='text-on-surface-variant text-xs font-medium'>
          {data?.company?.name || ''}
        </p>
        <div className='flex items-baseline gap-2 pt-2'>
          <span className='text-xl font-black text-on-surface'>
            {data?.price} {data?.valute?.name}
          </span>
          <span className='text-xs text-on-surface-variant'>
            / {data?.unit?.name}
          </span>
        </div>
        <div className='text-[10px] text-outline font-bold uppercase tracking-widest pt-1'>
          Min: {data?.min_order} {data?.unit?.name}
        </div>
      </div>
      <button
        onClick={(e) => e?.stopPropagation()}
        className='w-full mt-4 cursor-pointer bg-surface-tint text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-surface-tint/20'
      >
        Batafsil
        <ExternalLink />
      </button>
    </Link>
  );
}

export default memo(ProductCard);
