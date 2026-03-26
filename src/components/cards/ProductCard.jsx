import { Heart, ShoppingCart } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ data }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group'>
      <button
        onClick={(e) => e?.stopPropagation()}
        className='absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-outline hover:text-error transition-colors'
      >
        <Heart />
      </button>
      <Link
        to={`/products/${data?.id}`}
        className='aspect-square block rounded-DEFAULT overflow-hidden bg-surface-container mb-4'
      >
        <img
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
          data-alt='Pallet of high quality gray cement bags'
          src={baseUrl + data?.image}
        />
      </Link>
      <div className='space-y-2'>
        <Link className='block' to={`/products/${data?.id}`}>
          <div className='flex gap-1'>
            {data?.is_certificated == 1 && (
              <span className='bg-success/10 text-xs font-bold text-green-600 px-2 py-0.5 rounded'>
                Sertifikatlangan
              </span>
            )}
            {data?.have_nds == 1 && (
              <span className='bg-primary/10 text-xs font-bold text-primary px-2 py-0.5 rounded'>
                QQS bilan
              </span>
            )}
          </div>
          <h3 className='font-bold text-lg leading-tight'>
            {data?.name || ''}
          </h3>
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
        </Link>
        <button
          onClick={(e) => e?.stopPropagation()}
          className='w-full mt-4 bg-primary text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20'
        >
          <ShoppingCart />
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
