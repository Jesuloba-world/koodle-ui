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
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[A-Za-z]/, "Password must contain at least one letter")
		.regex(/\d/, "Password must contain at least one number")
		.regex(/\p{P}|\p{S}/u, "Password must contain at least one symbol"),
});

export const SetPasswordForm = () => {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const otp = searchParams.get("otp");

	if (!email || !otp) {
		router.replace("/auth/signup");
	}

	const form = useForm<z.infer<typeof passwordSchema>>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof passwordSchema>) {
		// console.log(values);
		setIsPending(true);
		const response = await signIn("completesignup", {
			redirect: false,
			email: email,
			password: values.password,
			otp: otp,
		});
		setIsPending(false);
		if (response?.error) {
			// TODO: handle error
			console.log(response);
		}
		// redirect to dashboard page
		if (response?.ok && !response.error) {
			router.push("/boards");
		}
	}

	return (
		<div className="flex flex-col px-5 gap-4">
			<div>
				<h4 className="text-2xl font-bold">Set password</h4>
				<p className="text-foreground">
					Password requires a minimum of 8 characters and contains a
					mix of letters, numbers, and symbols.
				</p>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<FormField
						control={form.control}
						name="password"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Password"
										error={fieldState.error}
										type="password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button fullWidth type="submit" isProcessing={isPending}>
						Continue
					</Button>
				</form>
			</Form>
		</div>
	);
};
