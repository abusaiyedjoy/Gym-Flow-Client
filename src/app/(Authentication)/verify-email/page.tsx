

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
            <p className="mb-4 text-gray-700">
                A verification link has been sent to your email address. Please check your inbox and click on the link to verify your account.
            </p>
            <p className="mb-6 text-gray-700">
                If you did not receive the email, please check your spam folder or click the button below to resend the verification email.
            </p>
            <button
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
                Resend Verification Email
            </button>
        </div>
    </div>
  );
};

export default VerifyEmailPage;