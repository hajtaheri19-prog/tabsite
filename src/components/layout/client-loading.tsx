'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Loader2, Sparkles, Zap, Star, Heart } from 'lucide-react';

export default function ClientLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const logo = PlaceHolderImages.find(p => p.id === 'logo');

  useEffect(() => {
    // Show loading for a shorter time
    const minLoadingTime = 1000; // 1 second minimum
    const startTime = Date.now();

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 20;
      });
    }, 80);

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      // Complete progress
      setProgress(100);
      
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
      setProgress(100);
      setIsLoading(false);
    }, 2500); // Maximum 2.5 seconds

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex items-center justify-center">
      {/* Simple loading indicator */}
      <div className="text-center p-6 glass-effect rounded-2xl shadow-xl flex flex-col items-center gap-4">
        {/* Logo */}
        {logo && (
          <div className="relative">
            <Image
              src={logo.imageUrl}
              width={60}
              height={60}
              alt="لوگوی تبدیلا"
              className="animate-pulse"
              data-ai-hint={logo.imageHint}
            />
          </div>
        )}

        {/* Loading text */}
        <div className="flex items-center gap-2 text-lg font-bold text-primary">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>در حال بارگذاری...</span>
        </div>

        {/* Simple progress bar */}
        <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
