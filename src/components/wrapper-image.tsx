import { cn } from "@/utils/ui.util";
import Image, { StaticImageData } from "next/image";
import secondary from "@/public/images/image-stroke.png";

export function WrapperImage({
    children,
    className
}: {
    children:React.ReactNode,
    className?: string
}) {
    return (
        <div className={cn("relative aspect-video", className)}>
            {children}
        </div>
    )
}

export const ImageCustom = ({
    id,
    src,
    alt,
    className,
    imageStyle
} : {
    id?: string,
    src?: string | StaticImageData;
    className?: string;
    alt?:string;
    imageStyle?: string;
}) => {
    return (
        <WrapperImage className={className}>
            <Image
                id={id}
                src={ src || secondary }
                alt={ alt ? alt : "" }
                fill
                loading="lazy"
                className={imageStyle ?? ""}
            />
        </WrapperImage>
    )
}