import NextAuth from "next-auth";
import { SignUpProvider } from "./completeSignUpProvider";
import { LoginProvider } from "./loginProvider";
import { isBefore, parseISO } from "date-fns";
import { client, refreshToken } from "@/client";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [SignUpProvider, LoginProvider],
	callbacks: {
		jwt: async ({ user, token }) => {
			if (user) {
				return {
					email: user.email,
					refresh: user.refresh,
					token: user.token,
					id: user.id,
					tokenExpires: user.tokenExpires,
				};
			} else if (
				token.tokenExpires &&
				isBefore(new Date(), parseISO(token.tokenExpires))
			) {
				return token;
			} else {
				if (!token.refresh)
					throw new TypeError("Missing refresh token");

				try {
					const response = await refreshToken({
						body: { refreshtoken: token.refresh },
					});

					if (response.error) throw new Error(response.error.detail);

					const expiryTime = new Date(
						new Date().getTime() + 60 * 60 * 1000
					);

					return {
						...token,
						token: response.data.accesstoken,
						refresh: response.data.refreshtoken,
						tokenExpires: expiryTime.toISOString(),
					};
				} catch (err: any) {
					console.error("Error refreshing access_token", err);
					// If we fail to refresh the token, return an error so we can handle it on the page
					token.error = "RefreshTokenError";
					return token;
				}
			}
		},
		session: ({ session, token }) => ({
			token: token.token,
			user: {
				email: token.email,
				id: token.id,
			},
			expires: token.tokenExpires!,
			error: token.error,
		}),
	},
});
