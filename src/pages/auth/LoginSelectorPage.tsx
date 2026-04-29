import AuthLayout from "../../components/auth/AuthLayout";
import AuthRoleSelector from "../../components/auth/AuthRoleSelector";

const LoginSelectorPage = () => {
    return (
        <AuthLayout>
            <AuthRoleSelector mode="login" />
        </AuthLayout>
    );
};

export default LoginSelectorPage;