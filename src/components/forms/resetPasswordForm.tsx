"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const passwordSchema = z.object({
	email: z.string().min(1, "Can't be empty").email(),
});

export const ResetPasswordForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof passwordSchema>) {
		console.log(values);
		const searchParams = new URLSearchParams({
			email: values.email,
		});
		router.push(`/auth/reset-password/verify?${searchParams.toString()}`);
	}

	return (
		<div className="flex flex-col px-5 gap-4">
			<div>
				<h4 className="text-2xl font-bold">Forgot password</h4>
				<p className="text-foreground">
					Enter the email associated with your account, and we&apos;ll
					send you the verification code to reset your password.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email"
										error={fieldState.error}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button fullWidth type="submit">
						Continue
					</Button>
				</form>
			</Form>
		</div>
	);
};
