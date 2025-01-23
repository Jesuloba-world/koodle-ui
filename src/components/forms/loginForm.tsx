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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const loginSchema = z.object({
	email: z.string().min(1, "Can't be empty").email(),
	password: z.string().min(1, "Can't be empty"),
});

export const LoginForm = () => {
	const router = useRouter();

	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsPending(true);
		signIn("login", {
			redirect: false,
			email: values.email,
			password: values.password,
		})
			.then((response) => {
				if (response?.error) {
					// TODO: handle error
					console.log(response);
				}
				if (response?.ok && !response.error) {
					router.push("/boards");
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setIsPending(false);
			});
	}

	return (
		<div className="flex flex-col">
			<h4 className="text-lg font-bold self-center mb-2">
				Sign in to your account
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
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
					<Link href="/auth/reset-password">
						<Button variant={"link"} size={"link"} type="button">
							<span className="font-bold">Forgot password?</span>
						</Button>
					</Link>
					<Button
						fullWidth
						type="submit"
						isProcessing={isPending}
						disabled={isPending}
					>
						Continue
					</Button>
				</form>
			</Form>
			<p className="self-center mt-6 text-sm flex gap-1">
				Don&apos;t have an account?
				<Link href="/auth/signup">
					<Button variant={"link"} size={"link"}>
						<span className="font-bold">Create instead</span>
					</Button>
				</Link>
			</p>
		</div>
	);
};
