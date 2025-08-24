"use client"
import { slugify } from "@/utils/slugify";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function HistoryPage() {
    const [historyVol, setHistoryVol] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        function loadComicProgress() {
            const savedHistory = localStorage.getItem("comic-series");
            const comicHistory = savedHistory ? JSON.parse(savedHistory) : [];
            setHistoryVol(comicHistory);
            return null;
        }
        loadComicProgress();
        setLoading(false)
    }, [])
    function removeHistory(item:any) {
        historyVol.splice(historyVol.indexOf(item), 1);
        localStorage.setItem("comic-series", JSON.stringify(historyVol));
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-600 font-semibold">Lịch sử đọc </h2>
                <a href={`/history`} className="text-gray-500 text-sm">Xem tất cả</a>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 space-x-1">
                {historyVol?.map((item: any, index: number) => (
                    <div key={index} className="w-1/2 p-2 bg-gray-100 rounded-md relative">
                        <img
                            src={item?.comic?.thumbnail}
                            alt={item?.comic?.name}
                            className="w-full h-64 object-cover rounded-md"
                        />
                        <Button onClick={()=>removeHistory(item)} className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                            ✖ Xóa
                        </Button>
                        <h2 className="mt-2 text-center font-semibold text-gray-800">
                            <a href={`/${item?.comic?.slug}`} className="text-sm font-semibold text-gray-800 truncate hover:text-blue-500">
                                {item?.comic?.name}
                            </a>
                        </h2>
                        <p className="text-center text-gray-600 text-sm">
                            <a href={`/${item?.comic?.slug}/${slugify(item?.volume, { replacement: "-" })}`} className="text-xs text-gray-500 hover:text-blue-500">Đọc tiếp {item?.volume}</a>
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}