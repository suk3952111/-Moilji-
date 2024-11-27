import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <p>이 페이지는 존재하지 않습니다.</p>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
