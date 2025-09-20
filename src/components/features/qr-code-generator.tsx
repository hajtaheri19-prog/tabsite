"use client";

import { useState, useEffect, useRef } from 'react';
import QRCodeStyling, { type Options as QRCodeOptions, type FileExtension, type DotType, type CornerSquareType } from 'qr-code-styling';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Palette, Upload, Link as LinkIcon, Text, Wifi, Mail, Phone, Droplet } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

const defaultOptions: QRCodeOptions = {
  width: 256,
  height: 256,
  type: 'svg',
  data: 'https://tabdila.com',
  image: '',
  margin: 20,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'M', // Changed to Medium for better compatibility
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.3,
    margin: 10,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    color: '#000000',
    type: 'square', // Changed to square for better scanner compatibility
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'square', // Changed to square for better scanner compatibility
  },
};

const dotTypes: { value: DotType; label: string }[] = [
    { value: "square", label: "مربعی (بهترین سازگاری)" },
    { value: "rounded", label: "گرد" },
    { value: "dots", label: "نقطه‌ای" },
    { value: "classy", label: "کلاسیک" },
    { value: "classy-rounded", label: "کلاسیک-گرد" },
    { value: "extra-rounded", label: "بسیار گرد" },
];

const cornerTypes: { value: CornerSquareType; label: string }[] = [
    { value: "square", label: "مربعی (بهترین سازگاری)" },
    { value: "extra-rounded", label: "بسیار گرد" },
    { value: "dot", label: "نقطه‌ای" },
];

const errorCorrectionLevels: { value: 'L' | 'M' | 'Q' | 'H'; label: string; description: string }[] = [
    { value: 'L', label: 'کم (L)', description: 'حدود ۷٪ خطا قابل تصحیح' },
    { value: 'M', label: 'متوسط (M)', description: 'حدود ۱۵٪ خطا قابل تصحیح (پیشنهادی)' },
    { value: 'Q', label: 'بالا (Q)', description: 'حدود ۲۵٪ خطا قابل تصحیح' },
    { value: 'H', label: 'بسیار بالا (H)', description: 'حدود ۳۰٪ خطا قابل تصحیح' },
];

type QrContentType = 'link' | 'text' | 'wifi' | 'email' | 'phone';

const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void}) => (
    <div className='flex items-center justify-between'>
        <Label>{label}</Label>
        <div className="relative">
            <Input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-16 h-10 p-1"/>
        </div>
    </div>
);

const ContentTypeTabs = ({ qrType, setQrType, link, setLink, text, setText, wifi, setWifi, email, setEmail, phone, setPhone, size, setSize }: any) => {
    const contentTabs: { type: QrContentType, icon: React.ReactNode, label: string }[] = [
        { type: 'link', icon: <LinkIcon className="w-5 h-5" />, label: 'لینک' },
        { type: 'text', icon: <Text className="w-5 h-5" />, label: 'متن' },
        { type: 'wifi', icon: <Wifi className="w-5 h-5" />, label: 'WiFi' },
        { type: 'email', icon: <Mail className="w-5 h-5" />, label: 'ایمیل' },
        { type: 'phone', icon: <Phone className="w-5 h-5" />, label: 'تلفن' },
    ];
    return (
        <Accordion type="single" collapsible className="w-full" defaultValue='item-1'>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold font-display text-foreground">
                    <div className="flex items-center gap-2">
                        <LinkIcon className="w-6 h-6 text-primary"/>
                        محتوای QR Code
                    </div>
                </AccordionTrigger>
                <AccordionContent className='space-y-4 pt-4'>
                    <Select defaultValue={qrType} onValueChange={(val) => setQrType(val as QrContentType)}>
                        <SelectTrigger className="h-12 text-base">
                             <SelectValue placeholder="نوع محتوا را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                             {contentTabs.map(tab => (
                                <SelectItem key={tab.type} value={tab.type}>
                                    <div className="flex items-center gap-2">
                                        {tab.icon} {tab.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    {qrType === 'link' && <div className="space-y-4">
                        <Label htmlFor="qr-link" className="text-muted-foreground">آدرس اینترنتی (URL)</Label>
                        <Input id="qr-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" dir="ltr" className="h-12 text-lg text-center" />
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-muted-foreground">اندازه</Label>
                                <span className="text-sm font-mono text-primary">{size}px</span>
                            </div>
                            <Slider value={[size]} onValueChange={(val) => setSize(val[0])} min={128} max={1024} step={16} />
                        </div>
                    </div>}
                    {qrType === 'text' && <>
                         <Label htmlFor="qr-text" className="text-muted-foreground">متن</Label>
                        <Textarea id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="متن خود را وارد کنید..."/>
                    </>}
                    {qrType === 'wifi' && <div className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="wifi-ssid">نام شبکه (SSID)</Label>
                            <Input id="wifi-ssid" value={wifi.ssid} onChange={e => setWifi((w:any) => ({ ...w, ssid: e.target.value }))} dir="ltr" />
                         </div>
                         <div className="space-y-2">
                            <Label>نوع رمزنگاری</Label>
                            <Select value={wifi.encryption} onValueChange={(val) => setWifi((w:any) => ({...w, encryption: val}))}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                                    <SelectItem value="WEP">WEP</SelectItem>
                                    <SelectItem value="nopass">None</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                         {wifi.encryption !== 'nopass' && (
                             <div className="space-y-2">
                                <Label htmlFor="wifi-pass">رمز عبور</Label>
                                <Input id="wifi-pass" type="password" value={wifi.password} onChange={e => setWifi((w:any) => ({ ...w, password: e.target.value }))} dir="ltr" />
                             </div>
                         )}
                    </div>}
                     {qrType === 'email' && <div className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="email-to">گیرنده (To)</Label>
                            <Input id="email-to" type="email" value={email.to} onChange={e => setEmail((em:any) => ({...em, to: e.target.value}))} placeholder="address@example.com" dir="ltr" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email-subject">موضوع</Label>
                            <Input id="email-subject" value={email.subject} onChange={e => setEmail((em:any) => ({...em, subject: e.target.value}))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email-body">متن ایمیل</Label>
                            <Textarea id="email-body" value={email.body} onChange={e => setEmail((em:any) => ({...em, body: e.target.value}))} />
                        </div>
                    </div>}
                    {qrType === 'phone' && <>
                        <Label htmlFor="qr-phone" className="text-muted-foreground">شماره تلفن</Label>
                        <Input id="qr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+989123456789" dir="ltr" className="h-12 text-lg text-center" />
                    </>}

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default function QrCodeGenerator() {
  const [options, setOptions] = useState<QRCodeOptions>(defaultOptions);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [qrType, setQrType] = useState<QrContentType>('link');
  const [size, setSize] = useState(180);
  
  // State for different content types
  const [link, setLink] = useState('https://tabdila.com');
  const [text, setText] = useState('سلام از طرف تبدیلا!');
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [email, setEmail] = useState({ to: '', subject: '', body: '' });
  const [phone, setPhone] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let data = '';
    switch (qrType) {
        case 'link': data = link; break;
        case 'text': data = text; break;
        case 'wifi':
            if (wifi.encryption === 'nopass') {
                 data = `WIFI:T:nopass;S:${wifi.ssid};;`;
            } else {
                 data = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
            }
            break;
        case 'email': data = `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`; break;
        case 'phone': data = `tel:${phone}`; break;
    }
    handleUpdate({ data });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrType, link, text, wifi, email, phone]);
  
   useEffect(() => {
    handleUpdate({ width: size, height: size });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (!qrCode) {
        const qr = new QRCodeStyling(options)
        setQrCode(qr);
        if (ref.current) {
            ref.current.innerHTML = "";
            qr.append(ref.current);
        }
    } else {
        qrCode.update(options);
    }
  }, [options, qrCode]);
  
  const handleUpdate = (newOptions: Partial<QRCodeOptions>) => {
    setOptions(prev => ({...prev, ...newOptions}));
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
            handleUpdate({ image: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDownloadClick = (extension: FileExtension) => {
    if (!qrCode) return;
    qrCode.download({
      name: 'tabdila-qrcode',
      extension,
    });
    toast({ title: 'دانلود شروع شد!', description: `فایل QR Code با فرمت ${extension} در حال دانلود است.`});
  };

  return (
    <CardContent className="flex flex-col gap-8 items-center">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start w-full">
            {/* Options Section */}
            <div className="md:col-span-2 space-y-4">
                 <ContentTypeTabs {...{ qrType, setQrType, link, setLink, text, setText, wifi, setWifi, email, setEmail, phone, setPhone, size, setSize }} />
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-semibold font-display text-foreground">
                             <div className="flex items-center gap-2">
                                <Palette className="w-6 h-6 text-primary"/>
                                طراحی QR Code
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='space-y-6 pt-4'>
                             <div className="grid grid-cols-2 gap-4">
                               <ColorPicker label="رنگ QR" value={options.dotsOptions?.color || '#000000'} onChange={color => handleUpdate({ dotsOptions: { ...options.dotsOptions, color }, cornersSquareOptions: { ...options.cornersSquareOptions, color } })} />
                               <ColorPicker label="رنگ پس‌زمینه" value={options.backgroundOptions?.color || '#FFFFFF'} onChange={color => handleUpdate({ backgroundOptions: { ...options.backgroundOptions, color }})} />
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className='space-y-2'>
                                    <Label>شکل نقاط</Label>
                                    <Select value={options.dotsOptions?.type} onValueChange={(type: DotType) => handleUpdate({ dotsOptions: { ...options.dotsOptions, type }})}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>{dotTypes.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label>شکل گوشه‌ها</Label>
                                    <Select value={options.cornersSquareOptions?.type} onValueChange={(type: CornerSquareType) => handleUpdate({ cornersSquareOptions: { ...options.cornersSquareOptions, type }})}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>{cornerTypes.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className='space-y-2'>
                                <Label>سطح تصحیح خطا</Label>
                                <Select value={options.qrOptions?.errorCorrectionLevel} onValueChange={(level: 'L' | 'M' | 'Q' | 'H') => handleUpdate({ qrOptions: { ...options.qrOptions, errorCorrectionLevel: level }})}>
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        {errorCorrectionLevels.map(level => (
                                            <SelectItem key={level.value} value={level.value}>
                                                <div>
                                                    <div className="font-medium">{level.label}</div>
                                                    <div className="text-xs text-muted-foreground">{level.description}</div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className='space-y-4'>
                                <Label>لوگو</Label>
                                <Input id="logo-url" value={options.image} onChange={(e) => handleUpdate({ image: e.target.value })} placeholder="آدرس URL لوگو را وارد کنید..." dir="ltr"/>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 ml-2"/> آپلود لوگو
                                    </Button>
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/png, image/jpeg, image/svg+xml" />
                                     <Button variant="ghost" onClick={() => handleUpdate({ image: '' })} className="text-destructive">حذف لوگو</Button>
                                </div>
                            </div>
                             <Button variant="outline" className="w-full" onClick={() => handleUpdate({ backgroundOptions: { ...options.backgroundOptions, color: 'transparent' }})}>
                               <Droplet className="w-4 h-4 ml-2" />
                               پس‌زمینه شفاف
                           </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

             {/* Preview Section */}
            <div className="flex flex-col items-center justify-start gap-4">
                <div className="p-6 rounded-xl shadow-lg border bg-white sticky top-28">
                    <div ref={ref} />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">پیش‌نمایش زنده</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        اندازه: {size}×{size}px | 
                        سطح خطا: {errorCorrectionLevels.find(l => l.value === options.qrOptions?.errorCorrectionLevel)?.label}
                    </p>
                </div>
                
                {/* Quality indicator */}
                <div className="w-full max-w-xs">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>کیفیت اسکن</span>
                        <span>
                            {options.qrOptions?.errorCorrectionLevel === 'H' ? 'عالی' :
                             options.qrOptions?.errorCorrectionLevel === 'Q' ? 'خوب' :
                             options.qrOptions?.errorCorrectionLevel === 'M' ? 'متوسط' : 'کم'}
                        </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${
                                options.qrOptions?.errorCorrectionLevel === 'H' ? 'bg-green-500' :
                                options.qrOptions?.errorCorrectionLevel === 'Q' ? 'bg-blue-500' :
                                options.qrOptions?.errorCorrectionLevel === 'M' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{
                                width: options.qrOptions?.errorCorrectionLevel === 'H' ? '100%' :
                                       options.qrOptions?.errorCorrectionLevel === 'Q' ? '75%' :
                                       options.qrOptions?.errorCorrectionLevel === 'M' ? '50%' : '25%'
                            }}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 w-full">
                    <Button onClick={() => onDownloadClick('png')} className="h-12 text-base">
                        <Download className="w-5 h-5 ml-2"/> PNG
                    </Button>
                    <Button onClick={() => onDownloadClick('svg')} variant="secondary" className="h-12 text-base">
                        <Download className="w-5 h-5 ml-2"/> SVG
                    </Button>
                    <Button onClick={() => onDownloadClick('webp')} variant="secondary" className="h-12 text-base">
                        <Download className="w-5 h-5 ml-2"/> WebP
                    </Button>
                </div>
                
                {/* QR Code info */}
                <div className="w-full max-w-xs p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span>نوع:</span>
                            <span className="font-mono">{options.qrOptions?.mode}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>اندازه:</span>
                            <span className="font-mono">{size}×{size}px</span>
                        </div>
                        <div className="flex justify-between">
                            <span>حاشیه:</span>
                            <span className="font-mono">{options.margin}px</span>
                        </div>
                        <div className="flex justify-between">
                            <span>سازگاری:</span>
                            <span className="text-green-600">عالی</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CardContent>
  );
}
