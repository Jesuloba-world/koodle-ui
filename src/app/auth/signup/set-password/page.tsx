import { AuthWrapper } from "@/components/auth/authWrapper";
import { SetPasswordForm } from "@/components/forms/setPasswordForm";

export default function SetPassword() {
	return (
		<AuthWrapper back>
			<SetPasswordForm />
		</AuthWrapper>
	);
}
