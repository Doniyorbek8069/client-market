import { memo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useAxios from 'hooks/useAxios';
import useSetQuery from 'hooks/useSetQuery';
import ProductCard from 'components/cards/ProductCard';
import {
  BookHeart,
  Globe,
  ListFilter,
  LoaderPinwheel,
  Phone,
  SendHorizontal,
} from 'lucide-react';
// dashboard/company

function Company() {
  const axios = useAxios();
  const { id } = useParams();
  const setQuery = useSetQuery();
  const { search } = useLocation();
  const [query] = useSearchParams();

  const type = query.get('type');

  const company = useQuery({
    queryKey: ['/dashboard/company', search, id],
    queryFn: async () => {
      const res = await axios.get(`/dashboard/company/${id}${search}`);
      return res?.data?.data;
    },
    placeholderData: keepPreviousData,
  });

  const categories = useQuery({
    queryKey: ['/dashboard/categories', type],
    queryFn: async () => {
      const res = await axios.get(
        `/dashboard/categories${type ? '?type=' + type : ''}`,
      );
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
  console.log(company.data, company?.isFetching);
  return (
    <div>
      <main className='min-h-screen'>
        {/* <!-- New Sub-Header Navigation --> */}
        <div className='bg-white border-b border-surface-container shadow-sm sticky top-20 z-40'>
          <div className='mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between py-2 gap-4'>
            <div className='flex items-center gap-4'>
              <img
                alt='Company Logo'
                className='w-10 h-10 rounded-full border border-surface-variant object-cover'
                src={`${import.meta.env.VITE_BASE_URL}${company?.data?.image}`}
              />
              <div>
                <h2 className="text-on-surface font-bold font-['Manrope'] text-sm leading-none">
                  {company?.data?.name}
                </h2>
                {/* <p className="font-['Manrope'] font-medium text-[10px] text-slate-500">
                  companiya
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto flex flex-col gap-0'>
          {/* <!-- Main Content Area --> */}
          <section className='flex-1 py-8 bg-surface'>
            {/* <!-- Profile Header Section --> */}
            <div className='mb-12'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
                <div className='space-y-4'>
                  <div className='inline-flex items-center px-3 py-1 bg-secondary-container/20 text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase'>
                    {company?.data?.type_detail?.name}
                  </div>
                  <h1 className='text-5xl md:text-6xl font-black font-headline text-on-surface tracking-tighter leading-tight'>
                    {company?.data?.name}
                  </h1>
                  <div className='flex flex-wrap items-center gap-6 text-on-surface-variant'>
                    {!!company?.data?.phone && (
                      <div className='flex items-center gap-2'>
                        <Phone size={17} />
                        <NavLink
                          reloadDocument
                          to={`tel:${company?.data?.phone}`}
                          className='text-sm font-medium'
                        >
                          {company?.data?.phone}
                        </NavLink>
                      </div>
                    )}
                    {!!company?.data?.telegram && (
                      <div className='flex items-center gap-2'>
                        <SendHorizontal size={17} />
                        <NavLink
                          to={`${company?.data?.telegram?.startsWith('https') ? '' : 'https://t.me/'}${company?.data?.telegram}`}
                          target='_blank'
                          className='text-sm font-medium'
                        >
                          {company?.data?.telegram?.split('/')?.at(-1)}
                        </NavLink>
                      </div>
                    )}
                    {!!company?.data?.telegram && (
                      <div className='flex items-center gap-2'>
                        <BookHeart size={15} />
                        <NavLink
                          target='_blank'
                          className='text-sm font-medium'
                          to={`${company?.data?.telegram?.startsWith('https') ? '' : 'https://www.instagram.com/'}${company?.data?.instagram}`}
                        >
                          {company?.data?.instagram?.split('/')?.at(-1)}
                        </NavLink>
                      </div>
                    )}
                    {!!company?.data?.website && (
                      <div className='flex items-center gap-2'>
                        <Globe size={17} />
                        <NavLink
                          target='_blank'
                          to={company?.data?.website}
                          className='text-sm font-medium'
                        >
                          {company?.data?.website}
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex gap-4'>
                  <NavLink reloadDocument to={`tel:${company?.data?.phone}`}>
                    <button className='flex-1 md:flex-none px-8 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform'>
                      Bog'lanish
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
            <section className='flex flex-wrap items-center justify-between gap-4 mb-8'>
              <div className='flex grow gap-3 overflow-x-auto hide-scrollbar'>
                <button className='px-5 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-low transition-colors'>
                  <ListFilter />
                  Saralash
                </button>
                <Select
                  onValueChange={(value) => setQuery('category_id', value)}
                  defaultValue={query.get('category_id')}
                  className='w-full max-w-48'
                >
                  <SelectTrigger
                    size={38}
                    className='w-full max-w-48 px-5 py-2 rounded-full transition-colors border border-outline-variant/30 hover:bg-surface-container-low text-sm font-semibold cursor-pointer'
                  >
                    <SelectValue
                      placeholder='Katogoriya'
                      value={query.get('category_id')}
                    >
                      {categories?.data
                        ?.filter((cat) => cat?.id == query.get('category_id'))
                        ?.map((cat) => cat?.name)
                        ?.at(0) || 'Kategoriyalar'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Kategoriyalar</SelectLabel>
                      <SelectItem
                        value=''
                        className='text-muted-foreground italic'
                      >
                        Tanlovni bekor qilish
                      </SelectItem>
                      {categories?.data?.map((category) => (
                        <SelectItem value={category?.id} key={category?.id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
            </section>
            <section className='grid grid-cols-1 gap-6'>
              <div className='md:col-span-8 space-y-8'>
                <div className='flex items-end justify-between'>
                  <h2 className='text-3xl font-black tracking-tight'>
                    Kompaniya mahsulotlari
                  </h2>
                </div>
                {company?.isFetching ? (
                  <div className='flex justify-center'>
                    <LoaderPinwheel
                      size={55}
                      className='animate-spin'
                      color='#3622F2'
                    />
                  </div>
                ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {company?.data?.products?.map((data) => (
                      <ProductCard data={data} key={data?.id} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}

export default memo(Company);
