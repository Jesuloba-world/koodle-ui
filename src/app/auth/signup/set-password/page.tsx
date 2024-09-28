import { AuthWrapper } from "@/components/auth/authWrapper";
import { SetPasswordForm } from "@/components/forms/setPasswordForm";

export default function VerifyEmail() {
	return (
		<AuthWrapper back>
			<SetPasswordForm />
		</AuthWrapper>
	);
}
