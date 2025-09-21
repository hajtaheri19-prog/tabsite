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
    // Show loading for a minimum time to ensure it's visible
    const minLoadingTime = 2000; // 2 seconds minimum
    const startTime = Date.now();

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 100);

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
    }, 4000); // Maximum 4 seconds

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-accent/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-secondary/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center p-8 glass-effect rounded-3xl shadow-2xl flex flex-col items-center gap-6 relative z-10 backdrop-blur-xl border border-white/10">
        {/* Logo with enhanced animation */}
        {logo && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-lg animate-pulse"></div>
            <Image
              src={logo.imageUrl}
              width={90}
              height={90}
              alt="لوگوی تبدیلا"
              className="animate-float relative z-10 drop-shadow-2xl"
              data-ai-hint={logo.imageHint}
            />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>
          </div>
        )}

        {/* Main loading text with enhanced styling */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-2xl font-bold text-primary text-glow">
            <Loader2 className="animate-spin w-7 h-7" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              تبدیلا
            </span>
          </div>
          
          {/* Animated loading dots */}
          <div className="flex items-center gap-2 text-base text-muted-foreground">
            <span>در حال بارگذاری</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="w-56 h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Feature highlights */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>سریع</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-blue-500" />
            <span>دقیق</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-500" />
            <span>محبوب</span>
          </div>
        </div>

        {/* Version info without developer name */}
        <div className="text-xs text-muted-foreground/60 mt-1">
          <p>نسخه 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
