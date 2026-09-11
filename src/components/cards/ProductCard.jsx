import { ExternalLink, Heart, ShoppingCart } from 'lucide-react';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import separator from '../../hooks/separator';

const MotionDiv = motion.div;

function ProductCard({ data, setLikedProducts }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [liked, setLiked] = useState(() => {
    let currentLikes = Cookies.get('liked_products')
      ? JSON.parse(Cookies.get('liked_products'))
      : [];

    return currentLikes.includes(data?.id);
  });

  const toggleLike = () => {
    let currentLikes = Cookies.get('liked_products')
      ? JSON.parse(Cookies.get('liked_products'))
      : [];

    if (!currentLikes.includes(data?.id)) {
      currentLikes.push(data?.id);
      setLiked(true);
    } else {
      currentLikes = currentLikes.filter((item) => item !== data?.id);
      setLiked(false);
    }

    if (typeof setLikedProducts == 'function') {
      setLikedProducts(currentLikes);
    }

    Cookies.set('liked_products', JSON.stringify(currentLikes), { expires: 7 });
  };

  return (
    <div className='bg-white rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow relative group'>
      <button
        onClick={toggleLike}
        className='absolute cursor-pointer top-4 right-4 z-10 p-1.5 bg-white/80 backdrop-blur rounded-full text-outline hover:text-error transition-colors'
      >
        <MotionDiv
          animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          whileTap={{ scale: 0.8 }}
        >
          <Heart
            size={18}
            strokeWidth={2}
            fill={liked ? '#ef4444' : 'none'} // Ichini qizil qilish
            color={liked ? '#ef4444' : '#666'} // Chegarasini rangini o'zgartirish
          />
        </MotionDiv>
      </button>
      {/* Was aspect-square (as tall as the card is wide) — aspect-[4/3]
          keeps the card noticeably shorter without cropping too tightly. */}
      <Link
        to={`/products/${data?.id}`}
        className='aspect-[4/3] block rounded-DEFAULT overflow-hidden bg-surface-container mb-2.5'
      >
        <img
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
          data-alt='Pallet of high quality gray cement bags'
          src={baseUrl + data?.image}
        />
      </Link>
      <Link to={`/products/${data?.id}`} className='block space-y-1'>
        <div className='flex gap-1'>
          <span
            className={`bg-success/10 text-[10px] font-bold ${data?.is_certificated == 1 ? 'text-green-600' : 'text-red-400'} px-1.5 py-0.5 rounded`}
          >
            {data?.is_certificated == 1
              ? 'Sertifikatlangan'
              : 'Sertifikatlanmagan'}
          </span>

          <span
            className={`${data?.have_nds == 1 ? 'bg-surface-tint/10' : 'bg-orange-400/10'} text-[10px] font-bold ${data?.have_nds == 1 ? 'text-surface-tint' : 'text-orange-400'} px-1.5 py-0.5 rounded`}
          >
            QQS {data?.have_nds == 1 ? 'bilan' : 'siz'}
          </span>
        </div>
        <h3 className='font-bold text-sm leading-tight line-clamp-2'>{data?.name || ''}</h3>
        <p className='text-on-surface-variant text-xs font-medium'>
          {data?.company?.name || ''}
        </p>
        <div className='flex items-baseline gap-1.5 pt-1'>
          <span className='text-base font-black text-on-surface'>
            {separator(data?.price, data?.valute?.name)}
          </span>
          <span className='text-xs text-on-surface-variant'>
            / {data?.unit?.name}
          </span>
        </div>
        <div className='text-[10px] text-outline font-bold uppercase tracking-widest'>
          Min: {data?.min_order} {data?.unit?.name}
        </div>
        <button
          onClick={(e) => e?.stopPropagation()}
          className='w-full mt-2 cursor-pointer bg-surface-tint text-white py-2 text-sm rounded-full font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-surface-tint/20'
        >
          Batafsil
          <ExternalLink size={16} />
        </button>
      </Link>
    </div>
  );
}

export default memo(ProductCard);
