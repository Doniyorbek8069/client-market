import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProductCard from '../../components/cards/ProductCard';
import { LoaderPinwheel } from 'lucide-react';
// api/dashboard/regions
// api/dashboard/units
// api/dashboard/categories
// api/dashboard/products
// api/dashboard/companies
// api/dashboard/product/{ProductId}

function Products() {
  const axios = useAxios();
  // const categories = useQuery({
  //   queryKey: ['/dashboard/categories'],
  //   queryFn: async () => {
  //     const res = await axios.get('/dashboard/categories');
  //     return res?.data?.data;
  //   },
  // });
  const products = useQuery({
    queryKey: ['/dashboard/products'],
    queryFn: async () => {
      const res = await axios.get('/dashboard/products');
      return res?.data?.data;
    },
  });

  return (
    <div>
      <section className='mb-10 overflow-hidden'>
        <div className='flex gap-4 overflow-x-auto hide-scrollbar pb-4'>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                construction
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Cement
            </span>
          </div>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                rebase_edit
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Brick
            </span>
          </div>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                hardware
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Metal
            </span>
          </div>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                format_paint
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Paint
            </span>
          </div>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                handyman
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Tools
            </span>
          </div>
          <div className='flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'>
            <div className='w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300'>
              <span className='material-symbols-outlined text-3xl'>
                engineering
              </span>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
              Services
            </span>
          </div>
        </div>
      </section>

      <section className='flex flex-wrap items-center justify-between gap-4 mb-8'>
        <div className='flex gap-3 overflow-x-auto hide-scrollbar'>
          <button className='px-5 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors'>
            <span className='material-symbols-outlined text-lg'>
              filter_list
            </span>{' '}
            Saralash
          </button>
          <button className='px-5 py-2 rounded-full bg-primary-container text-on-primary-container text-sm font-semibold'>
            Sertifikatlangan
          </button>
          <button className='px-5 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold hover:bg-surface-container-low'>
            Narx: Pastdan balandga
          </button>
          <button className='px-5 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold hover:bg-surface-container-low'>
            Yangi qo'shilganlar
          </button>
        </div>
        <p className='text-on-surface-variant text-sm font-medium'>
          {products?.data?.total} ta mahsulot topildi
        </p>
      </section>
      <section className='grid grid-cols-1 gap-6'>
        <div className='md:col-span-8 space-y-8'>
          <div className='flex items-end justify-between'>
            <h2 className='text-3xl font-black tracking-tight'>
              Barcha mahsulotlar
            </h2>
          </div>
          {products?.isLoading ? (
            <div className='flex justify-center'>
              <LoaderPinwheel
                size={55}
                className='animate-spin'
                color='#3622F2'
              />
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {products?.data?.data?.map((data) => (
                <ProductCard data={data} key={data?.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default memo(Products);
