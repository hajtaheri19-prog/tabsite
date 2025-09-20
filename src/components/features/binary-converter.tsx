"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Binary as BinaryIcon, ArrowRightLeft, Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Convert text to UTF-8 bytes then to binary
const textToBinary = (text: string): string => {
  if (!text) return '';
  
  try {
    // Use TextEncoder to get proper UTF-8 bytes
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    
    return Array.from(bytes)
      .map(byte => byte.toString(2).padStart(8, '0'))
      .join(' ');
  } catch (e) {
    // Fallback for older browsers
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  }
};

// Convert binary to text using UTF-8 decoding
const binaryToText = (binary: string): string => {
  const cleanBinary = binary.trim().replace(/[^01\s]/g, '');
  if (cleanBinary === '') return '';

  try {
    const bytes = cleanBinary.split(/\s+/).filter(b => b);
    
    // Validate binary format
    if (bytes.some(b => !/^[01]{1,8}$/.test(b))) {
      return 'خطا: کد باینری معتبر نیست. هر بایت باید ۱ تا ۸ بیت باشد.';
    }
    
    // Convert binary to bytes
    const byteArray = bytes.map(byte => parseInt(byte, 2));
    
    // Use TextDecoder for proper UTF-8 decoding
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(new Uint8Array(byteArray));
  } catch (e) {
    return 'خطا در تبدیل باینری به متن. فرمت ورودی را بررسی کنید.';
  }
};

export default function BinaryConverter() {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    if (newText.trim() === '') {
      setBinary('');
      return;
    }
    
    setIsConverting(true);
    setTimeout(() => {
      setBinary(textToBinary(newText));
      setIsConverting(false);
    }, 100);
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newBinary = e.target.value;
    setBinary(newBinary);
    
    if (newBinary.trim() === '') {
      setText('');
      return;
    }
    
    setIsConverting(true);
    setTimeout(() => {
      setText(binaryToText(newBinary));
      setIsConverting(false);
    }, 100);
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'کپی شد!',
      description: `${type} در کلیپ‌بورد کپی شد.`,
    });
  };

  const clearAll = () => {
    setText('');
    setBinary('');
  };

  return (
    <CardContent className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="text-input" className="text-muted-foreground">متن (فارسی/انگلیسی)</Label>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(text, 'متن')}
              disabled={!text}
              className="text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Textarea
          id="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="سلام دنیا! Hello World!"
          className="min-h-[120px] text-base"
        />
        <p className="text-xs text-muted-foreground">
          {text.length} کاراکتر | {text.split('').filter(c => c !== ' ').length} کاراکتر (بدون فاصله)
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </div>
          {isConverting && (
            <div className="text-sm text-muted-foreground">در حال تبدیل...</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="binary-input" className="text-muted-foreground">کد باینری (Binary)</Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(binary, 'کد باینری')}
            disabled={!binary}
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          id="binary-input"
          value={binary}
          onChange={handleBinaryChange}
          placeholder="01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100"
          className="min-h-[120px] text-left font-mono text-sm"
          dir="ltr"
        />
        <p className="text-xs text-muted-foreground">
          {binary.split(' ').filter(b => b).length} بایت | {binary.replace(/\s/g, '').length} بیت
        </p>
      </div>

      {text && binary && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-semibold text-foreground mb-2">اطلاعات تبدیل:</h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <span className="font-medium">طول متن:</span> {text.length} کاراکتر
            </div>
            <div>
              <span className="font-medium">تعداد بایت:</span> {binary.split(' ').filter(b => b).length}
            </div>
            <div>
              <span className="font-medium">تعداد بیت:</span> {binary.replace(/\s/g, '').length}
            </div>
            <div>
              <span className="font-medium">نسبت فشرده‌سازی:</span> {((binary.replace(/\s/g, '').length / (text.length * 8)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
}
