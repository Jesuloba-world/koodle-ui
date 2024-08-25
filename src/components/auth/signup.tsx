import { useTheme } from "next-themes";
import Logo from "@/assets/logo-mobile.svg";
import Image from "next/image";
import { DynamicLogo } from "../dynamicLogo";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "../forms/signupForm";

export const SignUpComponent = () => {
	return (
		<Card className="w-[480px]">
			<CardHeader className="flex flex-col items-center">
				<DynamicLogo />
			</CardHeader>
			<CardContent className="pt-10 pb-24">
				<SignupForm />
			</CardContent>
		</Card>
		// <div className="bg-background-2 flex flex-col gap-4">
		// </div>
	);
};
