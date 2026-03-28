import {
  ChevronDown,
  Heart,
  HomeIcon,
  LocateIcon,
  MapPin,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet, NavLink, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Cookies from 'js-cookie';

import useAxios from 'hooks/useAxios';
import useSetQuery from 'hooks/useSetQuery';
import { Button } from 'components/ui/button';
import SelectRegion from '../dialogs/SelectRegion';

function Layout() {
  const { t } = useTranslation();
  const axios = useAxios();
  const [query] = useSearchParams();
  const setQuery = useSetQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() => {
    return Cookies.get('region') || '';
  });

  const regions = useQuery({
    queryKey: ['/dashboard/regions'],
    queryFn: async () => {
      const res = await axios.get('/dashboard/regions');
      return res?.data?.data;
    },
  });

  return (
    <div className='bg-surface font-body text-on-surface h-dvh'>
      <header className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm font-headline antialiased tracking-tight'>
        <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-8'>
          <NavLink
            to=''
            className='text-2xl font-black tracking-tighter text-[#3622F2] shrink-0'
          >
            UstaMarket
          </NavLink>
          <div className='grow max-w-2xl relative group'>
            <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline'>
              <span className='material-symbols-outlined'>
                <Search />
              </span>
            </div>
            <input
              className='w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-surface-tint/20 transition-all text-sm'
              placeholder='Mahsulot yoki xizmat qidirish'
              type='text'
            />
          </div>
          <nav className='hidden md:flex items-center gap-6'>
            <div
              className={`${!query.get('type') ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} cursor-pointer transition-colors font-bold border-b-2 pb-1`}
              onClick={() => setQuery('type', '')}
            >
              {t('menus.all')}
            </div>
            <div
              className={`${query.get('type') == 'manufacturer' ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} cursor-pointer transition-colors font-bold border-b-2 pb-1`}
              onClick={() => setQuery('type', 'manufacturer')}
            >
              Ishlab chiqaruvchi
            </div>
            <div
              className={`${query.get('type') == 'services' ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} cursor-pointer transition-colors font-bold border-b-2 pb-1`}
              onClick={() => setQuery('type', 'services')}
            >
              Xizmatlar
            </div>
          </nav>
          <div className='flex items-center gap-4'>
            <NavLink
              to='/lovely'
              className={`p-2 hover:bg-[#3622F2]/5 hover:[&_svg]:stroke-[#3622F2] [&_svg]:stroke-on-surface rounded-full transition-transform active:scale-95`}
            >
              {({ isActive }) => (
                <Heart
                  fill={isActive ? '#3622F2' : 'transparent'}
                  color={isActive ? '#3622F2' : 'inherit'}
                />
              )}
            </NavLink>
            <div className='relative'>
              <Button
                variant='outline'
                className='text-base text-ellipsis'
                onClick={() => setIsOpen(true)}
              >
                <MapPin />
                <span className='hidden lg:inline-block max-w-36 truncate'>
                  {regions?.data?.find((reg) => reg?.id == selectedValue)
                    ?.name || ''}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className='pt-24 pb-32 max-w-7xl mx-auto px-6 h-full'>
        <Outlet />
      </main>
      <nav className='md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-4 pb-6 bg-white/80 backdrop-blur-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)] rounded-t-[3rem] border-t border-slate-100 font-label text-[11px] font-semibold uppercase tracking-wider'>
        <NavLink
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${isActive ? 'bg-[#3622F2] shadow-lg shadow-[#3622F2]/30 mb-4' : ''} text-gray-700 rounded-full p-3`
          }
          to='/'
        >
          {({ isActive }) => (
            <>
              <HomeIcon color={isActive ? 'white' : '#364153'} />
              {!isActive && <span className='mt-1'>Asosiy</span>}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${isActive ? 'bg-[#3622F2] shadow-lg shadow-[#3622F2]/30 mb-4' : ''} text-gray-700 rounded-full p-3`
          }
          to='/lovely'
        >
          {({ isActive }) => (
            <>
              <Heart color={isActive ? 'white' : '#364153'} />
              {!isActive && <span className='mt-1'>Sevimlilar</span>}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${isActive ? 'bg-[#3622F2] shadow-lg shadow-[#3622F2]/30 mb-4' : ''} text-gray-700 rounded-full p-3`
          }
          to='/shopping'
        >
          {({ isActive }) => (
            <>
              <ShoppingCart color={isActive ? 'white' : '#364153'} />
              {!isActive && <span className='mt-1'>Savat</span>}
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${isActive ? 'bg-[#3622F2] shadow-lg shadow-[#3622F2]/30 mb-4' : ''} text-gray-700 rounded-full p-3`
          }
          to='/profile'
        >
          {({ isActive }) => (
            <>
              <User color={isActive ? 'white' : '#364153'} />
              {!isActive && <span className='mt-1'>Profil</span>}
            </>
          )}
        </NavLink>
      </nav>
      <button className='hidden md:flex fixed bottom-8 right-8 w-16 h-16 bg-surface-tint text-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-40'>
        <span className='material-symbols-outlined text-3xl'>chat</span>
      </button>
      <SelectRegion
        open={isOpen}
        setOpen={setIsOpen}
        setSelectedRegion={setSelectedValue}
        selectedRegion={selectedValue}
        regions={regions}
      />
    </div>
  );
}

export default Layout;
