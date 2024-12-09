'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import CustomDropdown from './CustomDropdown';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown, RotateCw } from 'lucide-react';

export default function MainPageBody() {
  // 더미 데이터
  const bestBooks = [
    { title: 'title1', content: 'content1', author: 'author1' },
    { title: 'title2', content: 'content2', author: 'author2' },
    { title: 'title3', content: 'content3', author: 'author3' },
    { title: 'title4', content: 'content4', author: 'author4' },
    { title: 'title5', content: 'content5', author: 'author5' },
  ];

  // 생성된 모임 목록
  // 장소, 서적, 모집마감일, 모임시작일, 모임종료일, 최소인원, 목표 독서시간 + ?
  // 카드에서 보여줄 데이터 : ?
  // 무한스크롤 미적용 -> 적용예정
  const meetings = [
    {
      title: 'meeting-title1',
      endDate: '2024-12-07',
      gatheringDate: '2024-12-05',
      recruiting: true,
    },
    {
      title: 'meeting-title2',
      endDate: '2024-12-08',
      gatheringDate: '2024-12-05',
      recruiting: false,
    },
    {
      title: 'meeting-title3',
      endDate: '2024-12-09',
      gatheringDate: '2024-12-05',
      recruiting: true,
    },
    {
      title: 'meeting-title4',
      endDate: '2024-12-12',
      gatheringDate: '2024-12-10',
      recruiting: false,
    },
    {
      title: 'meeting-title5',
      endDate: '2024-12-15',
      gatheringDate: '2024-12-10',
      recruiting: true,
    },
    {
      title: 'meeting-title6',
      endDate: '2024-12-22',
      gatheringDate: '2024-12-20',
      recruiting: true,
    },
    {
      title: 'meeting-title7',
      endDate: '2024-12-23',
      gatheringDate: '2024-12-20',
      recruiting: false,
    },
    {
      title: 'meeting-title8',
      endDate: '2024-12-25',
      gatheringDate: '2024-12-20',
      recruiting: true,
    },
  ];

  // 설정된 시작일 상태
  const [startDate, setStartDate] = useState<Date | null>(null);

  // 모집중 토글 상태
  const [recruitingOnly, setRecruitingOnly] = useState<boolean>(false);

  // 목표 독서시간 상태
  const [targetTime, setTargetTime] = useState<string | null>(null);

  // 모집중 토글 핸들러
  const switchToggleHandler = (checked: boolean) => {
    console.log(checked);
    setRecruitingOnly(checked);
  };

  // 필터링 기능 초기화 핸들러
  const resetFilterFuncHandler = () => {
    if (startDate) setStartDate(null);
    if (recruitingOnly) setRecruitingOnly(false);
    if (targetTime) setTargetTime(null);
  };

  // 오늘 날짜 할당
  const today = new Date();

  return (
    <>
      <div className='mt-20 h-[1500px] flex flex-col items-center justify-start'>
        <div className='flex flex-col items-center gap-4 mb-20'>
          <h2 className='text-4xl font-bold mb-4'>모여서 읽고 싶은 지금</h2>
          <Input
            className='w-[32.5625rem] h-[3.5rem]'
            placeholder='원하는 책과 관련된 모임을 검색해보세요!'
          />
        </div>
        <div className='w-[70rem] h-[30rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>Best 서적</h2>
            <h6 className='text-md text-gray-300'>모임을 많이 만든 책</h6>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4 '>
            {bestBooks.map((book, idx) => (
              <div
                key={idx}
                className='h-[18rem] border rounded-lg shadow-md p-4 hover:shadow-lg bg-white'
              >
                <h3 className='text-lg font-semibold'>{book.title}</h3>
                <p className='text-sm text-gray-600'>{book.content}</p>
                <p className='text-sm text-gray-400 mt-2'>by {book.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='w-[70rem]'>
          <div className='mb-4'>
            <h2 className='text-xl font-bold'>모임 목록</h2>
            <h6 className='text-md text-gray-300'>어디서든 독서를 시작해요</h6>
          </div>
          {/* FUNCTION PART */}
          <div className='flex flex-row items-center mb-2'>
            {/* 설정된 필터링 기능이 있으면 보여줌 */}
            {startDate || targetTime ? (
              <div
                className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-2 items-center font-bold'
                onClick={resetFilterFuncHandler}
              >
                초기화
                <RotateCw />
              </div>
            ) : (
              <></>
            )}
            {/* 시작일 선택 필터링 기능 */}
            <div className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-2 items-center font-bold'>
              <CustomDropdown
                trigger={
                  startDate ? startDate.toLocaleDateString() : '시작일 선택'
                }
                label='시작일 선택'
              >
                <Calendar
                  locale='en-GB'
                  formatShortWeekday={(_, date) => format(date, 'EEE')}
                  formatMonthYear={(locale, date) =>
                    date.toLocaleString(locale, {
                      month: 'short',
                      year: 'numeric',
                    })
                  }
                  view='month'
                  prev2Label={null}
                  next2Label={null}
                  showNeighboringMonth={false}
                  tileClassName={({ date }) => {
                    const isToday =
                      date.toDateString() === today.toDateString();
                    const isSelected =
                      startDate &&
                      date.toDateString() === startDate.toDateString();
                    return [
                      isToday ? 'highlight-today' : '',
                      isSelected ? 'selected-date' : '',
                    ].join(' ');
                  }}
                  onChange={(date) => {
                    setStartDate(date as Date);
                  }}
                  value={startDate}
                />
              </CustomDropdown>
              <CalendarIcon />
            </div>
            {/* 목표 독서 시간 필터링 기능 */}
            <div className='bg-gray-300 py-[5px] px-[10px] rounded-[30px] hover:bg-gray-400 duration-150 ml-2 flex flex-row gap-1 items-center font-bold'>
              <CustomDropdown
                trigger={targetTime ? targetTime : '목표 독서 시간'}
                items={['10분', '10분 ~ 30분', '30분 ~ 1시간', '1시간 이상']}
                onSelect={(value) => setTargetTime(value)}
              />
              <ChevronDown />
            </div>
            {/* 모집중만 보기 필터링 기능 */}
            <div className='py-[5px] px-[10px] flex items-center ml-2 gap-2'>
              <Label htmlFor='recruiting-only'>모집중만 보기</Label>
              <Switch
                id='recruiting only'
                onCheckedChange={(checked) => switchToggleHandler(checked)}
              />
            </div>
            {/* 기능 적용여부 테스트코드 */}
            <div className='bg-green-300'>
              선택된 날짜 :{' '}
              {startDate ? startDate.toLocaleDateString() : '없음'}
            </div>
            <div className='bg-purple-300'>
              목표 독서 시간 : {targetTime ? targetTime : '없음'}
            </div>
            <div className='bg-blue-300'>
              모집중-필터링 : {recruitingOnly ? '켜짐' : '꺼짐'}
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {meetings
              // '시작일이 선택'되어있으면 필터링 적용
              .filter((meeting) => {
                if (startDate) {
                  return new Date(meeting.gatheringDate) >= startDate;
                }
                return true;
              })
              // '모집중만 보기'가 켜져있으면 필터링 적용
              .filter((meeting) => {
                if (recruitingOnly) {
                  return meeting.recruiting == true;
                } else {
                  return meeting;
                }
              })
              .map((meeting, idx) => (
                <div
                  key={idx}
                  className='h-[12.5rem] border rounded-lg shadow-md p-4 hover:shadow-lg bg-white'
                >
                  <h3 className='text-lg font-semibold'>{meeting.title}</h3>
                  <p className='text-sm text-gray-600'>
                    모집 마감일 : {meeting.endDate}
                  </p>
                  <p className='text-sm text-gray-600'>
                    모임 시작일 : {meeting.gatheringDate}
                  </p>
                  <p className='text-sm text-gray-600'>
                    모집 상태 : {meeting.recruiting ? '모집중' : '모집마감'}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
