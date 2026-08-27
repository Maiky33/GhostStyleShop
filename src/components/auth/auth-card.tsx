import { AuthBranding } from "@/components/auth/auth-branding";
import { AuthFooter } from "@/components/auth/auth-footer";

type AuthCardProps = {
  children: React.ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="flex w-full min-h-[700px] max-w-[1024px] rounded-2xl border-[5px] border-black flex-col justify-center items-center px-4 py-8 sm:px-6 sm:pb-6">
      <div className="flex w-full flex-1 items-center"> 
        <div className="w-full overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
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
