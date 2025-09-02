"use client"

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiBackend } from "@/utils/env.util";

export default function CancelBookingPage({ params }: { params: { bookingId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = params.bookingId;
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCancelBooking = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${getApiBackend()}/api/bookings/${bookingId}?code=${code}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.status === 201) {
        setResult("Hủy lịch thành công!");
      } else if (data.status === 417) {
        setResult("Booking đã được hủy trước đó!");
      } else {
        setResult("Hủy lịch thất bại hoặc không tìm thấy mã đặt lịch.");
      }
    } catch (error) {
      setResult("Có lỗi xảy ra khi hủy lịch.");
    }
    setLoading(false);
  };
  console.log("code:", code);

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Hủy lịch đặt</h1>
      <div className="mb-4">
        <b>Mã đặt lịch:</b> {code ? code : bookingId}
      </div>
      <button
        className="w-full bg-red-600 text-white py-2 rounded font-semibold"
        onClick={handleCancelBooking}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Xác nhận hủy lịch"}
      </button>
      {result && (
        <div className={`mt-4 text-center ${result.includes("thành công") ? "text-green-600" : "text-red-600"}`}>
          {result}
        </div>
      )}
    </div>
  );
}