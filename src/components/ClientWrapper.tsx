'use client';

import { JSX } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

type ClientWrapperProps = {
  children: React.ReactNode;
};

export default function ClientWrapper({ children }: ClientWrapperProps): JSX.Element {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') ?? false;

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
    </>
  );
}
