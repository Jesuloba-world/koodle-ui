import { ThemeSwitch } from "@/components/themeSwitch";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative grid place-items-center min-h-screen sm:px-0 px-3">
			<div className="absolute bottom-0 right-1/2 translate-x-1/2 sm:translate-x-0 sm:top-0 sm:right-0 p-0 sm:p-8">
				<ThemeSwitch variant="2" />
			</div>
			{children}
		</div>
	);
}
