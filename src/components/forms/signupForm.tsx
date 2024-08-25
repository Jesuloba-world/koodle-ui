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

const emailSchema = z.object({
	email: z.string().min(1, "Can't be empty").email(),
});

export const SignupForm = () => {
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof emailSchema>) {
		console.log(values);
	}

	return (
		<div className="flex flex-col">
			<h4 className="text-lg font-bold self-center mb-2">
				Create your account
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your Email"
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
			<p className="self-center mt-6 text-sm flex gap-1">
				Already had an account?
				<Link href="/auth/login">
					<Button variant={"link"} size={"link"} asChild>
						<span className="font-bold">login instead</span>
					</Button>
				</Link>
			</p>
		</div>
	);
};
