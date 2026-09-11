import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import DOMPurify from 'dompurify';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProductCard from '../../components/cards/ProductCard';
import { ListFilter, LoaderPinwheel } from 'lucide-react';
import useSetArrayQuery from 'hooks/useSetArrayQuery';
import hasQuery from 'hooks/hasQuery';
import useSetQuery from 'hooks/useSetQuery';
import Seo from 'components/seo/Seo';
import separator from 'hooks/separator';

// api/dashboard/regions
// api/dashboard/units
// api/dashboard/categories
// api/dashboard/products
// api/dashboard/companies
// api/dashboard/product/{ProductId}

function All() {
  const axios = useAxios();
  const { search } = useLocation();
  const setArrayQuery = useSetArrayQuery();
  const setQuery = useSetQuery();
  const [query] = useSearchParams();
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

  // Sidebar widgets — these used to be hardcoded placeholder markup with
  // fake images/names, never backed by real data.
  const services = useQuery({
    queryKey: ['/dashboard/products', 'services-widget'],
    queryFn: async () => {
      const res = await axios.get('/dashboard/products?type=services');
      return res?.data?.data?.data;
    },
  });
  const latest = useQuery({
    queryKey: ['/dashboard/lasts', 'latest-widget'],
    queryFn: async () => {
      const res = await axios.get('/dashboard/lasts');
      return res?.data?.data?.data;
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

  const typeLabel =
    type === 'manufacturer'
      ? 'Ishlab chiqaruvchi kompaniyalar'
      : type === 'services'
        ? 'Xizmat ko\'rsatuvchi kompaniyalar'
        : 'Barcha mahsulotlar va xizmatlar';

  return (
    <div>
      <Seo
        title={typeLabel}
        description={`UstaMarket.uz — ${typeLabel}. Sement, metall, g'isht, bo'yoq, qurilish xizmatlari. ${products?.data?.total ?? ''} ta e'lon. Yetkazib beruvchidan to'g'ridan-to'g'ri narxlar.`}
        path={type ? `/?type=${type}` : '/'}
        keywords={`${typeLabel}, qurilish materiallari, qurilish ashyolari, sement, metall, ishlab chiqaruvchi, xizmat ko'rsatuvchi, Toshkent, Andijon, O'zbekiston`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: typeLabel,
          url: `https://ustamarket.uz/${type ? `?type=${type}` : ''}`,
          isPartOf: { '@type': 'WebSite', name: 'UstaMarket', url: 'https://ustamarket.uz' },
          hasPart:
            (categories?.data || []).slice(0, 12).map((c) => ({
              '@type': 'Thing',
              name: c?.name,
            })) || [],
        }}
      />
      {/* <section className='flex items-center justify-center mb-8'>
        <div className='inline-flex p-1.5 bg-surface-container-high rounded-full'>
          <button className='px-6 py-2.5 rounded-full bg-white text-surface-tint font-bold shadow-sm text-sm'>
            🔥 Barchasi
          </button>
          <button className='px-6 py-2.5 rounded-full text-on-surface-variant font-medium text-sm hover:text-surface-tint transition-colors'>
            🧱 Mahsulot ishlab chiqaruvchi
          </button>
          <button className='px-6 py-2.5 rounded-full text-on-surface-variant font-medium text-sm hover:text-surface-tint transition-colors'>
            🛠 Xizmat ko‘rsatuvchi
          </button>
        </div>
      </section> */}
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
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.icon || '') }}
                  />
                </div>
                <div className='text-xs font-semibold text-center w-full uppercase tracking-wider text-on-surface-variant'>
                  {item?.name}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className='mb-12 relative h-80 rounded-xl overflow-hidden group'>
        <div className='absolute inset-0 bg-gradient-to-r from-surface-tint to-primary-container'></div>
        <img
          alt='Construction Promo'
          className='absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay'
          data-alt='Modern construction site with bright orange sunlight'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuD3jJs8-N6j3wbf-27jZqDtJWfhksEyd92ObdMzzSt2G8TU6dGhWdU5gbCZydzoc_sxfLPaZxq_w-EbFlAL8ENhp6ETPZU7GKcVjOqNnTH4MGtZLWhEwMLXcNnBo4_SnOvx5MH9ziqafaNN5jOsrDV84ohLM-r4WYZORKCDcw0M4u45M50cfZgRyqJkKa9hiIDA7Xoi86ax58A5k8d1tfL69bxDKxvUFMHOK0eFGXllOG2r1weIjh6K5wBYpfbmDM8glao2ftag6IU'
        />
        <div className='relative z-10 h-full flex flex-col justify-center px-12 text-white'>
          <span className='bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold w-fit mb-4'>
            MAVSUMIY CHEGIRMALAR
          </span>
          <h1 className='text-5xl font-black max-w-lg mb-6 leading-tight'>
            Qurilish ashyolariga 30% gacha foyda
          </h1>
          <button className='bg-white text-surface-tint px-8 py-4 rounded-full font-bold w-fit shadow-xl hover:scale-105 transition-transform'>
            Xaridni boshlash
          </button>
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
              ? 'Pastdan balandga'
              : query.get('sort_by_price') == 'desc'
                ? 'Balandan pastga'
                : 'Tartiblash'}
          </button>
          <button
            // Backend only reads `latest`, never `is_news` — this button
            // used to visibly "activate" but never change the result order.
            onClick={() => toggleQuery('latest')}
            className={`px-5 py-2 rounded-full transition-colors border ${query.get('latest') ? 'bg-primary-container text-on-primary-container border-primary-container hover:bg-primary-dim/80 hover:text-white' : 'border-outline-variant/30 hover:bg-surface-container-low'} text-sm font-semibold cursor-pointer`}
          >
            Yangi qo'shilganlar
          </button>
        </div>
        <p className='text-on-surface-variant text-sm font-medium'>
          {products?.data?.total} ta mahsulot topildi
        </p>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='md:col-span-8 space-y-8'>
          <div className='flex items-end justify-between'>
            <h2 className='text-3xl font-black tracking-tight'>
              Mashhur mahsulotlar
            </h2>
            <Link
              className='text-surface-tint font-bold text-sm hover:underline'
              to='/products'
            >
              Hammasini ko'rish
            </Link>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {products?.data?.data?.map((data) => (
                <ProductCard data={data} key={data?.id} />
              ))}
            </div>
          )}
        </div>
        <div className='md:col-span-4 space-y-8'>
          <div className='flex items-end justify-between'>
            <h2 className='text-2xl font-black tracking-tight'>Xizmatlar</h2>
          </div>
          {services?.isLoading ? (
            <div className='flex justify-center'>
              <LoaderPinwheel size={40} className='animate-spin' color='#3622F2' />
            </div>
          ) : services?.data?.length ? (
            services.data.slice(0, 2).map((item) => (
              <Link
                to={`/products/${item?.id}`}
                key={item?.id}
                className='block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-surface-tint/10'
              >
                <div className='h-40 relative bg-surface-container'>
                  <img
                    className='w-full h-full object-cover'
                    alt={item?.name}
                    src={`${import.meta.env.VITE_BASE_URL}${item?.image}`}
                  />
                </div>
                <div className='p-5 space-y-3'>
                  <h3 className='font-bold text-lg line-clamp-1'>{item?.name}</h3>
                  <p
                    className='text-sm text-on-surface-variant line-clamp-2'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item?.description || '', { ALLOWED_TAGS: [] }),
                    }}
                  />
                  <div className='flex items-center justify-between pt-2'>
                    <div className='flex items-center gap-2 min-w-0'>
                      <div className='w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0'>
                        <span className='material-symbols-outlined text-sm'>person</span>
                      </div>
                      <span className='text-xs font-bold truncate'>{item?.company?.name}</span>
                    </div>
                    <span className='text-surface-tint font-bold text-sm shrink-0'>
                      {separator(item?.price, item?.valute?.name)}
                    </span>
                  </div>
                  {!!item?.company?.phone && (
                    <a
                      href={`tel:${item.company.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className='w-full py-3 rounded-full border-2 border-surface-tint text-surface-tint font-bold hover:bg-surface-tint hover:text-white transition-all flex items-center justify-center gap-2'
                    >
                      <span className='material-symbols-outlined text-lg'>call</span>
                      Qo'ng'iroq qilish
                    </a>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className='text-sm text-on-surface-variant'>Hozircha xizmatlar yo'q</p>
          )}

          <div className='bg-surface-container-low rounded-lg p-6'>
            <h3 className='font-bold mb-4'>Yangi qo'shilganlar</h3>
            {latest?.isLoading ? (
              <div className='flex justify-center'>
                <LoaderPinwheel size={30} className='animate-spin' color='#3622F2' />
              </div>
            ) : latest?.data?.length ? (
              <div className='space-y-4'>
                {latest.data.slice(0, 4).map((item) => (
                  <Link
                    to={`/products/${item?.id}`}
                    key={item?.id}
                    className='flex gap-3 items-center'
                  >
                    <div className='w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden'>
                      <img
                        className='w-full h-full object-cover'
                        alt={item?.name}
                        src={`${import.meta.env.VITE_BASE_URL}${item?.image}`}
                      />
                    </div>
                    <div className='min-w-0'>
                      <h4 className='text-sm font-bold truncate w-40'>{item?.name}</h4>
                      <p className='text-xs text-surface-tint font-bold'>
                        {separator(item?.price, item?.valute?.name)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className='text-sm text-on-surface-variant'>Hozircha mahsulot yo'q</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(All);
