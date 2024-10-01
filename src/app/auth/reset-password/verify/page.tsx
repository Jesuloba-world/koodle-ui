import { AuthWrapper } from "@/components/auth/authWrapper";
import { VerifyResetPasswordOTPForm } from "@/components/forms/verifyResetPasswordOtpForm";

export default function VerifyResetPasswordOTP() {
	return (
		<AuthWrapper back>
			<VerifyResetPasswordOTPForm />
		</AuthWrapper>
	);
}
