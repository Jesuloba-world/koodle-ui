import NextAuth from "next-auth";
import { SignUpProvider } from "./completeSignUpProvider";
import { LoginProvider } from "./loginProvider";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [SignUpProvider, LoginProvider],
});
