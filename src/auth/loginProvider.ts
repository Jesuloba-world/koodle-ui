import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { client, loginUser } from "@/client";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

class InvalidLoginError extends CredentialsSignin {
	code = "Invalid email or password";
}

class UnknownError extends CredentialsSignin {
	code = "An error occurred during login";
}

export const LoginProvider = Credentials({
	id: "login",
	credentials: {
		email: { type: "email" },
		password: { type: "password" },
	},
	authorize: async (credentials) => {
		try {
			const response = await loginUser({
				body: {
					email: credentials.email as string,
					password: credentials.password as string,
				},
			});

			const expiryTime = new Date(new Date().getTime() + 60 * 60 * 1000);
			// const expiryTime = new Date(new Date().getTime() + 5 * 60 * 1000);

			if (response.data) {
				return {
					id: response.data.user.id,
					email: response.data.user.email,
					token: response.data.accesstoken,
					refresh: response.data.refreshtoken,
					tokenExpires: expiryTime.toISOString(),
				};
			} else throw new UnknownError();
		} catch (err: any) {
			const error = err.response.data.detail;
			console.log(error);
			if (error === "Invalid email or password") {
				throw new InvalidLoginError();
			} else {
				throw new UnknownError();
			}
		}
	},
});
