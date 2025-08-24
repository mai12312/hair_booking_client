import Image from "next/image";
import logo from "@/public/images/logo-king-kong.png"; // Adjust the path as necessary
import banner from "@/public/images/banner-king-kong.png"; // Adjust the path as necessary
import vipImage from "@/public/images/image_pre.jpg";
import { getAllServices } from "@/utils/services.util";
import Link from "next/link";
import { toast } from "react-toastify";
import { BoxBookingHome } from "@/components/user/home/box-booking-home";

const res = getAllServices({});

export default async function Page() {
  const {status, datas: {services}} = await res;
  if (status !== 200) {
    toast.error("Failed to fetch services");
  }
  return (
    <>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 flex flex-col items-center">
        <Image src={logo ?? ""} alt="Hair Booking Logo" width={120} height={120} />
        <h1 className="text-4xl font-bold mt-6 mb-2 text-center">KingKong Hair Booking</h1>
        <p className="text-lg mb-6 text-center max-w-xl">
          KingKong Barber Shop kính chào quý khách. Chúng tôi luôn sẵn sàng cùng bạn sáng tạo những mẫu tóc đẹp, chăm sóc tóc và tạo ra những tác phẩm nghệ thuật từ mái tóc của bạn.
        </p>
      </section>

      <section className="py-12 grid grid-cols-1 md:grid-cols-4 gap-2">
       <BoxBookingHome className="col-start-1 col-end-4"/>
       <div className="relative">
        <Image 
          src={vipImage ?? ""} alt="Barbershop Vip" fill
          className="shadow mx-auto rounded-xl"
          loading="lazy"
        />
       </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Về chúng tôi</h2>
        <p className="text-gray-700 w-2/3 mb-3 mx-auto">
          KingKong Barber Shop là Tiệm Cắt Tóc được thành lập từ năm 2019. Đến nay KingKong có 6 cơ sở tại Hà Nội.
        </p>
        <p className="text-gray-700 mb-6">
          KingKong Barber Shop cung cấp đầy đủ các dịch vụ về Tóc. Hỗ trợ, tư vấn giúp khách hàng có sự lựa chọn chính xác cho kiểu tóc hiện đại, sáng tạo và phù hợp với bản thân. Đội ngũ nhân viên tại KingKong luôn năng động, sáng tạo và phát triển.
        </p>
        <Image src={banner ?? ""} alt="Barbershop Interior" width={600} height={350} className="rounded shadow mx-auto" />
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
          {services.length === 0 ? (
            <p className="text-gray-600 text-center">No services available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded shadow text-center">
                  {/* <Image
                    src={service.image ?? ""}
                    alt={service.name}
                    width={300}
                    height={200}
                    className="mx-auto mb-4 rounded"
                  /> */}
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                </div>
              ))}
            </div>
          )}
          </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 flex flex-col items-center bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
        <p className="mb-6 text-center max-w-md">
          Ready for a fresh look? Schedule your visit with our easy online booking.
        </p>
        <Link
          href="/bookings"
          className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-400 transition"
        >
          Book Now
        </Link>
      </section>
    </>
  )
}