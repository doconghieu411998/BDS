'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@admin/login/login';
import { authStorage } from '@/utils/auth';
import { ROUTES } from '@/constants/routes';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      // Redirect to dashboard if already authenticated
      router.replace(ROUTES.DASHBOARD);
    }
  }, [router]);

  return (
    <>
      <Login />
    </>
  );
}