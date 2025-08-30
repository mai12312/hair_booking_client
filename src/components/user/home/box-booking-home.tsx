"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFunctions } from "@/hooks/useFunctions";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { cn } from "@/utils/ui.util";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function BoxBookingHome({className}: {className?: string}) {
    const { customer, setCustomer } = useGetCustomer();
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { formatPhoneNumber, checkPhoneNumber } = useFunctions();
    const router = useRouter();
    const handleBooking = () => {
        if(!customer.phone) {
            toast.error("Vui lòng nhập số điện thoại");
            return;
        }
        const {error} = checkPhoneNumber(customer.phone);
        if (error) {
            setError(error);
            return;
        }
        router.push("/bookings");
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        if(formatted.error) {
            setError(formatted.error);
            setTimeout(() => {
                setError("");
            }, 3000);
        } else {
            setPhone(formatted.phoneNumber ?? "");
            setError("");
            setCustomer((prev: Customer) => ({
                ...prev,
                phone: e.target.value
            }))
        }
    }
    return (
        <div className={cn(className, "flex flex-col gap-4 bg-black p-6 rounded-xl")}>
            <div className="flex flex-col gap-2">
                <h2 className="text-white text-3xl font-bold">Đặt lịch giữ chỗ chỉ 30 giây</h2>
                <p className="text-white text-sm font-normal">Cắt xong trả tiền, hủy lịch không sao</p>
            </div>
            <div className="flex gap-3">
               <div className="flex-1">
                    <Input
                        placeholder="Nhập số điện thoại để đặt lịch"
                        type="tel"
                        value={phone}
                        onChange={handleInputChange}
                    />
                    <p className="text-red-500 text-sm mt-2 h-5">{error ? error : ""}</p>
               </div>
                <Button
                    className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-400 transition uppercase"
                    onClick={handleBooking}
                >
                    Đặt lịch ngay
                </Button>
            </div>
        </div>
    );
};
