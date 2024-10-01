import { AuthWrapper } from "@/components/auth/authWrapper";
import { ResetPasswordForm } from "@/components/forms/resetPasswordForm";

export default function ResetPassword() {
	return (
		<AuthWrapper back>
			<ResetPasswordForm />
		</AuthWrapper>
	);
}
