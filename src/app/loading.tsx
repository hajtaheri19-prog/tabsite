import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 glass-effect rounded-2xl shadow-xl flex flex-col items-center gap-4">
        {/* Simple loading indicator */}
        <div className="flex items-center gap-3 text-xl font-bold text-primary">
          <Loader2 className="animate-spin w-6 h-6" />
          <span>در حال بارگذاری...</span>
        </div>
        
        {/* Simple progress indicator */}
        <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
