import "./globals.css";

export const runtime = 'edge';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { constructMetadata } from "@/utils/metadata";
import { RedirectRole } from "@/components/auth/redirect";
import { AuthContextProvider } from "@/slice/auth.slice";
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
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
