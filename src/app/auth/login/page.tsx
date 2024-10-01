import { AuthWrapper } from "@/components/auth/authWrapper";
import { LoginForm } from "@/components/forms/loginForm";

export default function Login() {
	return (
		<AuthWrapper>
			<LoginForm />
		</AuthWrapper>
	);
}
