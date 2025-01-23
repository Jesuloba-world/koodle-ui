import NextAuth, { NextAuthConfig } from "next-auth";
import { SignUpProvider } from "./completeSignUpProvider";
import { LoginProvider } from "./loginProvider";
import { isBefore, parseISO } from "date-fns";
import { client, refreshToken } from "@/client";

export const authOptions: NextAuthConfig = {
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
			}
			return token;
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
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
