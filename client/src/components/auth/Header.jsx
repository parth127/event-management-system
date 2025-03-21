import { Poppins } from "next/font/google";
import { cn } from "@/app/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export function Header({ label }) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>{label}</h1>
    </div>
  );
}
