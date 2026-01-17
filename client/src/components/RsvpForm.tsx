import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRsvpSchema } from "@shared/schema";
import { useCreateRsvp } from "@/hooks/use-rsvps";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import confetti from "canvas-confetti";
import type { z } from "zod";

type FormData = z.infer<typeof insertRsvpSchema>;

export function RsvpForm() {
  const { toast } = useToast();
  const mutation = useCreateRsvp();
  
  const form = useForm<FormData>({
    resolver: zodResolver(insertRsvpSchema),
    defaultValues: {
      attending: "yes",
      guestsCount: 1,
    }
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Xác nhận thành công!",
          description: "Cảm ơn bạn đã phản hồi lời mời của chúng mình.",
        });
        form.reset();
        
        // Celebration effect
        const end = Date.now() + 1000;
        const colors = ['#be185d', '#f472b6', '#fbbf24'];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      },
      onError: (error) => {
        toast({
          title: "Có lỗi xảy ra",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-primary/5 border border-primary/10">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground/80">Họ và Tên</label>
            <input
              {...form.register("name")}
              className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              placeholder="VD: Nguyễn Văn A"
            />
            {form.formState.errors.name && (
              <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground/80">Số điện thoại</label>
            <input
              {...form.register("phone")}
              className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              placeholder="0987..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground/80">Tham dự</label>
              <select
                {...form.register("attending")}
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              >
                <option value="yes">Sẽ tham dự</option>
                <option value="maybe">Có thể</option>
                <option value="no">Không thể tham dự</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground/80">Số người</label>
              <select
                {...form.register("guestsCount", { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} người</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground/80">Lời nhắn</label>
            <textarea
              {...form.register("message")}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
              placeholder="Gửi lời chúc đến cô dâu & chú rể..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Xác nhận tham dự
            </>
          )}
        </button>
      </form>
    </div>
  );
}
