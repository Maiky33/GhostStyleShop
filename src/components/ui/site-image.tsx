import Image from "next/image";

import { PLACEHOLDER_IMAGE } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

type FillSiteImageProps = SiteImageProps & {
  fill: true;
};

type SizedSiteImageProps = SiteImageProps & {
  fill?: false;
  width: number;
  height: number;
};

export function SiteImage({
  src = PLACEHOLDER_IMAGE,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes,
  ...props
}: FillSiteImageProps | SizedSiteImageProps) {
  if ("fill" in props && props.fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  const { width, height } = props as SizedSiteImageProps;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
