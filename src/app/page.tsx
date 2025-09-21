import React from 'react';
import Header from '@/components/layout/header';
import ClientLoading from '@/components/layout/client-loading';
import UnitConverter from '@/components/features/unit-converter';
import CurrencyConverter from '@/components/features/currency-converter';
import DateConverter from '@/components/features/date-converter';
import CryptoConverter from '@/components/features/crypto-converter';
import AgeCalculator from '@/components/features/age-calculator';
import BmiCalculator from '@/components/features/bmi-calculator';
import PercentageCalculator from '@/components/features/percentage-calculator';
import LoanCalculator from '@/components/features/loan-calculator';
import Stopwatch from '@/components/features/stopwatch';
import CountdownTimer from '@/components/features/countdown-timer';
import DepositCalculator from '@/components/features/deposit-calculator';
import NumberToWordsConverter from '@/components/features/number-to-words-converter';
import NumberSystemConverter from '@/components/features/number-system-converter';
import PasswordGenerator from '@/components/features/password-generator';
import RandomNumberGenerator from '@/components/features/random-number-generator';
import BinaryConverter from '@/components/features/binary-converter';
import DistanceCalculator from '@/components/features/distance-calculator';
import VehiclePlateIdentifier from '@/components/features/vehicle-plate-identifier';
import TextAnalyzer from '@/components/features/text-analyzer';
import ImageOptimizer from '@/components/features/image-optimizer';
import TextSummarizer from '@/components/features/text-summarizer';
import RialTomanConverter from '@/components/features/rial-toman-converter';
import SavingsCalculator from '@/components/features/savings-calculator';
import NationalIdValidator from '@/components/features/national-id-validator';
import WorkoutTimer from '@/components/features/workout-timer';
import ShebaConverter from '@/components/features/sheba-converter';
import QrCodeGenerator from '@/components/features/qr-code-generator';
import QrCodeReader from '@/components/features/qr-code-reader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollToTop from '@/components/layout/scroll-to-top';
import { fetchPrices } from '@/ai/flows/fetch-prices-flow';
import type { LivePrice, PriceData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, BookText, FlaskConical, Scale, Landmark, CalendarDays, Repeat, SpellCheck, Binary, CalendarClock, Gift, Clock, Hourglass, Wallet, Bitcoin, Banknote, PiggyBank, TrendingUp, Percent, HeartPulse, Dumbbell, HeartPulse as HeartPulseIcon, User, ShieldCheck, Fingerprint, RectangleEllipsis, Dices, KeyRound, QrCode, ScanLine, LocateFixed, Image, Monitor, FileText, Map, Info, HeartHandshake, Globe, Wrench, ArrowUp, ArrowDown, RefreshCw, Timer, CandlestickChart, ExternalLink, Construction, Calculator } from 'lucide-react';
import ImageNext from 'next/image';
import AdvancedLivePrices from '@/components/features/advanced-live-prices';
import { Badge } from '@/components/ui/badge';


const toolCategories = [
  {
    title: 'ابزارهای هوش مصنوعی',
    icon: <BrainCircuit className="h-6 w-6 text-primary-foreground" />,
    tools: [
       { id: 'text-summarizer', title: 'خلاصه‌ساز هوشمند', icon: <BookText className="h-8 w-8 text-cyan-400" />, component: <TextSummarizer /> },
    ]
  },
  {
    title: 'مبدل‌ها',
    icon: <FlaskConical className="h-6 w-6 text-primary-foreground" />,
    tools: [
      { id: 'unit-converter', title: 'تبدیل واحد', icon: <Scale className="h-8 w-8 text-blue-400" />, component: <UnitConverter /> },
      { id: 'currency-converter', title: 'تبدیل ارز', icon: <Landmark className="h-8 w-8 text-green-400" />, component: <CurrencyConverter /> },
      { id: 'date-converter', title: 'تبدیل تاریخ', icon: <CalendarDays className="h-8 w-8 text-purple-400" />, component: <DateConverter /> },
      { id: 'rial-toman-converter', title: 'ریال و تومان', icon: <Repeat className="h-8 w-8 text-emerald-400" />, component: <RialTomanConverter /> },
      { id: 'number-to-words', title: 'عدد به حروف', icon: <SpellCheck className="h-8 w-8 text-amber-400" />, component: <NumberToWordsConverter /> },
      { id: 'number-system', title: 'تبدیل ارقام', icon: <Binary className="h-8 w-8 text-sky-400" />, component: <NumberSystemConverter /> },
      { id: 'binary-converter', title: 'متن و باینری', icon: <Binary className="h-8 w-8 text-cyan-400" />, component: <BinaryConverter /> },
    ]
  },
  {
    title: 'ابزارهای زمان و تاریخ',
    icon: <CalendarClock className="h-6 w-6 text-primary-foreground" />,
    tools: [
      { id: 'age-calculator', title: 'محاسبه سن', icon: <Gift className="h-8 w-8 text-pink-400" />, component: <AgeCalculator /> },
      { id: 'stopwatch', title: 'کرونومتر', icon: <Clock className="h-8 w-8 text-indigo-400" />, component: <Stopwatch /> },
      { id: 'countdown-timer', title: 'تایمر شمارش معکوس', icon: <Hourglass className="h-8 w-8 text-blue-400" />, component: <CountdownTimer /> },
    ]
  },
    {
    title: 'محاسبات عمومی و مالی',
    icon: <Wallet className="h-6 w-6 text-primary-foreground" />,
    tools: [
      { id: 'crypto-converter', title: 'نرخ ارز دیجیتال', icon: <Bitcoin className="h-8 w-8 text-orange-400" />, component: <CryptoConverter /> },
      { id: 'loan-calculator', title: 'اقساط وام', icon: <Banknote className="h-8 w-8 text-rose-400" />, component: <LoanCalculator /> },
      { id: 'deposit-calculator', title: 'سود سپرده', icon: <PiggyBank className="h-8 w-8 text-emerald-400" />, component: <DepositCalculator /> },
      { id: 'savings-calculator', title: 'محاسبه‌گر پس‌انداز', icon: <TrendingUp className="h-8 w-8 text-lime-400" />, component: <SavingsCalculator /> },
      { id: 'percentage-calculator', title: 'محاسبه درصد', icon: <Percent className="h-8 w-8 text-teal-400" />, component: <PercentageCalculator /> },
    ]
  },
  {
    title: 'ورزش و سلامت',
    icon: <HeartPulse className="h-6 w-6 text-primary-foreground" />,
    tools: [
      { id: 'workout-timer', title: 'زمان‌سنج تمرین', icon: <Dumbbell className="h-8 w-8 text-orange-400" />, component: <WorkoutTimer /> },
      { id: 'bmi-calculator', title: 'محاسبه BMI', icon: <HeartPulseIcon className="h-8 w-8 text-red-400" />, component: <BmiCalculator /> },
    ]
  },
  {
    title: 'ابزارهای کاربردی',
    icon: <User className="h-6 w-6 text-primary-foreground" />,
    tools: [
      { id: 'sheba-converter', title: 'ابزار شبا/حساب', icon: <ShieldCheck className="h-8 w-8 text-green-500" />, component: <ShebaConverter /> },
      { id: 'national-id-validator', title: 'بررسی صحت و شهر شماره ملی', icon: <Fingerprint className="h-8 w-8 text-teal-400" />, component: <NationalIdValidator /> },
      { id: 'vehicle-plate-identifier', title: 'هوشمند پلاک', icon: <RectangleEllipsis className="h-8 w-8 text-indigo-400" />, component: <VehiclePlateIdentifier /> },
      { id: 'random-number', title: 'عدد تصادفی', icon: <Dices className="h-8 w-8 text-orange-400" />, component: <RandomNumberGenerator /> },
      { id: 'password-generator', title: 'تولید رمز عبور', icon: <KeyRound className="h-8 w-8 text-violet-400" />, component: <PasswordGenerator /> },
      { id: 'qr-code-generator', title: 'QR Code ساز', icon: <QrCode className="h-8 w-8 text-emerald-400" />, component: <QrCodeGenerator /> },
      { id: 'qr-code-reader', title: 'QR Code خوان', icon: <ScanLine className="h-8 w-8 text-blue-400" />, component: <QrCodeReader /> },
      { id: 'image-optimizer', title: 'کاهش حجم تصویر', icon: <Image className="h-8 w-8 text-orange-400" />, component: <ImageOptimizer /> },
      { id: 'text-analyzer', title: 'تحلیلگر متن', icon: <FileText className="h-8 w-8 text-yellow-400" />, component: <TextAnalyzer /> },
      { id: 'distance-calculator', title: 'محاسبه مسافت', icon: <Map className="h-8 w-8 text-fuchsia-400" />, component: <DistanceCalculator /> },
      { id: 'ip-detector', title: 'تشخیص IP', icon: <LocateFixed className="h-8 w-8 text-sky-400" />, isWip: true },
    ]
  }
];


export default async function Home() {
  const initialPrices = await fetchPrices();
    
  return (
    <div className="min-h-screen bg-background relative">
      <ClientLoading />
      <Header />
      <main className="main-content relative z-10">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">

          <AdvancedLivePrices initialData={initialPrices} />


          {/* Toolbox Shortcuts */}
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-8 mb-6 sm:mb-10">
             <h2 className="col-span-12 text-xl sm:text-2xl font-display font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-glow">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/80 to-accent/80 rounded-xl flex items-center justify-center animate-pulse">
                  <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground"/>
              </div>
              <span className="text-ellipsis">جعبه ابزار</span>
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {toolCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="text-base sm:text-lg font-semibold font-display text-foreground/90 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary/70 to-accent/70 rounded-lg flex items-center justify-center flex-shrink-0">
                      {category.icon}
                    </div>
                    <span className="text-ellipsis">{category.title}</span>
                  </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                    {category.tools.map((tool) => {
                      const typedTool = tool as any;
                      const content = (
                        <div className="glass-effect rounded-xl sm:rounded-2xl p-2 sm:p-4 w-full h-full flex flex-col items-center justify-center text-center gap-2 sm:gap-3 relative overflow-hidden min-h-[80px] sm:min-h-[100px]">
                          {typedTool.isWip && <Badge variant="secondary" className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-400/20 text-yellow-600 border-none text-xs">بزودی</Badge>}
                          <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">{tool.icon}</div>
                          <span className="font-semibold text-xs sm:text-sm text-foreground text-ellipsis leading-tight">{tool.title}</span>
                        </div>
                      );
                      if(typedTool.isWip) {
                          return <div key={`shortcut-${tool.id}`} className="block opacity-60 cursor-not-allowed">{content}</div>
                      }
                      return (
                      <a href={typedTool.href || `#${tool.id}`} key={`shortcut-${tool.id}`} className="block card-hover" target={typedTool.isExternal ? '_blank' : '_self'}>
                        {content}
                      </a>
                    )}
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools Sections */}
          <div className="space-y-8 sm:space-y-12">
            {toolCategories.map((category) => (
              <div key={`category-section-${category.title}`} className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground text-glow border-r-4 border-primary pr-3 sm:pr-4">
                  {category.title}
                </h2>
                {category.tools.map((tool) => {
                    const typedTool = tool as any;
                    if (typedTool.isWip) {
                      return (
                        <Card key={tool.id} id={tool.id} className="glass-effect scroll-mt-24 opacity-70">
                            <CardHeader>
                              <CardTitle className='flex items-center justify-between text-xl font-display text-muted-foreground'>
                                 <div className='flex items-center gap-3'>
                                     {React.cloneElement(tool.icon, { className: "h-7 w-7" })}
                                     {tool.title}
                                 </div>
                                 <Badge variant="outline">به‌زودی...</Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-24 gap-4">
                                  <Construction className="w-12 h-12" />
                                  <p>این ابزار در حال توسعه است و به‌زودی فعال خواهد شد.</p>
                                </div>
                            </CardContent>
                        </Card>
                      )
                    }
                    if (typedTool.isExternal) {
                      return (
                        <a key={tool.id} href={typedTool.href} target="_blank" rel="noopener noreferrer">
                            <Card id={tool.id} className="glass-effect card-hover scroll-mt-24">
                              <CardHeader>
                                <CardTitle className='flex items-center justify-between text-xl font-display'>
                                   <div className='flex items-center gap-3'>
                                       {React.cloneElement(tool.icon, { className: "h-7 w-7" })}
                                       {tool.title}
                                   </div>
                                   <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                      مشاهده
                                      <ExternalLink className="h-5 w-5" />
                                   </div>
                                </CardTitle>
                              </CardHeader>
                            </Card>
                        </a>
                      )
                    }
                    return (
                        <Card key={tool.id} id={tool.id} className="glass-effect scroll-mt-24">
                          <CardHeader>
                            <CardTitle className='flex items-center gap-3 text-xl font-display'>
                              {React.cloneElement(tool.icon, { className: "h-7 w-7" })}
                              {tool.title}
                            </CardTitle>
                          </CardHeader>
                          {typedTool.component}
                        </Card>
                    )
                })}
              </div>
            ))}
          </div>
          
           {/* About Us Section */}
           <div className="mt-8 sm:mt-12 glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
             <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-right">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-primary/80 to-accent/80 rounded-2xl inline-flex animate-pulse flex-shrink-0">
                    <Info className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground"/>
                </div>
               <div className='flex-grow'>
                  <h3 className="text-lg sm:text-xl font-semibold font-display text-foreground">درباره «تبدیلا»</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-sm sm:text-base">
                    «تبدیلا» فقط یک ابزار نیست؛ یک دستیار هوشمند برای تمام لحظاتی است که به محاسبات و تبدیلات سریع، دقیق و زیبا نیاز دارید. ما با وسواس، مجموعه‌ای از بهترین ابزارهای روزمره را در یک پلتفرم مدرن و چشم‌نواز گرد هم آورده‌ایم تا کار شما را آسان‌تر کنیم.
                  </p>
               </div>
             </div>
           </div>
           
           {/* Financial Support Section */}
           <div className="mt-4 sm:mt-6 glass-effect rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex-grow flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-right">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl inline-flex animate-pulse flex-shrink-0">
                        <HeartHandshake className="h-8 w-8 sm:h-10 sm:w-10 text-white"/>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg sm:text-xl font-semibold font-display text-foreground">حمایت از توسعه «تبدیلا»</h3>
                        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                           اگر «تبدیلا» برایتان مفید بوده، با حمایت خود به رشد و پیشرفت آن کمک کنید. هر حمایتی، انرژی ما را برای ساخت ابزارهای بهتر دوچندان می‌کند.
                        </p>
                    </div>
                </div>
                 <a href="https://idpay.ir/tbdila" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto">
                        حمایت می‌کنم
                        <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </a>
            </div>
           </div>
        </div>
      </main>
      <footer className="relative z-10 text-center p-4 sm:p-6 text-muted-foreground text-xs sm:text-sm font-body space-y-3 sm:space-y-4 bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="inline-flex items-center justify-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-ellipsis">
                  توسعه داده شده توسط <a href="https://www.hosseintaheri.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline">حسین طاهری</a>
                </span>
            </div>
             <div className="inline-flex items-center justify-center gap-2">
                <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-ellipsis">
                  آخرین بروزرسانی: شهریور 1404
                </span>
            </div>
        </div>
        <div className="pt-2 border-t border-border/50 w-full max-w-lg mx-auto mt-2 sm:mt-4">
            <p className="text-xs sm:text-sm leading-relaxed">
              تمام حقوق مادی و معنوی این وبسایت متعلق به مجموعه تبدیلا است.
            </p>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
