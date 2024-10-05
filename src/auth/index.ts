import NextAuth from "next-auth";
import { SignUpProvider } from "./completeSignUpProvider";
import { LoginProvider } from "./loginProvider";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [SignUpProvider, LoginProvider],
	callbacks: {
		jwt: ({ user, token }) => {
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
		}),
	},
});
