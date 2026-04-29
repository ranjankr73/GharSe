import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";

const RegisterPage = () => {
    return (
        <AuthLayout>
            <AuthForm mode="register" />
        </AuthLayout>
    );
};

export default RegisterPage;