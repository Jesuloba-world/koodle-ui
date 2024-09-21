import { SignUpComponent } from "@/components/auth/signup";
import { ThemeSwitch } from "@/components/themeSwitch";

export default function SignUp() {
	return (
		<div className="relative grid place-items-center min-h-screen">
			<div className="absolute top-0 right-0 p-8">
				<ThemeSwitch variant="2" />
			</div>
			<SignUpComponent />
		</div>
	);
}
