import Credentials from "next-auth/providers/credentials";
import { api } from "@/hooks/auth";

export const SignUpProvider = Credentials({
	id: "completesignup",
	credentials: {
		email: { type: "email" },
		password: { type: "password" },
		otp: { type: "text" },
	},
	authorize: async (credentials) => {
		try {
			const response = await api.setPasswordForUser({
				email: credentials.email as string,
				password: credentials.password as string,
				otp: credentials.otp as string,
			});
			const expiryTime = new Date(new Date().getTime() + 60 * 60 * 1000);
			return {
				id: response.data.user.ID,
				email: response.data.user.Email,
				token: response.data.accesstoken,
				refresh: response.data.refreshtoken,
				tokenExpires: expiryTime.toISOString(),
			};
		} catch (err) {
			throw new Error((err as any).response.data.message);
		}
	},
});
