// import Image from "next/image";
import Link from "next/link";
import { ImageCustom } from "../wrapper-image";
import logo from "@/public/images/img_logo.png";
import { contactInfos, linkPages } from "@/constants/footer.constant";
import { nanoid } from "nanoid";

export function FooterUser() {
    return (
        <div className="mt-8 bg-black pt-9">
            <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
                <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
                    {/* Info */}
                    <div className="md:w-[316px] z-1">
                        <ImageCustom
                            src={logo}
                            className="aspect-auto h-12 w-12 z-1"
                        />
                        <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eos, fugit non. Incidunt dolorum adipisci, tempore asperiores nemo odio facere officiis enim animi
                            placeat eaque nesciunt alias beatae id, at dicta.
                        </p>

                        {/* social links */}
                        {/* <div className="mt-[18px] flex gap-4">
                            {
                                socialLinks.map(item => (
                                    <Link className="hover:scale-110" target="_blank" href={item.href} key={nanoid()}>
                                        <Image
                                            alt={item.alt}
                                            loading="lazy"
                                            width={36}
                                            height={36}
                                            decoding="async"
                                            data-nimg={1}
                                            style={{color: 'transparent'}}
                                            src={item.src}
                                        />
                                    </Link>
                                ))
                            }
                        </div> */}
                    </div>

                    {/* Contact */}
                    <div className="md:w-[316px]">
                        {
                            contactInfos.map(item => (
                                <div className="mt-[23px] flex items-center" key={nanoid()}>
                                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                                        <item.icons className="text-white"/>
                                    </div>
                                    <div className="ml-[18px] flex">
                                        <Link 
                                            href={item.href ?? "#"} 
                                            className="ffont-Inter text-[14px] font-medium text-white"
                                        >
                                            <p className="font-Inter text-[12px] font-medium text-white hover:text-gray-300">{item.title}: {item.value}</p>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
                        {/* Pages */}
                        <div className="">
                            <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal">Pages</p>
                            <ul>
                                {
                                    linkPages.map(item => (
                                        <li className="mt-[15px]" key={nanoid()}>
                                            <Link
                                                className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold" 
                                                href={item.href}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* dowload link */}
                        {/* <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                            <p className="text-deutziawhite font-inter text-[18px] font-medium">Download the app</p>
                            <div className="flex gap-4 sm:flex-col">
                                {
                                    downloadLinks.map((item) => (
                                        <Link target="_blank" href="#" key={nanoid()}>
                                            <Image 
                                                alt={item.alt}
                                                loading="lazy" 
                                                width={168}
                                                height={50}
                                                decoding="async"
                                                data-nimg={1} 
                                                style={{color: 'transparent'}}
                                                src={item.src}
                                            />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div> */}
                    </div>
                </div>
                <hr className="mt-[30px] text-white" />

                <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
                    <p className="text-[10px] font-normal text-white md:text-[12px]">
                        © Copyright 2024, All Rights Reserved by Suzu .Inc
                    </p>
                </div>
            </div>
        </div>
    )
}