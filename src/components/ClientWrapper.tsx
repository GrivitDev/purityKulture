'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
    </>
  );
}
