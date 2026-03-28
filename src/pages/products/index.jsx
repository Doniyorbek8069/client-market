import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProductCard from '../../components/cards/ProductCard';
import { Filter, ListFilter, LoaderPinwheel } from 'lucide-react';

import useSetArrayQuery from 'hooks/useSetArrayQuery';
import useSetQuery from 'hooks/useSetQuery';
import hasQuery from 'hooks/hasQuery';

function Products() {
  const axios = useAxios();
  const { search } = useLocation();
  const [query] = useSearchParams();
  const setArrayQuery = useSetArrayQuery();
  const setQuery = useSetQuery();
  const type = query.get('type');

  const categories = useQuery({
    queryKey: ['/dashboard/categories', type],
    queryFn: async () => {
      const res = await axios.get(
        `/dashboard/categories${type ? '?type=' + type : ''}`,
      );
      return res?.data?.data;
    },
  });
  const products = useQuery({
    queryKey: ['/dashboard/products', search],
    queryFn: async () => {
      const res = await axios.get(`/dashboard/products${search}`);
      return res?.data?.data;
    },
  });

  const toggleQuery = (query_name) => {
    if (query.get(query_name)) setQuery(query_name, '');
    else setQuery(query_name, 'true');
  };

  const toggleSort = (query_name) => {
    if (query.get(query_name) == 'asc') {
      return setQuery(query_name, 'desc');
    }
    if (query.get(query_name) == 'desc') {
      return setQuery(query_name, '');
    }
    setQuery(query_name, 'asc');
  };

  return (
    <div>
      <section className='mb-10 overflow-hidden'>
        <div className='flex gap-4 overflow-x-auto hide-scrollbar pb-4'>
          {categories?.isLoading ? (
            <div className='flex justify-center'>
              <LoaderPinwheel
                size={55}
                className='animate-spin'
                color='#3622F2'
              />
            </div>
          ) : (
            categories?.data?.map((item) => (
              <div
                key={item?.id}
                className={
                  'flex flex-col items-center gap-2 min-w-[100px] group cursor-pointer'
                }
                onClick={() => setArrayQuery('category_ids', item?.id)}
              >
                <div
                  className={`w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-surface-tint group-hover:text-white transition-all duration-300 ${hasQuery('category_ids', item?.id) ? '!bg-surface-tint text-white' : ''}`}
                >
                  <span
                    className='material-symbols-outlined text-3xl'
                    dangerouslySetInnerHTML={{ __html: item?.icon }}
                  />
                </div>
                <span className='text-xs font-semibold uppercase tracking-wider text-on-surface-variant'>
                  {item?.name}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className='flex flex-wrap items-center justify-between gap-4 mb-8'>
        <div className='flex gap-3 overflow-x-auto hide-scrollbar'>
          <button className='px-5 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors'>
            <ListFilter />
            Saralash
          </button>
          <button
            onClick={() => toggleQuery('is_certificated')}
            className={`px-5 py-2 rounded-full transition-colors border ${query.get('is_certificated') ? 'bg-primary-container text-on-primary-container border-primary-container hover:bg-primary-dim/80 hover:text-white' : 'border-outline-variant/30 hover:bg-surface-container-low'} text-sm font-semibold cursor-pointer`}
          >
            Sertifikatlangan
          </button>
          <button
            onClick={() => toggleSort('sort_by_price')}
            className={`px-5 py-2 rounded-full transition-colors border ${query.get('sort_by_price') ? 'bg-primary-container text-on-primary-container border-primary-container hover:bg-primary-dim/80 hover:text-white' : 'border-outline-variant/30 hover:bg-surface-container-low'} text-sm font-semibold cursor-pointer`}
          >
            Narx:{' '}
            {query.get('sort_by_price') == 'asc'
              ? 'Blanddan pastga'
              : query.get('sort_by_price') == 'desc'
                ? 'Pastdan balandga'
                : 'Tartiblash'}
          </button>
          <button
            onClick={() => toggleQuery('is_news')}
            className={`px-5 py-2 rounded-full transition-colors border ${query.get('is_news') ? 'bg-primary-container text-on-primary-container border-primary-container hover:bg-primary-dim/80 hover:text-white' : 'border-outline-variant/30 hover:bg-surface-container-low'} text-sm font-semibold cursor-pointer`}
          >
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
