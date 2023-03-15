import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper';

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <>
      <Swiper
        effect={'fade'}
        pagination={pagination}
        autoplay={{
          delay: 25000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/image/banner/01_banner_1920x965.png" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/02_banner_1920x965.png" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/03_banner_1920x965.png" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/04_banner_1920x965.png" width="10%" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

{
  /* <Swiper
        effect={'fade'}
        pagination={pagination}
        autoplay={{
          delay: 25000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/image/banner/cat01.jpg" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/cat02.jpg" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/cat01.jpg" width="10%" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/banner/cat02.jpg" width="10%" />
        </SwiperSlide>
      </Swiper> */
}
