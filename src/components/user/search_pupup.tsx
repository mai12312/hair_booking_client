// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { SearchEmptyWebtoonUser } from "./search-empty-webtoon-user";

// export const PopupSearch = ({
//   webtoons
// }: {
//   webtoons?:Webtoon[]
// }) => {
//   return (
//     <div className="absolute top-full w-full rounded-lg bg-orange-300 z-50">
//       {
//         (!webtoons|| webtoons.length == 0) ?
//         <SearchEmptyWebtoonUser/> :
//         webtoons.map((webtoon) => (
//           <div className="flex items-center gap-4 px-2 lg:px-4 py-2 relative shadow-orange-300 shadow-lg hover:bg-orange-400 rounded-lg" key={webtoon.id}>
//             <div className="relative h-4 w-4 p-4">
//               <Image 
//                 src={webtoon.thumbnail}
//                 fill
//                 alt="logo"
//                 loading="lazy"
//               />
//             </div>
//             <div className="">
//               <p className="text-sm lg:text-base">{webtoon.name}</p>
//               <p className="hidden lg:block text-xs">{webtoon.description.slice(0, 20) + "..."}</p>
//             </div>
//             <Link href={`/${webtoon.slug}`} className="inset-0 absolute"/>
//             <hr className=""/>
//           </div>
//         ))
//       }
//     </div>
//   )
// }