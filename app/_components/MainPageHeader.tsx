'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import CircularProgress from './CirclueProgressBar';
import './CustomCalendar.css';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Ellipsis, Heart, User, Users } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainPageHeader() {
  // 북마크 상태 토글 - 아직 정상작동 x
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  // 오늘 날짜 할당
  const today = new Date();

  // 로그인 상태 토글
  const loginStatusHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='flex justify-center items-center gap-20 bg-gray-100 py-8 px-40'>
      {/* SWIPER */}
      <div className='w-[33.3125rem] h-[29.375rem] flex flex-col justify-center'>
        <h1 className='text-2xl font-bold mb-8'>내일 시작인 독서 모임</h1>
        <div className='flex-1'>
          <Swiper spaceBetween={10} slidesPerView={1}>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <SwiperSlide key={idx}>
                <div className='flex flex-row w-[32.625rem] h-[21.5625rem] border rounded-lg bg-white shadow-md'>
                  <div className='flex justify-center items-center bg-orange-300 rounded-lg w-[14.375rem] h-[21.5625rem]'>
                    이미지 영역
                  </div>
                  <div className='p-4'>
                    <h3 className='text-xl font-bold'>
                      독서 모임 테스트 {idx + 1}
                    </h3>
                    <p className='text-sm text-gray-600 mt-6'>12월 04일 시작</p>
                    <div className='flex flex-col items-start gap-2 mt-20'>
                      <div className='flex flex-row gap-2 items-center'>
                        <Users className='w-[17px] h-[17px]' />
                        <span className='text-sm'>21명 / 50명</span>
                      </div>

                      <div className='flex flex-row'>
                        {[1, 2, 3, 4, 5, 6].slice(0, 4).map((_, idx) => (
                          <React.Fragment key={idx}>
                            {idx < 3 ? (
                              <div className='w-[2rem] h-[2rem] border-[0.925px] border-[#D1D5DB] bg-white rounded-full -mr-3 flex justify-center items-center'>
                                <User />
                              </div>
                            ) : (
                              <div className='w-[2rem] h-[2rem] border-[0.925px] border-[#D1D5DB] bg-[#D1D5DB] rounded-full -mr-3 flex justify-center items-center'>
                                <Ellipsis className='w-[1.5rem] h-[1.5rem]' />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className='flex items-center justify-between mt-10 gap-6'>
                      <Button className='w-[12.5rem]'>함께 읽기</Button>
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        aria-label='Bookmark'
                        className='text-lg'
                      >
                        {isBookmarked ? (
                          // 찜 기능 API 구현되면 연결예정
                          <Heart />
                        ) : (
                          <Heart className='bg-red-300' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* CALENDAR */}
      <div className='flex flex-col w-[28rem]'>
        {/* CALENDAR HEADER */}
        <div className='bg-gray-300 w-[28rem] h-[5.375rem] px-[1.875rem] flex flex-row justify-between items-center'>
          {isLogin ? (
            <>
              {/* 독서 진행률, 서적 이름, 상세페이지 주소등을 api가 준비되면 연결할 예정 */}
              <div className='flex flex-row gap-10 items-center'>
                <CircularProgress value={50} max={100} />
                <div>
                  <h3>지금 읽고 있는 책</h3>
                  <h4 className='font-bold'>책 이름</h4>
                </div>
              </div>
              <div>
                <button
                  onClick={() => loginStatusHandler()}
                  className='w-[6.3125rem] h-[2.75rem] bg-[#a0a0a0]'
                >
                  입장하기
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className='font-bold'>로그인 후</h3>
                <h4>독서달력을 채워보세요</h4>
              </div>
              <button
                onClick={() => loginStatusHandler()}
                className='w-[6.3125rem] h-[2.75rem] bg-[#a0a0a0]'
              >
                로그인 하기
              </button>
            </>
          )}
        </div>
        <Calendar
          locale='en-GB'
          formatShortWeekday={(_, date) => format(date, 'EEE')}
          formatMonthYear={(locale, date) =>
            date.toLocaleString(locale, { month: 'short', year: 'numeric' })
          }
          view='month'
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
          tileClassName={({ date, view }) =>
            view === 'month' && date.toDateString() === today.toDateString()
              ? 'highlight-today'
              : null
          }
        />
      </div>
    </div>
  );
}
