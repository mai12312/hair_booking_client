"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { useFunctions } from "@/hooks/useFunctions";
import { getApiBackend } from "@/utils/env.util";
import { toast } from "react-toastify";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetServices } from "@/hooks/useGetServices";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { useGetBookings } from "@/hooks/useGetBookings";
import { useFunctionServices } from "@/hooks/useFuntionServices";
import { useFunctionBookings } from "@/hooks/useFuntionBookings";

export function DialogAddBookings({
  open,
  onOpenChange,
  addBookingToClient,
  selectedDate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addBookingToClient: (titleEvent: string, booking: Partial<Booking>) => void;
  selectedDate?: DateSelectArg | null;
}) {
  const [step, setStep] = useState(0);
  const { customer, setCustomer } = useGetCustomer();
  const { formatPrice, formatPhoneNumber, getAvailableTimes, checkPhoneNumber } = useFunctions();
  const backendUrl = getApiBackend();
  const { categories } = useGetCategories();
  const { services } = useGetServices();
  const { checkConflictBooking } = useFunctionBookings(services);
  const [phone, setPhone] = useState("");
  const [timeoutPhone, setTimeoutPhone] = useState<NodeJS.Timeout | null>(null);
  const [servicesByCategories, setServicesByCategories] = useState<Array<ServicesByCategories>>([]);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    time: "",
    date: ""
  });

  // Step 2: Service
  const serviceFilter = services.filter((s) => s.status == "approved");

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
  }, [categories, services])

  useEffect(() => {
    newBooking.date = selectedDate?.startStr ?? "";
  }, [selectedDate])

  // Store selected services as { [categoryId]: serviceId }
  const [selectedServices, setSelectedServices] = useState<Array<number>>([]);
  const selectedServiceIds: Array<number> = Object.values(selectedServices).filter(Boolean);

  // Step 5: Submit
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<string | null>(null);
  const { auth } = useAuthAdmin();
  console.log("Logging in:", auth);

  const { bookings , setBookings } = useGetBookings();
  const { calculateTotalPrice, calculateTotalDuration } = useFunctionServices();

  const handleNext = useCallback(() => setStep((s) => s + 1), [step]);
  const handleBack = useCallback(() => setStep((s) => s - 1), [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    // Check for booking time conflict before submitting
   const conflict = checkConflictBooking(`${newBooking.date}T${newBooking.time}:00`, bookings);
    if (conflict) {
      toast.error("Đã có lịch đặt vào thời gian này. Vui lòng chọn thời gian khác!");
      setSubmitting(false);
      return;
    }
    let booking: Booking = {
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerName: customer.name ?? "",
      startTime: `${newBooking.date}T${newBooking.time}:00`,
    };

    fetch(`${backendUrl}/api/bookings`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...booking,
        serviceIds: selectedServiceIds,
        createdByAdminId: auth.admin.id ?? null
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create booking");
        return res.json();
      })
      .then((data: DataResponse<{id: number; code: string; totalDuration: number}>) => {
        if(data && data.status === 201) {
          toast.success(
            "Đặt lịch thành công! Vui lòng kiểm tra email để xác nhận."
          );
          booking = {
            ...booking,
            id: data.datas.id ?? 0,
            code: data.datas.code ?? "",
            totalPrice: calculateTotalPrice(services, selectedServiceIds),
            totalDuration: calculateTotalDuration(services, selectedServiceIds)
          }
          addBookingToClient(`Booking ${data.datas.code}`, booking);
          setBookings((prev) => [...prev, booking]);
          setSuccess("Đặt lịch thành công!");

          setTimeout(function () {
            setSelectedServices([]);
            setCustomer({
              email: "",
              phone: "",
              name: ""
            })
            setPhone("");
            onOpenChange(false);
            setStep(0);
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Đặt lịch thất bại!");
        setError("Đặt lịch thất bại!");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1200px] max-w-full">
        <DialogHeader>
          <DialogTitle>Đặt lịch mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Stepper */}
          <div className="flex gap-2 mb-6">
            {["Số điện thoại", "Dịch vụ", "Ngày & giờ", "Thông tin", "Xác nhận"].map(
              (label, idx) => (
                <div key={label} className="flex items-center">
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
                  {idx < 4 && <span className="mx-2 text-gray-300">→</span>}
                </div>
              )
            )}
          </div>
          {/* Step 0: Phone */}
          {step === 0 && (
            <div>
              <label className="block mb-2 font-medium">Số điện thoại</label>
              <Input
                className="w-full border rounded px-2 py-2 mb-2"
                type="tel"
                value={phone ?? ""}
                onChange={handleChangePhoneNumber}
                placeholder="Nhập số điện thoại"
                required
              />
              {errorPhoneNumber && <div className="text-red-500">{errorPhoneNumber}</div>}
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded mt-4"
                disabled={!customer.phone}
                onClick={handleAddPhone}
              >
                Tiếp tục
              </button>
            </div>
          )}
          {/* Step 1: Service */}
          {step === 1 && (
            <div className="relative">
              <label className="block mb-2 font-medium">
                Chọn dịch vụ (1 dịch vụ mỗi danh mục)
              </label>
              <div className="space-y-4 mb-4 max-h-[350px] overflow-y-auto">
                {servicesByCategories.map((category) => (
                  <div key={category.id}>
                    <div className="font-semibold mb-2">{category.name}</div>
                    <div className="grid md:grid-cols-2 md:gap-8">
                      {category.services.map((service) => (
                        <div
                          className="w-full flex flex-wrap items-center gap-4 mb-2"
                          key={service.id}
                        >
                          <div className="w-full relative min-h-[200px] overflow-hidden">
                            <Image
                              src={
                                service.image ??
                                "https://tse1.explicit.bing.net/th/id/OIP.SUIzGQ7dtPFCXUF_-7WVVAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                              }
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
                            className={`w-full border rounded px-3 py-2 ${
                              selectedServices[category.id] === service.id
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                            }`}
                            onClick={() =>
                              setSelectedServices((prev: any) => ({
                                ...prev,
                                [category.id]:
                                  prev[category.id] === service.id
                                    ? undefined
                                    : service.id,
                              }))
                            }
                          >
                            <div className="flex flex-col items-start">
                              <span>{service.name}</span>
                              <span
                                className={`text-xs ${
                                  selectedServices[category.id] === service.id
                                    ? ""
                                    : "text-gray-500"
                                }`}
                              >
                                Giá: {formatPrice(service.price ?? 0)}
                              </span>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Overview */}
              <div className="w-full bg-white py-4 px-6 shadow-sm my-2 border">
                <div className="">Đã chọn {selectedServiceIds.length} dịch vụ</div>
                <div className="">Tổng tiền: {formatPrice(calculateTotalPrice(serviceFilter, selectedServiceIds ? selectedServiceIds : []))}</div>
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
                  disabled={selectedServiceIds.length === 0}
                  onClick={handleNext}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}
          {/* Step 2: Date/Time */}
          {step === 2 && (
            <div>
              <label className="block mb-2 font-medium">Chọn ngày</label>
              <input
                className="w-full border rounded px-2 py-2 mb-4"
                type="date"
                value={newBooking.date}
                onChange={(e) => {
                  setNewBooking({ ...newBooking, date: e.target.value });
                }}
                required
                min={new Date().toISOString().split("T")[0]}
              />
              <label className="block mb-2 font-medium">Chọn giờ</label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {getAvailableTimes(newBooking.date!).length === 0 && (
                  <span className="col-span-4 text-gray-400 text-sm">
                    Không còn khung giờ nào phù hợp hôm nay
                  </span>
                )}
                {getAvailableTimes(newBooking.date!).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`border rounded py-2 ${
                      newBooking.time === t ? "bg-blue-600 text-white" : "bg-white"
                    } ${!newBooking.date ? "opacity-50" : ""}`}
                    disabled={!newBooking.date}
                    onClick={() => setNewBooking({ ...newBooking, time: t })}
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
                  disabled={!newBooking.date || !newBooking.time}
                  onClick={handleNext}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}
          {/* Step 3: Info customer */}
          {step === 3 && (
            <div>
              <label className="block mb-2 font-medium">Họ và tên</label>
              <input
                className="w-full border rounded px-2 py-2 mb-4"
                type="text"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Nhập họ và tên"
                required
              />
              <label className="block mb-2 font-medium">Email</label>
              <input
                className="w-full border rounded px-2 py-2 mb-4"
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
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
          {/* Step 4: Confirm */}
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
                    .map((serviceId) =>
                      services.find((s) => s.id === serviceId)?.name
                    )
                    .filter(Boolean)
                    .join(", ")}
                </li>
                <li>
                  <b>Ngày:</b> {newBooking.date}
                </li>
                <li>
                  <b>Giờ:</b> {newBooking.time}
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
                >
                  {submitting ? "Đang đặt lịch..." : "Xác nhận đặt lịch"}
                </Button>
              </div>
              {success && (
                <div className="text-green-600 mt-4">{success}</div>
              )}
              {error && <div className="text-red-600 mt-4">{error}</div>}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
