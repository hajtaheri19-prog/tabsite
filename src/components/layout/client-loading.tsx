'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Loader } from 'lucide-react';

export default function ClientLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  useEffect(() => {
    // Show loading for a minimum time to ensure it's visible
    const minLoadingTime = 1500; // 1.5 seconds minimum
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback timeout
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Maximum 3 seconds

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 gradient-bg flex items-center justify-center">
      <div className="text-center p-8 glass-effect rounded-3xl shadow-2xl flex flex-col items-center gap-4">
        {logo && (
          <Image
            src={logo.imageUrl}
            width={80}
            height={80}
            alt="لوگوی تبدیلا"
            className="animate-float"
            data-ai-hint={logo.imageHint}
          />
        )}
        <div className="flex items-center gap-3 text-2xl font-bold text-primary text-glow">
          <Loader className="animate-spin" />
          <span>در حال بارگذاری...</span>
        </div>
        <div className="text-sm text-muted-foreground mt-4 space-y-1">
            <p>نسخه 1.0.0</p>
            <p>توسعه داده شده توسط حسین طاهری</p>
        </div>
      </div>
    </div>
  );
}
