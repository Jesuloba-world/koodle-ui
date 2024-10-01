import NextAuth from "next-auth";
import { SignUpProvider } from "./completeSignUpProvider";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [SignUpProvider],
});
