"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
	useResendEmailVerificationOtp,
	useVerifyEmailWithOtp,
} from "@/hooks/auth";

const otpSchema = z.object({
	otp: z.string().min(6).max(6),
});

export const VerifyEmailForm = () => {
	const router = useRouter();
	const [countdown, setCountdown] = useState(59);

	const { mutate: resendEmailOTP, isPending: isResending } =
		useResendEmailVerificationOtp();

	const { mutate: verifyEmail, isPending: isVerifying } =
		useVerifyEmailWithOtp();

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const form = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: "",
		},
	});

	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	if (!email) {
		router.replace("/auth/signup");
	}

	function onSubmit(values: z.infer<typeof otpSchema>) {
		verifyEmail(
			{ email: email!, otp: values.otp },
			{
				onSuccess: () => {
					form.reset();
					const searchParams = new URLSearchParams({
						email: email!,
						otp: values.otp,
					});
					router.push(
						`/auth/signup/set-password?${searchParams.toString()}`
					);
				},
			}
		);
	}

	async function handleResendOTP() {
		resendEmailOTP(
			{ email: email! },
			{
				onSuccess: () => {
					setCountdown(59);
				},
			}
		);
	}

	return (
		<div className="flex flex-col px-5 gap-4">
			<div>
				<h4 className="text-2xl font-bold">Enter verification code</h4>
				<p className="text-foreground">
					The verification code has been sent to your email {email}
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6 flex flex-col"
				>
					<FormField
						control={form.control}
						name="otp"
						render={({ field }) => (
							<FormItem className="self-center">
								<FormControl>
									<InputOTP
										maxLength={6}
										onComplete={(value) => {
											// field.onChange(value);
											form.handleSubmit(onSubmit)();
										}}
										{...field}
									>
										{Array.from({ length: 6 }).map(
											(_, index) => (
												<InputOTPGroup key={index}>
													<InputOTPSlot
														index={index}
													/>
												</InputOTPGroup>
											)
										)}
									</InputOTP>
								</FormControl>
								{/* <FormMessage /> */}
							</FormItem>
						)}
					/>
					<p>
						Not received yet?{" "}
						<Button
							size={"link"}
							variant={"ghost2"}
							className="text-base font-bold hover:text-primary disabled:text-foreground-2"
							disabled={countdown > 0 || isResending}
							type="button"
							onClick={handleResendOTP}
						>
							{isResending ? "Resending" : "Resend"}{" "}
							{countdown > 0
								? `after ${countdown} second${countdown <= 1 ? "" : "s"}`
								: null}
						</Button>
					</p>
				</form>
			</Form>
		</div>
	);
};
