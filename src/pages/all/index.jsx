import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import ProductCard from '../../components/cards/ProductCard';
import { LoaderPinwheel } from 'lucide-react';
import useSetArrayQuery from 'hooks/useSetArrayQuery';
import hasQuery from 'hooks/hasQuery';

// api/dashboard/regions
// api/dashboard/units
// api/dashboard/categories
// api/dashboard/products
// api/dashboard/companies
// api/dashboard/product/{ProductId}

function All() {
  const axios = useAxios();
  const { search } = useLocation();
  const setQuery = useSetArrayQuery();
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

  return (
    <div>
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
                onClick={() => setQuery('category_ids', item?.id)}
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
            <span className='material-symbols-outlined text-lg'>
              filter_list
            </span>{' '}
            Saralash
          </button>
          <button className='px-5 py-2 rounded-full bg-surface-tint-container text-on-surface-tint-container text-sm font-semibold'>
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
          <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-surface-tint/10'>
            <div className='h-40 relative'>
              <img
                className='w-full h-full object-cover'
                data-alt='Electrician working on professional wiring box'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuDqAvmcxc8x_Ja6A3GV4sA7jxgUUxcbWPSQugIzXjjARYDmXvp8MVapjscOUkTF2BQMGbVb0C_E4oCx4v6jRtC-qXbR7SirMetiKeRQU9oB8z2cIQXe8wnFvr89fFzXA_3wbGQ2W8bpusskE3n4-ORknPLUxh7pC70FeZo0vxxRLuyt9Gj4ZOhVnuF4RisLgV8AF0GmlTmX5LUZVpmtcHJFdhNR23TvQmRZx8RxfyFqAfUmVIjD_EVmHR7J-LaSz4t0b7cNaL6CNH0'
              />
              <div className='absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                <span
                  className='material-symbols-outlined text-sm text-yellow-500'
                  style={{ fontVariationSettings: 'FILL 1' }}
                >
                  star
                </span>
                <span className='text-xs font-bold'>4.9</span>
              </div>
            </div>
            <div className='p-5 space-y-3'>
              <h3 className='font-bold text-lg'>Elektromontaj xizmatlari</h3>
              <p className='text-sm text-on-surface-variant line-clamp-2'>
                Xonadon va ofislarda to'liq elektr tarmog'ini tortish va montaj
                qilish.
              </p>
              <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-surface-container flex items-center justify-center'>
                    <span className='material-symbols-outlined text-sm'>
                      person
                    </span>
                  </div>
                  <span className='text-xs font-bold'>Azizbek Elektro</span>
                </div>
                <span className='text-surface-tint font-bold text-sm'>
                  Kelishiladi
                </span>
              </div>
              <button className='w-full py-3 rounded-full border-2 border-surface-tint text-surface-tint font-bold hover:bg-surface-tint hover:text-white transition-all flex items-center justify-center gap-2'>
                <span className='material-symbols-outlined text-lg'>call</span>
                Qo'ng'iroq qilish
              </button>
            </div>
          </div>

          <div className='bg-surface-container-low rounded-lg p-6'>
            <h3 className='font-bold mb-4'>Yangi qo'shilganlar</h3>
            <div className='space-y-4'>
              <div className='flex gap-3 items-center'>
                <div className='w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    data-alt='New blue color paint bucket'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuAZA-1MUbLRczgO2nhHUJWE9xYlqZVA6pHsWLJtKu1PPQu5DhezUbJ9shEtSc6ZkUwtwnA8MyKWTpBc-15TvCw2sMAaPoijcCIH2ic_QjHik1XInBvRo3nKZlnIItuO7rTGuIFzQckS7LLIBQK_ht6Ytu_SA4sBtXwWQPM6kl7dKi_FZ2U98vDiMfZ4CvszXv3_A13tlxYXxmsSowkr-crAMBzl5jIcEtkeJTQBwCNdKJArT0zcBqzmlXVcsM1TcdA5chDId34KE3E'
                  />
                </div>
                <div>
                  <h4 className='text-sm font-bold truncate w-40'>
                    Fasad bo'yog'i "Akryl"
                  </h4>
                  <p className='text-xs text-surface-tint font-bold'>
                    245,000 UZS
                  </p>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-12 h-12 rounded-lg bg-white shrink-0 overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    data-alt='Industrial metal drill set'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuDc4t08IHByR58kQkPMDHSN_k5_F55isZWncCgn3Xv4ozgDu2GlEFEXS2mSxSOcSQj6keM98VudRO2HvsdndsOS1HoyuiSQcPI3KxLp0EoD68nBrJ_kZlap3dP31WM4eTUuO2VeSQI5AUHZX36UPX0BI4SM9kUl_Gg-6EFi5ehojd8Vo-QdcK1xeSF8gu0L0ZU8IfaEK76kjTUHSvecsY-xfPdQoCcYt31Sh9ht8grRTyH3iwIgftbUjZNii-IEWru9Q31hx2YlUpw'
                  />
                </div>
                <div>
                  <h4 className='text-sm font-bold truncate w-40'>
                    Professional Drel to'plami
                  </h4>
                  <p className='text-xs text-surface-tint font-bold'>
                    1,200,000 UZS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(All);
