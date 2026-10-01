import { AuthBranding } from "@/components/auth/auth-branding";
import { AuthFooter } from "@/components/auth/auth-footer";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  children: React.ReactNode;
  wide?: boolean;
};

export function AuthCard({ children, wide = false }: AuthCardProps) {
  return (
    <div
      className={cn(
        "flex w-full min-h-[700px] rounded-2xl border-[5px] border-black flex-col justify-center items-center px-4 py-8 sm:px-6 sm:pb-6",
        wide ? "max-w-[1180px]" : "max-w-[1024px]",
      )}
    >
      <div className="flex w-full flex-1 items-center">
        <div className="w-full overflow-hidden bg-white">
          <div
            className={cn(
              "grid grid-cols-1",
              wide ? "lg:grid-cols-[36%_64%]" : "lg:grid-cols-[45%_55%]",
            )}
          >
            <AuthBranding />
            <div className="relative flex justify-center items-center">
              {children}
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
