import { auth } from "@/auth";
import { client } from "@/client";
import { getSession, signOut } from "next-auth/react";

export const initClient = () => {
	client.setConfig({
		baseURL: process.env.NEXT_PUBLIC_API_URL!,
	});

	const getAuthSession = async () => {
		if (typeof window !== "undefined") {
			return await getSession();
		}
		return await auth();
	};

	client.instance.interceptors.request.use(async (config) => {
		const session = await getAuthSession();

		if (!session?.token) {
			await signOut({
				redirect: true,
				redirectTo: "/auth/login",
			});
		}

		config.headers.Authorization = `Bearer ${session?.token}`;
		return config;
	});
};
