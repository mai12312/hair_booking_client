import "./globals.css";

export const runtime = 'edge';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { constructMetadata } from "@/utils/metadata";
import { AuthContextProvider } from "@/slice/auth.slice";
import { cookies, headers } from "next/headers";
export const metadata = constructMetadata(
  {
    title: `Hair bookings`,
    description: `Đặt lịch cắt tóc`,
    noIndex: false
  }
);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token");
  return (
    <html lang="en">
      <body>
        <AuthContextProvider token={token}>
          {children}
        </AuthContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
