import { Heart, HomeIcon, Search, ShoppingCart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet, NavLink } from 'react-router-dom';

function Layout() {
  const { t } = useTranslation();
  return (
    <div className='bg-surface font-body text-on-surface h-dvh'>
      <header className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm font-headline antialiased tracking-tight'>
        <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-8'>
          <div className='text-2xl font-black tracking-tighter text-[#3622F2] shrink-0'>
            UstaMarket
          </div>
          <div className='grow max-w-2xl relative group'>
            <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline'>
              <span className='material-symbols-outlined'>
                <Search />
              </span>
            </div>
            <input
              className='w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm'
              placeholder='Mahsulot yoki xizmat qidirish'
              type='text'
            />
          </div>
          <nav className='hidden md:flex items-center gap-6'>
            <NavLink
              className={({ isActive, isPending }) =>
                `${isPending ? 'bg-gray-100' : isActive ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} transition-colors font-bold border-b-2 pb-1`
              }
              to='/'
            >
              {t('menus.all')}
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                `${isPending ? 'bg-gray-100' : isActive ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} transition-colors font-bold border-b-2 pb-1`
              }
              to='/manufacturer'
            >
              Ishlab chiqaruvchi
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                `${isPending ? 'bg-gray-100' : isActive ? 'text-[#3622F2] border-[#3622F2]' : 'text-slate-500 border-b-transparent hover:border-b-slate-500'} transition-colors font-bold border-b-2 pb-1`
              }
              to='/services'
            >
              Xizmatlar
            </NavLink>
          </nav>
          <div className='flex items-center gap-4'>
            <button className='p-2 text-on-surface hover:bg-[#3622F2]/5 rounded-full transition-transform active:scale-95'>
              <span className='material-symbols-outlined' data-icon='favorite'>
                favorite
              </span>
            </button>
            <button className='p-2 text-on-surface hover:bg-[#3622F2]/5 rounded-full transition-transform active:scale-95 relative'>
              <span
                className='material-symbols-outlined'
                data-icon='shopping_cart'
              >
                shopping_cart
              </span>
              <span className='absolute top-1 right-1 w-2 h-2 bg-error rounded-full'></span>
            </button>
            <button className='p-2 text-on-surface hover:bg-[#3622F2]/5 rounded-full transition-transform active:scale-95'>
              <span
                className='material-symbols-outlined'
                data-icon='account_circle'
              >
                account_circle
              </span>
            </button>
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
      <button className='hidden md:flex fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-40'>
        <span className='material-symbols-outlined text-3xl'>chat</span>
      </button>
    </div>
  );
}

export default Layout;
