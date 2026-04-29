import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";

const LoginPage = () => {
    return (
        <AuthLayout>
            <AuthForm mode="login" />
        </AuthLayout>
    );
};

export default LoginPage;