import Credentials from "next-auth/providers/credentials";
import { api } from "@/hooks/auth";
import { ErrorModel } from "@/api-sdk";
import { CredentialsSignin } from "next-auth";

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
			const response = await api.loginUser({
				email: credentials.email as string,
				password: credentials.password as string,
			});
			const expiryTime = new Date(new Date().getTime() + 60 * 60 * 1000);
			return {
				id: response.data.user.ID,
				email: response.data.user.Email,
				token: response.data.accesstoken,
				refresh: response.data.refreshtoken,
				tokenExpires: expiryTime.toISOString(),
			};
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
