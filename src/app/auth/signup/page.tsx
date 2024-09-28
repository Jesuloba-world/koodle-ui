import { AuthWrapper } from "@/components/auth/authWrapper";
import { SignupForm } from "@/components/forms/signupForm";

export default function SignUp() {
	return (
		<AuthWrapper>
			<SignupForm />
		</AuthWrapper>
	);
}
