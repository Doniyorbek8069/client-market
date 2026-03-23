import { memo } from 'react';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className='bg-surface font-body text-on-surface'>
      <header className='fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm font-headline antialiased tracking-tight'>
        <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-8'>
          <div className='text-2xl font-black tracking-tighter text-[#3622F2] shrink-0'>
            UstaMarket
          </div>
          <div className='grow max-w-2xl relative group'>
            <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline'>
              <span className='material-symbols-outlined'>search</span>
            </div>
            <input
              className='w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm'
              placeholder='Mahsulot yoki xizmat qidirish'
              type='text'
            />
          </div>
          <nav className='hidden md:flex items-center gap-6'>
            <a
              className='text-[#3622F2] font-bold border-b-2 border-[#3622F2] pb-1'
              href='#'
            >
              Barchasi
            </a>
            <a
              className='text-slate-500 font-medium hover:text-[#3622F2] transition-colors'
              href='#'
            >
              Ishlab chiqaruvchi
            </a>
            <a
              className='text-slate-500 font-medium hover:text-[#3622F2] transition-colors'
              href='#'
            >
              Xizmatlar
            </a>
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
      <main className='pt-24 pb-32 max-w-7xl mx-auto px-6'>
        <section className='flex items-center justify-center mb-8'>
          <div className='inline-flex p-1.5 bg-surface-container-high rounded-full'>
            <button className='px-6 py-2.5 rounded-full bg-white text-primary font-bold shadow-sm text-sm'>
              🔥 Barchasi
            </button>
            <button className='px-6 py-2.5 rounded-full text-on-surface-variant font-medium text-sm hover:text-primary transition-colors'>
              🧱 Mahsulot ishlab chiqaruvchi
            </button>
            <button className='px-6 py-2.5 rounded-full text-on-surface-variant font-medium text-sm hover:text-primary transition-colors'>
              🛠 Xizmat ko‘rsatuvchi
            </button>
          </div>
        </section>
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
        <section className='mb-12 relative h-80 rounded-xl overflow-hidden group'>
          <div className='absolute inset-0 bg-gradient-to-r from-primary to-primary-container'></div>
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
            <button className='bg-white text-primary px-8 py-4 rounded-full font-bold w-fit shadow-xl hover:scale-105 transition-transform'>
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
            1,240 ta mahsulot topildi
          </p>
        </section>
        <section className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='md:col-span-8 space-y-8'>
            <div className='flex items-end justify-between'>
              <h2 className='text-3xl font-black tracking-tight'>
                Mashhur mahsulotlar
              </h2>
              <a
                className='text-primary font-bold text-sm hover:underline'
                href='#'
              >
                Hammasini ko'rish
              </a>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group'>
                <button className='absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-outline hover:text-error transition-colors'>
                  <span
                    className='material-symbols-outlined'
                    style={{ 'font-variation-settings': 'FILL 0' }}
                  >
                    favorite
                  </span>
                </button>
                <div className='aspect-square rounded-DEFAULT overflow-hidden bg-surface-container mb-4'>
                  <img
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    data-alt='Pallet of high quality gray cement bags'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuDgBNXszb6bDgV0xYEYWuMXL2MBGM-droIYXPQPy5RuM7Z82rMEStSuMh3t6fwwgwpJ7x_VSR3s7ha3wZDOFQnO8Y_3Ln2XHu4rI79Gdse6cS6HVI1VGm4Yw-mk8DTLKXK4jJx7xOW9D2e4lqq-JpgkerCAQMEZ7eIY3k3OPxBJ6fwPiGZPy6XScQjCaewR9Yyf8iYlC8h9uQWvlyLQRW5rDbpIne86W-lIYgOFMiPFh7pbci0dZw4MeHIo4q00wd3o-wlfufzzDWg'
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex gap-1'>
                    <span className='bg-success/10 text-xs font-bold text-green-600 px-2 py-0.5 rounded'>
                      Sertifikatlangan
                    </span>
                    <span className='bg-primary/10 text-xs font-bold text-primary px-2 py-0.5 rounded'>
                      QQS bilan
                    </span>
                  </div>
                  <h3 className='font-bold text-lg leading-tight'>
                    M-500 Yuqori sifatli Sement
                  </h3>
                  <p className='text-on-surface-variant text-xs font-medium'>
                    EuroBuild Group MChJ
                  </p>
                  <div className='flex items-baseline gap-2 pt-2'>
                    <span className='text-xl font-black text-on-surface'>
                      65,000 UZS
                    </span>
                    <span className='text-xs text-on-surface-variant'>
                      / qop
                    </span>
                  </div>
                  <div className='text-[10px] text-outline font-bold uppercase tracking-widest pt-1'>
                    Min: 100 dona
                  </div>
                  <button className='w-full mt-4 bg-primary text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20'>
                    <span className='material-symbols-outlined text-lg'>
                      shopping_bag
                    </span>
                    Savatga qo'shish
                  </button>
                </div>
              </div>
              <div className='bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group'>
                <button className='absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-outline hover:text-error transition-colors'>
                  <span
                    className='material-symbols-outlined'
                    style={{ 'font-variation-settings': 'FILL 0' }}
                  >
                    favorite
                  </span>
                </button>
                <div className='aspect-square rounded-DEFAULT overflow-hidden bg-surface-container mb-4'>
                  <img
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    data-alt='Stack of red construction bricks'
                    src='https://lh3.googleusercontent.com/aida-public/AB6AXuD1sdRuD10l5Mbz18KZyzBCXUkbIhzBBcNelr5YtkZZIOsXXrTFc1SE5-5vqVLWCTU8Ri04tOzGVQfYp6s-rnBJ8gFpJTj44hvoHVUi7zYZ_9PzlI7MDNqPucP-eROYXHk0uR9uJKFxsvAO7_7Qmbl-1Kq8IeY3ndVLho8teI-_IA3xLg9pyjE_OWJDZAac7GxkYEu7gR3UDekUlNUpppu3BMvxSPgmcBqBPXhFJsk9KSTDBHzdK7yct5waF9Yh0rIvx3OoxZaBWcA'
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex gap-1'>
                    <span className='bg-tertiary-container/30 text-xs font-bold text-tertiary px-2 py-0.5 rounded'>
                      Muddatli to'lov
                    </span>
                  </div>
                  <h3 className='font-bold text-lg leading-tight'>
                    Pishgan g'isht (1-nav)
                  </h3>
                  <p className='text-on-surface-variant text-xs font-medium'>
                    Buxoro G'isht Zavodi
                  </p>
                  <div className='flex items-baseline gap-2 pt-2'>
                    <span className='text-xl font-black text-on-surface'>
                      1,850 UZS
                    </span>
                    <span className='text-xs text-on-surface-variant'>
                      / dona
                    </span>
                  </div>
                  <div className='text-[10px] text-outline font-bold uppercase tracking-widest pt-1'>
                    Min: 5000 dona
                  </div>
                  <button className='w-full mt-4 bg-primary text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20'>
                    <span className='material-symbols-outlined text-lg'>
                      shopping_bag
                    </span>
                    Savatga qo'shish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-4 space-y-8'>
            <div className='flex items-end justify-between'>
              <h2 className='text-2xl font-black tracking-tight'>Xizmatlar</h2>
            </div>
            <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary/10'>
              <div className='h-40 relative'>
                <img
                  className='w-full h-full object-cover'
                  data-alt='Electrician working on professional wiring box'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDqAvmcxc8x_Ja6A3GV4sA7jxgUUxcbWPSQugIzXjjARYDmXvp8MVapjscOUkTF2BQMGbVb0C_E4oCx4v6jRtC-qXbR7SirMetiKeRQU9oB8z2cIQXe8wnFvr89fFzXA_3wbGQ2W8bpusskE3n4-ORknPLUxh7pC70FeZo0vxxRLuyt9Gj4ZOhVnuF4RisLgV8AF0GmlTmX5LUZVpmtcHJFdhNR23TvQmRZx8RxfyFqAfUmVIjD_EVmHR7J-LaSz4t0b7cNaL6CNH0'
                />
                <div className='absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm'>
                  <span
                    className='material-symbols-outlined text-sm text-yellow-500'
                    style={{ 'font-variation-settings': 'FILL 1' }}
                  >
                    star
                  </span>
                  <span className='text-xs font-bold'>4.9</span>
                </div>
              </div>
              <div className='p-5 space-y-3'>
                <h3 className='font-bold text-lg'>Elektromontaj xizmatlari</h3>
                <p className='text-sm text-on-surface-variant line-clamp-2'>
                  Xonadon va ofislarda to'liq elektr tarmog'ini tortish va
                  montaj qilish.
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
                  <span className='text-primary font-bold text-sm'>
                    Kelishiladi
                  </span>
                </div>
                <button className='w-full py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2'>
                  <span className='material-symbols-outlined text-lg'>
                    call
                  </span>
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
                    <p className='text-xs text-primary font-bold'>
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
                    <p className='text-xs text-primary font-bold'>
                      1,200,000 UZS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <nav className='md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-4 pb-6 bg-white/80 backdrop-blur-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)] rounded-t-[3rem] border-t border-slate-100 font-label text-[11px] font-semibold uppercase tracking-wider'>
        <a
          className='flex flex-col items-center justify-center bg-[#3622F2] text-white rounded-full p-3 mb-2 shadow-lg shadow-[#3622F2]/30'
          href='#'
        >
          <span
            className='material-symbols-outlined'
            data-icon='home'
            style={{ 'font-variation-settings': 'FILL 1' }}
          >
            home
          </span>
          <span className='mt-1'>Asosiy</span>
        </a>
        <a
          className='flex flex-col items-center justify-center text-slate-400 p-3 hover:text-[#3622F2] transition-all'
          href='#'
        >
          <span className='material-symbols-outlined' data-icon='favorite'>
            favorite
          </span>
          <span className='mt-1'>Sevimlilar</span>
        </a>
        <a
          className='flex flex-col items-center justify-center text-slate-400 p-3 hover:text-[#3622F2] transition-all'
          href='#'
        >
          <span className='material-symbols-outlined' data-icon='shopping_cart'>
            shopping_cart
          </span>
          <span className='mt-1'>Savat</span>
        </a>
        <a
          className='flex flex-col items-center justify-center text-slate-400 p-3 hover:text-[#3622F2] transition-all'
          href='#'
        >
          <span className='material-symbols-outlined' data-icon='person'>
            person
          </span>
          <span className='mt-1'>Profil</span>
        </a>
      </nav>
      <button className='hidden md:flex fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-40'>
        <span className='material-symbols-outlined text-3xl'>chat</span>
      </button>
    </div>
  );
}

export default memo(App);
