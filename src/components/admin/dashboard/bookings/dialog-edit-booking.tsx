"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useGetBookings } from "@/hooks/useGetBookings"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { getApiBackend } from "@/utils/env.util"
import { toast } from "react-toastify"
import { useGetCategories } from "@/hooks/useGetCategories"
import { useGetServices } from "@/hooks/useGetServices"
import { LoadingAdmin } from "@/components/admin/loading-admin"
import { useFunctions } from "@/hooks/useFunctions"
import { useFunctionServices } from "@/hooks/useFuntionServices"
import { Dialog as ConfirmDialog, DialogContent as ConfirmDialogContent, DialogFooter as ConfirmDialogFooter, DialogHeader as ConfirmDialogHeader, DialogTitle as ConfirmDialogTitle } from "@/components/ui/dialog"

type ServicesByCategories = {
  services: Service[];
  id: number;
  adminId?: number;
  name: string;
  displayOrder?: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
};

export function DialogEditBookingAdmin({
  booking
}: {
  booking: Booking
}) {
  const {
    bookings,
    setBookings,
    isShowEditDialog,
    setShowEditDialog
  } = useGetBookings();
  const { auth } = useAuthAdmin();
  const { categories } = useGetCategories();
  const { services } = useGetServices();
  const { getAvailableTimes } = useFunctions();
  const { calculateTotalPrice } = useFunctionServices();

  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [startTime, setStartTime] = useState<string>("");
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [servicesByCategories, setServicesByCategories] = useState<Array<ServicesByCategories>>([]);
  const [loading, setLoading] = useState(false);
  const [canEditAll, setCanEditAll] = useState(false);
  const [canEditNone, setCanEditNone] = useState(false);
  const [canEditStatusOnly, setCanEditStatusOnly] = useState(false);
  const [canEditServicesAndTime, setCanEditServicesAndTime] = useState(false);
  const [step, setStep] = useState(0);

  // Split startTime to date and time for editing
  const [editDate, setEditDate] = useState<string>("");
  const [editTime, setEditTime] = useState<string>("");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (isShowEditDialog) {
        // Determine editability based on current status (always up-to-date on UI event)
        setCanEditAll(booking.status === "pending");
        setCanEditNone(booking.status === "canceled" || booking.status === "completed");
        setCanEditStatusOnly(booking.status === "approved");
        setCanEditServicesAndTime(booking.status === "doing");
        setCustomerName(booking?.customerName ?? "");
        setCustomerEmail(booking?.customerEmail ?? "");
        setCustomerPhone(booking?.customerPhone ?? "");
        setStatus(booking?.status ?? "pending");
        setStartTime(booking?.startTime ?? "");
        // Set default selected services from booking
        setServiceIds(booking?.serviceIds ?? []);
        // Parse startTime to date and time
        if (booking?.startTime) {
            const dt = new Date(booking.startTime);
            setEditDate(dt.toISOString().slice(0, 10));
            setEditTime(dt.toTimeString().slice(0, 5));
        }
    }
  }, [booking, isShowEditDialog]);

  // Update startTime when date or time changes
  useEffect(() => {
    if (editDate && editTime) {
      setStartTime(`${editDate}T${editTime}:00`);
    }
  }, [editDate, editTime]);

  useEffect(() => {
    const serviceFilter = services.filter((s) => s.status == "approved");
    const byCategories: Array<ServicesByCategories> = categories.map((category) => {
      const servicesInCategory = serviceFilter.filter(
        (service) => service.categoryId === category.id
      );
      return { ...category, services: servicesInCategory };
    }).filter((category) => category.services.length > 0);
    setServicesByCategories(byCategories);
  }, [categories, services]);

  const handleUpdateBooking = () => {
    setLoading(true);
    fetch(`${getApiBackend()}/api/bookings/${booking.id ?? 0}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth?.accessToken ?? ""}`
      },
      body: JSON.stringify({
        customerName,
        customerEmail,
        customerPhone,
        status,
        startTime,
        serviceIds
      })
    })
      .then(res => res.json())
      .then((data) => {
        if (data["status"] == 200) {
          const updatedBooking: Booking = {
            ...booking,
            customerName,
            customerEmail,
            customerPhone,
            status,
            startTime,
            serviceIds
          }
          const newBookings: BookingList = [];
          bookings.map((b: Booking) => {
            if (b.id !== updatedBooking.id) {
              newBookings.push(b);
            }
          })
          setBookings([...newBookings, updatedBooking]);
          toast.success("Cập nhật booking thành công!", {
            position: "bottom-right"
          });
          setShowEditDialog(false);
        } else {
          toast.error("Cập nhật booking thất bại! Vui lòng thử lại!", {
            position: "bottom-right"
          });
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Cập nhật booking thất bại! Vui lòng thử lại!", {
          position: "bottom-right"
        });
        setLoading(false);
      });
  }

  const handleDeleteBooking = async () => {
    setLoading(true);
    fetch(`${getApiBackend()}/api/bookings/${booking.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${auth?.accessToken ?? ""}`
      }
    })
    .then(res => res.json())
    .then((data) => {
      if (data["status"] == 201) {
        setBookings(bookings.filter(b => b.id !== booking.id));
        toast.success("Xóa booking thành công!", { position: "bottom-right" });
        setShowEditDialog(false);
      } else {
        toast.error("Xóa booking thất bại!", { position: "bottom-right" });
      }
      setShowDeleteDialog(false);
      setLoading(false);
    })
    .catch(() => {
      toast.error("Xóa booking thất bại!", { position: "bottom-right" });
      setShowDeleteDialog(false);
      setLoading(false);
    });
  };

  // Step navigation handlers
  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  return (
    <div>
      <Dialog open={isShowEditDialog} onOpenChange={() => setShowEditDialog(false)}>
        <DialogContent className="w-[1200px] max-w-full">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          {/* Stepper */}
          <div className="flex gap-2 mb-6">
            {["Thông tin khách hàng", "Dịch vụ", "Ngày & giờ", "Xác nhận"].map(
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
                  {idx < 3 && <span className="mx-2 text-gray-300">→</span>}
                </div>
              )
            )}
          </div>
          {/* Step 0: Customer Info */}
          {step === 0 && (
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Name
                </Label>
                <Input
                  id="customerName"
                  value={customerName}
                  className="col-span-3"
                  placeholder="Customer name ..."
                  onChange={e => setCustomerName(e.target.value)}
                  disabled={!canEditAll}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerEmail" className="text-right">
                  Email
                </Label>
                <Input
                  id="customerEmail"
                  value={customerEmail}
                  className="col-span-3"
                  placeholder="Customer email ..."
                  onChange={e => setCustomerEmail(e.target.value)}
                  disabled={!canEditAll}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerPhone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  className="col-span-3"
                  placeholder="Customer phone ..."
                  onChange={e => setCustomerPhone(e.target.value)}
                  disabled={!canEditAll}
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" disabled={step === 0} onClick={handleBack}>
                  Quay lại
                </Button>
                <Button type="button" onClick={handleNext} disabled={!canEditAll}>
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceIds" className="text-right">
                  Services
                </Label>
                <div className="col-span-3">
                  {servicesByCategories.map((category) => (
                    <div key={category.id} className="mb-2">
                      <div className="font-semibold mb-2">{category.name}</div>
                      <div className="grid md:grid-cols-2 md:gap-8">
                        {category.services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            className={`w-full border rounded px-3 py-2 mb-2 ${serviceIds.includes(service.id) ? "bg-blue-600 text-white" : "bg-white"}`}
                            onClick={() => {
                              if (canEditAll || canEditServicesAndTime) {
                                setServiceIds((prev: number[]) => {
                                  // Only allow one service per category
                                  const idsInCategory = category.services.map(s => s.id);
                                  const filtered = prev.filter(id => !idsInCategory.includes(id));
                                  return serviceIds.includes(service.id)
                                    ? filtered
                                    : [...filtered, service.id];
                                });
                              }
                            }}
                            disabled={canEditNone || canEditStatusOnly}
                          >
                            <div className="flex flex-col items-start">
                              <span>{service.name}</span>
                              <span className={`text-xs ${serviceIds.includes(service.id) ? "" : "text-gray-500"}`}>
                                Giá: {service.price?.toLocaleString()}₫
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 font-semibold">
                    Tổng tiền: {calculateTotalPrice(services, serviceIds).toLocaleString()}₫
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Quay lại
                </Button>
                <Button type="button" onClick={handleNext} disabled={serviceIds.length === 0 || canEditNone || canEditStatusOnly}>
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}
          {/* Step 2: Date/Time */}
          {step === 2 && (
            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <div className="col-span-3 flex gap-2">
                  <input
                    type="date"
                    id="editDate"
                    value={editDate}
                    className="border rounded px-2 py-1"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={e => {
                      if (canEditAll || canEditServicesAndTime) {
                        setEditDate(e.target.value);
                        setEditTime(""); // reset time when date changes
                      }
                    }}
                    disabled={canEditNone || canEditStatusOnly}
                  />
                  <select
                    id="editTime"
                    value={editTime}
                    className="border rounded px-2 py-1"
                    disabled={!editDate || canEditNone || canEditStatusOnly}
                    onChange={e => {
                      if (canEditAll || canEditServicesAndTime) setEditTime(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      -- Chọn giờ --
                    </option>
                    {getAvailableTimes(editDate).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Quay lại
                </Button>
                <Button type="button" onClick={handleNext} disabled={!editDate || !editTime || canEditNone || canEditStatusOnly}>
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}
          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <div className="mb-4">
                <b>Tên khách hàng:</b> {customerName}
                <br />
                <b>Email:</b> {customerEmail}
                <br />
                <b>Phone:</b> {customerPhone}
                <br />
                <b>Dịch vụ:</b> {serviceIds.map(id => services.find(s => s.id === id)?.name).filter(Boolean).join(", ")}
                <br />
                <b>Ngày:</b> {editDate}
                <br />
                <b>Giờ:</b> {editTime}
                <br />
                <b>Trạng thái:</b> {status}
                <br />
                <b>Tổng tiền:</b> {calculateTotalPrice(services, serviceIds).toLocaleString()}₫
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Quay lại
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={canEditNone}
                  >
                    Xóa
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleUpdateBooking}
                    disabled={canEditNone}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
          {loading && <LoadingAdmin />}
        </DialogContent>
      </Dialog>
      {/* Confirm Delete Dialog */}
      <ConfirmDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <ConfirmDialogContent>
          <ConfirmDialogHeader>
            <ConfirmDialogTitle>Bạn có muốn xóa booking này không?</ConfirmDialogTitle>
          </ConfirmDialogHeader>
          <div>
            <p>Tên khách hàng: {customerName}</p>
            <p>Email: {customerEmail}</p>
            <p>Phone: {customerPhone}</p>
          </div>
          <ConfirmDialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteBooking}>
              Xóa
            </Button>
          </ConfirmDialogFooter>
        </ConfirmDialogContent>
      </ConfirmDialog>
    </div>
  )
}