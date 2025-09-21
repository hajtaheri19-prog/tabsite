import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Vazirmatn } from 'next/font/google';
import NetworkStatusDetector from '@/components/layout/network-status-detector';
import PWAInstallButton from '@/components/layout/pwa-install-button';
import ServiceWorkerRegistration from '@/components/layout/service-worker-registration';
import PWAIconGenerator from '@/components/layout/pwa-icon-generator';
import PWAStatus from '@/components/layout/pwa-status';

const vazirmatn = Vazirmatn({ subsets: ['latin', 'arabic'], variable: '--font-vazirmatn' });

export const metadata: Metadata = {
  title: {
    default: 'تبدیلا | دستیار هوشمند شما برای محاسبات و تبدیل واحدها',
    template: '%s | تبدیلا'
  },
  description: 'تبدیلا - مجموعه کامل ابزارهای هوشمند برای محاسبات، تبدیل واحدها، ارز، تاریخ، و ابزارهای کاربردی. سریع، دقیق و رایگان.',
  keywords: [
    'تبدیل واحد',
    'محاسبه',
    'مبدل ارز',
    'تبدیل تاریخ',
    'ابزار آنلاین',
    'محاسبه سن',
    'BMI',
    'وام',
    'سپرده',
    'QR Code',
    'رمز عبور',
    'تبدیلا',
    'tabdila',
    'ابزار فارسی',
    'محاسبات مالی',
    'تبدیل ریال تومان'
  ],
  authors: [{ name: 'تبدیلا' }],
  creator: 'تبدیلا',
  publisher: 'تبدیلا',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tabdila.ir'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/favicon.ico', sizes: '180x180', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://www.tabdila.ir',
    siteName: 'تبدیلا',
    title: 'تبدیلا | دستیار هوشمند شما برای محاسبات و تبدیل واحدها',
    description: 'مجموعه کامل ابزارهای هوشمند برای محاسبات، تبدیل واحدها، ارز، تاریخ، و ابزارهای کاربردی. سریع، دقیق و رایگان.',
    images: [
      {
        url: '/lo.png',
        width: 1200,
        height: 630,
        alt: 'تبدیلا - دستیار هوشمند شما',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tabdila_ir',
    creator: '@tabdila_ir',
    title: 'تبدیلا | دستیار هوشمند شما برای محاسبات و تبدیل واحدها',
    description: 'مجموعه کامل ابزارهای هوشمند برای محاسبات، تبدیل واحدها، ارز، تاریخ، و ابزارهای کاربردی.',
    images: ['/lo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'a0CBqNHND-fQsNhWsJvkCKJ6bbepFSU_3MlL2jwKslY',
  },
};

export const viewport: Viewport = {
  themeColor: '#2a0e5c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" />
         <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16 32x32 48x48" />
         <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
         <link rel="apple-touch-icon" href="/favicon.ico" sizes="180x180" />
         <meta name="msapplication-TileImage" content="/favicon.ico" />
         <meta name="msapplication-TileColor" content="#2a0e5c" />
         <meta name="theme-color" content="#2a0e5c" />
         <meta name="google-site-verification" content="a0CBqNHND-fQsNhWsJvkCKJ6bbepFSU_3MlL2jwKslY" />
         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
         <meta name="mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-capable" content="yes" />
         <meta name="apple-mobile-web-app-status-bar-style" content="default" />
         <meta name="apple-mobile-web-app-title" content="تبدیلا" />
         <meta name="application-name" content="تبدیلا" />
         <meta name="msapplication-tooltip" content="تبدیلا - دستیار هوشمند شما" />
         <meta name="msapplication-starturl" content="/" />
         <meta name="msapplication-navbutton-color" content="#2a0e5c" />
         <meta name="msapplication-TileColor" content="#2a0e5c" />
         <meta name="msapplication-config" content="/browserconfig.xml" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "WebApplication",
               "name": "تبدیلا",
               "alternateName": "Tabdila",
               "description": "مجموعه کامل ابزارهای هوشمند برای محاسبات، تبدیل واحدها، ارز، تاریخ، و ابزارهای کاربردی",
               "url": "https://www.tabdila.ir",
               "applicationCategory": "UtilityApplication",
               "operatingSystem": "Web Browser",
               "offers": {
                 "@type": "Offer",
                 "price": "0",
                 "priceCurrency": "IRR"
               },
               "creator": {
                 "@type": "Organization",
                 "name": "تبدیلا"
               },
               "inLanguage": "fa-IR",
               "isAccessibleForFree": true,
               "browserRequirements": "Requires JavaScript. Requires HTML5.",
               "softwareVersion": "1.0.0",
               "featureList": [
                 "تبدیل واحد",
                 "مبدل ارز",
                 "تبدیل تاریخ",
                 "محاسبه سن",
                 "محاسبه BMI",
                 "محاسبه وام",
                 "QR Code Generator",
                 "رمز عبور ساز",
                 "خلاصه‌ساز متن"
               ]
             })
           }}
         />
      </head>
      <body className={vazirmatn.variable}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="gradient-bg antialiased">
                {children}
                <Toaster />
                <NetworkStatusDetector />
                <PWAInstallButton />
                <ServiceWorkerRegistration />
                <PWAIconGenerator />
                <PWAStatus />
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
