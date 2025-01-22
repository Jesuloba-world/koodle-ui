import { client, setPasswordForUser } from "@/client";
import Credentials from "next-auth/providers/credentials";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export const SignUpProvider = Credentials({
	id: "completesignup",
	credentials: {
		email: { type: "email" },
		password: { type: "password" },
		otp: { type: "text" },
	},
	authorize: async (credentials) => {
		try {
			const response = await setPasswordForUser({
				body: {
					email: credentials.email as string,
					password: credentials.password as string,
					otp: credentials.otp as string,
				},
			});
			const expiryTime = new Date(new Date().getTime() + 60 * 60 * 1000);
			if (response.data) {
				return {
					id: response.data.user.id,
					email: response.data.user.email,
					token: response.data.accesstoken,
					refresh: response.data.refreshtoken,
					tokenExpires: expiryTime.toISOString(),
				};
			} else throw new Error("An error occured during signup");
		} catch (err) {
			throw new Error((err as any).response.data.message);
		}
	},
});
