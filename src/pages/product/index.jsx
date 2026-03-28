import { memo } from 'react';
import {
  LoaderPinwheel,
  BadgeCheck,
  Store,
  Send,
  BookHeart,
  Link as LinkLucide,
  Phone,
} from 'lucide-react';
// import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import useAxios from 'hooks/useAxios';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import separator from '../../hooks/separator';

export function CarouselDemo({ images }) {
  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {images?.map((img, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <img src={img} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-1' />
      <CarouselNext className='right-1' />
    </Carousel>
  );
}

const Product = () => {
  // const { t } = useTranslation();
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
  const images = data?.images?.map((img) => baseUrl + img);
  if (data?.image) images?.unshift(baseUrl + data?.image);

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
              <CarouselDemo images={images} />
            </div>
          </div>

          {/* ==================== MA'LUMOTLAR QISMI ==================== */}
          <div className='space-y-6'>
            <h1 className='text-3xl font-semibold leading-tight'>
              {data?.name}
            </h1>

            {/* Price */}
            <div>
              <div className='flex items-center gap-3'>
                <span className='text-4xl font-bold text-purple-700'>
                  {separator(data?.price, data?.valute?.name)}
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
            <div className='flex flex-col'>
              <span
                className={`text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded`}
              >
                Sertifikat:
                <span
                  className={`text-xs font-bold flex gap-1 ${data?.is_certificated == 1 ? 'text-surface-tint' : 'text-orange-400'} px-2 py-0.5 rounded`}
                >
                  {data?.is_certificated == 1 ? (
                    <BadgeCheck size={15} color='#2291f2' />
                  ) : (
                    ''
                  )}
                  {data?.is_certificated == 1 ? 'Mavjud' : 'Mavjud emas'}
                </span>
              </span>
              <span
                className={`text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded`}
              >
                Nasiya savdo:
                <span
                  className={`text-xs font-bold flex gap-1 ${data?.is_debtable == 1 ? 'text-surface-tint' : 'text-orange-400'} px-2 py-0.5 rounded`}
                >
                  {data?.is_debtable == 1 ? (
                    <BadgeCheck size={15} color='#2291f2' />
                  ) : (
                    ''
                  )}
                  {data?.is_debtable == 1 ? 'Mavjud' : 'Mavjud emas'}
                </span>
              </span>
              <span
                className={`text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded`}
              >
                Narx kelishish:
                <span
                  className={`text-xs font-bold flex gap-1 ${data?.is_changeable == 1 ? 'text-surface-tint' : 'text-orange-400'} px-2 py-0.5 rounded`}
                >
                  {data?.is_changeable == 1 ? (
                    <BadgeCheck size={15} color='#2291f2' />
                  ) : (
                    ''
                  )}
                  {data?.is_changeable == 1 ? 'Bor' : "Yo'q"}
                </span>
              </span>
              <span
                className={`text-xs font-bold flex items-center gap-1  px-2 py-0.5 rounded`}
              >
                QQS:
                <span
                  className={`text-xs font-bold flex gap-1 ${data?.have_nds == 1 ? 'text-surface-tint' : 'text-orange-400'} px-2 py-0.5 rounded`}
                >
                  {data?.have_nds == 1 ? (
                    <BadgeCheck size={15} color='#2291f2' />
                  ) : (
                    ''
                  )}
                  {data?.have_nds == 1 ? 'Bor' : "Yo'q"}
                </span>
              </span>
            </div>

            {/* Seller */}
            <div className='border-t pt-6'>
              <p className='text-sm text-gray-500 mb-2'>Sotuvchi</p>
              <div>
                <p className='font-medium mb-5 flex items-center text-blue-500 gap-2 text-[20px]'>
                  <Store size={20} color='#0ea825' />
                  {data?.company?.name}

                  <button className='ml-auto text-purple-600 text-sm font-medium'>
                    Do'konga →
                  </button>
                </p>
                {!!data?.company?.phone && (
                  <p className='text-sm text-blue-600 flex items-center gap-2 mb-1'>
                    <Phone size={15} />
                    <Link
                      reloadDocument
                      className='text-blue-500'
                      to={`tel:${data?.company?.phone}`}
                    >
                      {data?.company?.phone}
                    </Link>
                  </p>
                )}
                {!!data?.company?.telegram && (
                  <p className='text-sm text-blue-600 flex items-center gap-2 mb-1'>
                    <Send size={15} />
                    <Link
                      target='_blank'
                      className='text-blue-500'
                      to={`https://t.me/${data?.company?.telegram}`}
                    >
                      {data?.company?.telegram}
                    </Link>
                  </p>
                )}
                {!!data?.company?.instagram && (
                  <p className='text-sm text-red-600 flex items-center gap-2 mb-1'>
                    <BookHeart size={15} />
                    <Link
                      target='_blank'
                      className='text-blue-500'
                      to={`https://www.instagram.com/${data?.company?.instagram}`}
                    >
                      {data?.company?.instagram}
                    </Link>
                  </p>
                )}
                {!!data?.company?.website && (
                  <p className='text-sm text-blue-600 flex items-center gap-2 mb-1'>
                    <LinkLucide size={15} />
                    <Link
                      target='_blank'
                      className='text-blue-500'
                      to={data?.company?.website}
                    >
                      vebsayt
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Sertifikatlar:</CardTitle>
              </CardHeader>
              <CardContent className='text-sm text-muted-foreground flex flex-col gap-2'>
                {data?.certificates?.map((cer) => {
                  const fileUrl = import.meta.env.VITE_BASE_URL + cer?.file;
                  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(fileUrl);
                  const isPDF = /\.pdf$/i.test(fileUrl);
                  const isDoc = /\.(doc|docx)$/i.test(fileUrl);
                  return (
                    <div
                      key={cer?.id}
                      className='flex items-center gap-4 p-4 border rounded-lg bg-slate-50 w-full max-w-md'
                    >
                      {/* 1. Agar rasm bo'lsa - Preview ko'rsatamiz */}
                      {isImage && (
                        <img
                          src={fileUrl}
                          alt='Preview'
                          className='w-16 h-16 object-cover rounded-md border'
                        />
                      )}

                      {/* 2. Agar hujjat bo'lsa - Ikonka ko'rsatamiz */}
                      {(isPDF || isDoc) && (
                        <div className='bg-blue-100 p-3 rounded-md text-blue-600'>
                          <FileText size={32} />
                        </div>
                      )}

                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium truncate'>
                          {cer?.name || 'Hujjat nomi'}
                        </p>
                        <p className='text-xs text-muted-foreground uppercase'>
                          {fileUrl.split('.').pop()} fayl
                        </p>
                      </div>

                      {/* 3. Ko'rish yoki Yuklab olish tugmasi */}
                      <Button variant='outline' size='sm' asChild>
                        <a
                          href={fileUrl}
                          target='_blank'
                          className='flex items-center'
                          rel='noreferrer'
                        >
                          <ExternalLink className='h-4 w-4 mr-2' />
                          Ochish
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description & Tabs */}
        <div className='mt-16'>
          <Tabs defaultValue='overview' className='w-full'>
            <TabsList variant='line'>
              <TabsTrigger value='overview'>Tavsif</TabsTrigger>
              <TabsTrigger value='certificate'>Sertifikat</TabsTrigger>
            </TabsList>
            <TabsContent value='overview'>
              <Card>
                <CardHeader>
                  <CardTitle>Mahsulot haqida</CardTitle>
                  <CardDescription>
                    <div className='prose max-w-none text-gray-700 leading-relaxed'>
                      <div
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                      />
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value='certificate'>
              <Card>
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription>Sertifikatlar</CardDescription>
                </CardHeader>
                <CardContent className='text-sm text-muted-foreground flex flex-col gap-2'>
                  {data?.certificates?.map((cer) => {
                    const fileUrl = import.meta.env.VITE_BASE_URL + cer?.file;
                    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(fileUrl);
                    const isPDF = /\.pdf$/i.test(fileUrl);
                    const isDoc = /\.(doc|docx)$/i.test(fileUrl);
                    return (
                      <div
                        key={cer?.id}
                        className='flex items-center gap-4 p-4 border rounded-lg bg-slate-50 w-full max-w-md'
                      >
                        {/* 1. Agar rasm bo'lsa - Preview ko'rsatamiz */}
                        {isImage && (
                          <img
                            src={fileUrl}
                            alt='Preview'
                            className='w-16 h-16 object-cover rounded-md border'
                          />
                        )}

                        {/* 2. Agar hujjat bo'lsa - Ikonka ko'rsatamiz */}
                        {(isPDF || isDoc) && (
                          <div className='bg-blue-100 p-3 rounded-md text-blue-600'>
                            <FileText size={32} />
                          </div>
                        )}

                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium truncate'>
                            {cer?.name || 'Hujjat nomi'}
                          </p>
                          <p className='text-xs text-muted-foreground uppercase'>
                            {fileUrl.split('.').pop()} fayl
                          </p>
                        </div>

                        {/* 3. Ko'rish yoki Yuklab olish tugmasi */}
                        <Button variant='outline' size='sm' asChild>
                          <a
                            href={fileUrl}
                            target='_blank'
                            className='flex items-center'
                            rel='noreferrer'
                          >
                            <ExternalLink className='h-4 w-4 mr-2' />
                            Ochish
                          </a>
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
