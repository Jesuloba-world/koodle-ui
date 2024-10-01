import { AuthWrapper } from "@/components/auth/authWrapper";
import { ResetPasswordSetForm } from "@/components/forms/resetPasswordSetForm";

export default function SetNewPassword() {
	return (
		<AuthWrapper back>
			<ResetPasswordSetForm />
		</AuthWrapper>
	);
}
