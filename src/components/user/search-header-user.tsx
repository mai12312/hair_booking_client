// "use client"

// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Button } from "../ui/button";
// import { useFocusInputSearch, useInputSearchUser } from "@/hooks/useInputSearchUser.hook";
// import useMediaQuery from "@/hooks/useMediaQuery";
// import { PopupSearch } from "@/components/user/search_pupup";
// import { useDebouncedCallback } from 'use-debounce';
// import { useFetchApi } from "@/utils/ui/useFetchApi";

// export function SearchHeaderUser() {
//     const [keyWord, setKeyword] = useState("");
//     const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
//     const { handleFetchApi } = useFetchApi();
//     /**
//      * Check length of webtoons which is returned from server
//      * @param webtoons 
//      */
//     function checkLengthAndSetWebtoons(webtoons: Webtoon[] | null) {
//         if (!webtoons || webtoons.length == 0) {
//             setWebtoons([]);
//         } else {
//             setWebtoons(webtoons);
//         }
//     }
//     /**
//      * Fetch api
//      * @param api 
//      */
//     const fetchApi = (api: string) => {
//         handleFetchApi(api, data => {
//             checkLengthAndSetWebtoons(data["datas"]);
//         }, () => {
//             console.log("fetching webtoons error!");
//         })
//     }
//     /**
//      * Fetch data when component is rendered first time
//      */
//     useEffect(() => {
//         const api = `/api/webtoons`;
//         fetchApi(api);
//     }, [])
//     /**
//      * Search keyword in database by value that is user typed
//      */
//     const searchKeyword = useCallback(
//         (q: string) => {
//             q = q.trim();
//             // check condition
//             if (q == '') {
//                 const api = `/api/webtoons`;
//                 fetchApi(api);
//             } else {
//                 const api = `/api/webtoons/search-fn?q=${q}`;
//                 fetchApi(api);
//             }
//         }, []
//     )
//     /**
//      * Control search data when the user is type a keyword
//      * @param e 
//      */
//     const querySearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         setKeyword(e.target.value);
//         searchKeyword(e.target.value);
//     }, 300)
//     /**
//      * Use context
//      */
//     const { isShowInput, setIsShowInput } = useInputSearchUser();
//     const { isMobile } = useMediaQuery();
//     const { isFocusInput, setIsFocusInput } = useFocusInputSearch();
//     /**
//      * Handle result when user is using mobile
//      */
//     useEffect(() => {
//         if (isMobile && !isShowInput) {
//             setIsShowInput(true);
//         }
//     }, [isMobile])
    
//     function handleClick() {
//         setIsShowInput(true);
//         // This won't work because the DOM node isn't exposed:
//         // ref.current.style.opacity = 0.5;
//     }
//     return (
//         <div className="relative ml-auto flex-1 md:grow-0">
//             {
//                 !isShowInput ? <Button
//                     variant={"outline"}
//                     className="cursor-pointer"
//                     onClick={() => handleClick()}
//                 >
//                     <Search
//                         className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer "
//                     />
//                 </Button>
//                     :
//                     <>
//                         <Input
//                             type="search"
//                             placeholder="Search..."
//                             onFocus={() => setIsFocusInput(true)}
//                             onBlur={() => {
//                                 setTimeout(() => {
//                                     setIsFocusInput(false);
//                                     setIsShowInput(false);
//                                 }, 100)
//                             }}
//                             onChange={(e) => querySearch(e)}
//                             defaultValue={keyWord}
//                             className={"w-full rounded-lg bg-background pl-8 lg:w-[336px] md:w-[200px] focus:border-orange-200 focus:outline-none focus-visible:ring-transparent"}
//                         />
//                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
//                         {
//                             isFocusInput && <PopupSearch webtoons={webtoons} />
//                         }
//                     </>
//             }
//         </div>
//     )
// }