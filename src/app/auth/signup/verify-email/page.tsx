import { AuthWrapper } from "@/components/auth/authWrapper";
import { VerifyEmailForm } from "@/components/forms/verifyEmailForm";

export default function VerifyEmail() {
	return (
		<AuthWrapper back>
			<VerifyEmailForm />
		</AuthWrapper>
	);
}
