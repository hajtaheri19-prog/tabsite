'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, WifiOff, Download } from 'lucide-react';

export default function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isPWA, setIsPWA] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if running as PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      setIsPWA(isStandalone || isIOSStandalone);
    };

    // Check online status
    const checkOnline = () => {
      setIsOnline(navigator.onLine);
    };

    // Check if installable
    const checkInstallable = () => {
      const hasPrompt = 'BeforeInstallPromptEvent' in window;
      setIsInstallable(hasPrompt);
    };

    // Initial checks
    checkPWA();
    checkOnline();
    checkInstallable();

    // Listen for changes
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    window.addEventListener('beforeinstallprompt', checkInstallable);

    // Check PWA status periodically
    const interval = setInterval(checkPWA, 2000);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
      window.removeEventListener('beforeinstallprompt', checkInstallable);
      clearInterval(interval);
    };
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return null; // Don't show in development
  }

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-2">
      {/* PWA Status */}
      {isPWA && (
        <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
          <Smartphone className="w-3 h-3 ml-1" />
          PWA Mode
        </Badge>
      )}

      {/* Installable Status */}
      {!isPWA && isInstallable && (
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
          <Download className="w-3 h-3 ml-1" />
          قابل نصب
        </Badge>
      )}

      {/* Online Status */}
      {!isOnline && (
        <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-500/20">
          <WifiOff className="w-3 h-3 ml-1" />
          آفلاین
        </Badge>
      )}
    </div>
  );
}
