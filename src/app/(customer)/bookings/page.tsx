"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFunctions } from "@/hooks/useFunctions";
import { useFunctionBookings } from "@/hooks/useFuntionBookings";
import { useFunctionServices } from "@/hooks/useFuntionServices";
import { useGetBookings } from "@/hooks/useGetBookings";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { getAllCategories } from "@/utils/categories.util";
import { getApiBackend } from "@/utils/env.util";
import { getAllServices } from "@/utils/services.util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Dummy fetchServices function, replace with real API call
const fetchServices = async (): Promise<ServiceList> => {
 const { datas: {services} } = await getAllServices({});
 return services;
};
const backendUrl = getApiBackend();

const fetchServiceCategories = async (): Promise<CategoryList> => {
 const { datas: {categories} } = await getAllCategories({});
 return categories;
};

const steps = [
  "Nhập số điện thoại",
  "Chọn dịch vụ",
  "Chọn ngày & giờ",
  "Thông tin khách hàng",
  "Xác nhận đặt lịch",
];

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const { customer, setCustomer } = useGetCustomer();
  const router = useRouter();

  // Step 2: Service
  const [services, setServices] = useState<ServiceList>([]);
  const [categories, setCategories] = useState<CategoryList>([]);
  const serviceFilter = services.filter(s => s.status == "approved");
  const [servicesByCategories, setServicesByCategories] = useState<Array<ServicesByCategories>>([]);
  
  // Store selected services as { [categoryId]: serviceId }
  const [selectedServices, setSelectedServices] = useState<Array<number>>([]);
  const selectedServiceIds: Array<number> = Object.values(selectedServices).filter(Boolean);

  // Step 3: Date/Time
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step 5: Submit
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);    
  const { formatPrice, getAvailableTimes, formatPhoneNumber, checkPhoneNumber } = useFunctions();
  const { bookings } = useGetBookings();
  const { checkConflictBooking } = useFunctionBookings(services);
  const { calculateTotalPrice } = useFunctionServices();
  const [timeoutPhone, setTimeoutPhone] = useState<NodeJS.Timeout | null>(null);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<string | null>(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchServices().then(setServices);
    fetchServiceCategories().then(setCategories);
  }, []);
  
  useEffect(() => {
    const servicesByCategories: Array<ServicesByCategories> = categories.map((category) => {
      const servicesInCategory = serviceFilter.filter(
        (service) => service.categoryId === category.id
      );
      return { ...category, services: servicesInCategory };
    })
    const filteredServicesByCategories = servicesByCategories
    .filter((category) => category.services.length > 0);
    setServicesByCategories(filteredServicesByCategories);
  }, [categories, services]);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleAddPhone = () => {
    if(!customer.phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    const {error} = checkPhoneNumber(customer.phone);
    if (error) {
      setErrorPhoneNumber(error);
      return;
    }
    handleNext();
  }

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if(formatted.error) {
      setErrorPhoneNumber(formatted.error);
      if (timeoutPhone) {
        clearTimeout(timeoutPhone);
      }
      setTimeoutPhone(setTimeout(() => {
        setErrorPhoneNumber("");
      }, 3000));
    } else {
      setPhone(formatted.phoneNumber ?? "");
      setCustomer({ ...customer, phone: e.target.value });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    const conflict = checkConflictBooking(`${date}T${time}:00`, bookings);
    if (conflict) {
      toast.error("Đã có lịch đặt vào thời gian này. Vui lòng chọn thời gian khác!");
      setSubmitting(false);
      return;
    }
    // Dummy API call, replace with real booking logic
    const api = `${backendUrl}/api/bookings`;
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerName: customer.name,
        serviceIds: selectedServiceIds,
        startTime: `${date}T${time}:00`,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create booking");
        return res.json();
      })
      .then((data) => {
        toast.success("Đặt lịch thành công! Vui lòng kiểm tra email để xác nhận.");
        setSuccess("Đặt lịch thành công!");
        setTimeout(function() {
          router.push("/");
        }, 1000)
      })
      .catch((error) => {
        toast.error("Đặt lịch thất bại!");
        setError("Đặt lịch thất bại!");
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(function() {
          setError(null);
          setSuccess(null);
        }, 2000)
      });
  };


  return (
    <div className="max-w-[1200px] mx-auto mt-8 p-4 border rounded shadow bg-white">
      <div className="flex items-center mb-6">
        {steps.map((label, idx) => (
          <React.Fragment key={label}>
            <div
              className={`flex items-center ${
                idx === step ? "font-bold text-blue-600" : "text-gray-400"
              }`}
            >
              <span className="rounded-full border w-8 h-8 flex items-center justify-center mr-2">
                {idx + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="mx-2 text-gray-300">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div>
            <label className="block mb-2 font-medium">Số điện thoại</label>
            <Input
              className="w-full border rounded px-2 py-2 mb-4"
              type="tel"
              value={phone ?? ""}
              onChange={handleChangePhoneNumber}
              placeholder="Nhập số điện thoại"
              required
            />
            {errorPhoneNumber && <div className="text-red-500">{errorPhoneNumber}</div>}

            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded"
              disabled={!customer.phone}
              onClick={handleAddPhone}
            >
              Tiếp tục
            </button>
          </div>
        )}
        {/* Service */}
        {step === 1 && (
          <div className="relative">
            <label className="block mb-2 font-medium">Chọn dịch vụ (1 dịch vụ mỗi danh mục)</label>
            <div className="space-y-4 mb-4 max-h-[550px] overflow-y-auto">
              {
                servicesByCategories.map(category => (
                  <div key={category.id}>
                    <div className="font-semibold mb-2">
                      {category.name}
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-8">
                      {category.services.map(service => (
                       <div className="w-full flex flex-wrap items-center gap-4 mb-2" key={service.id}>
                          <div className="w-full relative min-h-[500px] overflow-hidden">
                            <Image 
                              // src={service.image ?? ""} 
                              src={service.image ?? "https://tse1.explicit.bing.net/th/id/OIP.SUIzGQ7dtPFCXUF_-7WVVAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"} 
                              alt={service.name} 
                              loading="lazy"
                              className="object-cover hover:scale-110 transition-all duration-300 ease-in-out"
                              fill
                            />
                             <div className="absolute top-0 left-0">
                               <span className="text-xs text-gray-500 p-4">
                                  Thời gian: {service.duration} phút
                                </span>
                             </div>
                          </div>
                          <button
                            key={service.id}
                            type="button"
                            className={`w-full border rounded px-3 py-2 ${selectedServices[category.id] === service.id ? "bg-blue-600 text-white" : "bg-white"}`}
                            onClick={() =>
                              setSelectedServices((prev: any) => ({
                                ...prev,
                                [category.id]: prev[category.id] === service.id ? undefined : service.id
                              }))
                            }
                          >
                            <div className="flex flex-col items-start">
                              <span>{service.name}</span>
                              <span className={`text-xs ${selectedServices[category.id] === service.id ? "" : "text-gray-500"}`}>
                                {/* Giá: {service.price?.toLocaleString()}₫ */}
                                Giá: {formatPrice(service.price ?? 0)}
                              </span>
                            </div>
                          </button>
                       </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
            {/* Overview */}
            <div className="w-full bg-white py-4 px-6 shadow-sm my-2 border">
              <div className="">Đã chọn {selectedServiceIds.length} dịch vụ</div>
              <div className="">Tổng tiền: {formatPrice(calculateTotalPrice(serviceFilter, selectedServiceIds))}</div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={handleBack}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white"
                // Must select at least one service
                disabled={selectedServiceIds.length === 0}
                onClick={handleNext}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* Time */}
        {step === 2 && (
          <div>
            <label className="block mb-2 font-medium">Chọn ngày</label>
            <input
              className="w-full border rounded px-2 py-2 mb-4"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime(""); // reset time when date changes
              }}
              required
              min={new Date().toISOString().split("T")[0]}
            />
            <label className="block mb-2 font-medium">Chọn giờ</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {getAvailableTimes(date).length === 0 && (
                <span className="col-span-4 text-gray-400 text-sm">
                  Không còn khung giờ nào phù hợp hôm nay
                </span>
              )}
              {getAvailableTimes(date).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`border rounded py-2 ${time === t ? "bg-blue-600 text-white" : "bg-white"} ${!date ? "opacity-50" : ""}`}
                  disabled={!date}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={handleBack}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={!date || !time}
                onClick={handleNext}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}
        {/* Info customer */}
        {step === 3 && (
          <div>
            <label className="block mb-2 font-medium">Họ và tên</label>
            <input
              className="w-full border rounded px-2 py-2 mb-4"
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="Nhập họ và tên"
              required
            />
            <label className="block mb-2 font-medium">Email</label>
            <input
              className="w-full border rounded px-2 py-2 mb-4"
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              placeholder="Nhập email"
              required
            />
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={handleBack}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={!customer.name || !customer.email}
                onClick={handleNext}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4">
              Xác nhận thông tin đặt lịch
            </h2>
            <ul className="mb-4 text-sm">
              <li>
                <b>Số điện thoại:</b> {customer.phone}
              </li>
              <li>
                <b>Dịch vụ:</b>{" "}
                {selectedServiceIds
                  .map(serviceId =>
                    services.find((s) => s.id === serviceId)?.name
                  )
                  .filter(Boolean)
                  .join(", ")}
              </li>
              <li>
                <b>Ngày:</b> {date}
              </li>
              <li>
                <b>Giờ:</b> {time}
              </li>
              <li>
                <b>Họ và tên:</b> {customer.name}
              </li>
              <li>
                <b>Email:</b> {customer.email}
              </li>
            </ul>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={handleBack}
              >
                Quay lại
              </button>
              <Button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Đang đặt lịch..." : "Xác nhận đặt lịch"}
              </Button>
            </div>
            {success && <div className="text-green-600 mt-4">{success}</div>}
            {error && <div className="text-red-600 mt-4">{error}</div>}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingPage;
