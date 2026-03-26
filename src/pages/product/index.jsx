import { useState } from 'react';
import {
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  LoaderPinwheel,
} from 'lucide-react';
// import { useTranslation } from 'react-i18next';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Product = () => {
  // const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const axios = useAxios();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['/dashboard/product/{id}', id],
    queryFn: async () => {
      const res = await axios.get(`/dashboard/product/${id}`);
      return res?.data?.data;
    },
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const thumbnails = data?.images?.map((img) => baseUrl + img);
  if (data?.image) thumbnails?.unshift(baseUrl + data?.image);

  if (isLoading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <LoaderPinwheel size={55} className='animate-spin' color='#3622F2' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header (oddiy misol) */}

      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Breadcrumb */}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* ==================== RASMLAR QISMI ==================== */}
          <div>
            <div className='bg-white rounded-2xl p-4 shadow-sm'>
              <img
                src={thumbnails?.[selectedImage]}
                alt={data?.title}
                className='w-full aspect-square object-contain rounded-xl'
              />
            </div>

            {/* Thumbnails */}
            <div className='flex gap-3 mt-4 overflow-x-auto pb-2'>
              {thumbnails?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 border-2 rounded-md w-20 h-20 overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'border-purple-600'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ==================== MA'LUMOTLAR QISMI ==================== */}
          <div className='space-y-6'>
            <h1 className='text-3xl font-semibold leading-tight'>
              {data?.title}
            </h1>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center text-yellow-500'>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={
                        i < Math.floor(data?.rating) ? 'currentColor' : 'none'
                      }
                    />
                  ))}
              </div>
              <span className='font-medium'>{data?.rating}</span>
              <span className='text-gray-500'>
                ({data?.reviewCount} fikrlar)
              </span>
              <span className='text-emerald-600'>
                • {data?.orderCount}+ buyurtmalar
              </span>
            </div>

            {/* Price */}
            <div>
              <div className='flex items-center gap-3'>
                <span className='text-4xl font-bold text-purple-700'>
                  {data?.price?.toLocaleString('ru-RU')} {data?.valute?.name}
                </span>
                {data?.discountPercent && (
                  <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium'>
                    -{data?.discountPercent}%
                  </span>
                )}
              </div>
              {data?.discountPrice && (
                <p className='text-gray-500 line-through text-lg'>
                  {data?.discountPrice?.toLocaleString('ru-RU')} сум
                </p>
              )}
            </div>

            {/* Delivery & Stock */}
            <div className='bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4'>
              <Truck className='text-emerald-600 mt-1' size={28} />
              <p className='font-medium text-emerald-700'>
                MIN: {data?.min_order}
              </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 rounded-2xl transition text-lg'>
                Bir tegishda sotib olish
              </button>
              <button className='flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-4 rounded-2xl transition text-lg'>
                Savatchaga
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 border-2 rounded-2xl transition ${isFavorite ? 'border-red-500 text-red-500' : 'border-gray-300'}`}
              >
                <Heart size={28} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Seller */}
            <div className='border-t pt-6'>
              <p className='text-sm text-gray-500 mb-2'>Sotuvchi</p>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>{data?.company?.name}</p>
                  <p className='text-sm text-yellow-600'>
                    ★ {data?.company?.rating} ({data?.company?.reviewCount})
                  </p>
                </div>
                <button className='text-purple-600 text-sm font-medium'>
                  Do'konga →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Tabs */}
        <div className='mt-16'>
          <div className='border-b mb-8'>
            <button className='pb-4 border-b-4 border-purple-600 font-medium text-lg px-8'>
              Tavsif
            </button>
            <button className='pb-4 text-gray-500 px-8'>Характеристики</button>
            <button className='pb-4 text-gray-500 px-8'>
              Отзывы ({data?.reviewCount})
            </button>
          </div>

          <div className='prose max-w-none text-gray-700 leading-relaxed'>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
