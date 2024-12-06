import Image, { StaticImageData } from 'next/image';

/**
 * 다음과 같은 속성을 props로 전달합니다.
 * src: string | StaticImageData;
 * alt: string;
 * width?: string;
 * height?: string;
 * className?: string;
 */

interface MeetingAvatarProps {
  src: string | StaticImageData;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function ImgCustomLoader({
  src,
  alt,
  width,
  height,
  className,
}: MeetingAvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      style={{ width, height }}
      className={`${className}`}
    />
  );
}
