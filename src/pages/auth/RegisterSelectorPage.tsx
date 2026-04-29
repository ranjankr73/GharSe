import AuthLayout from "../../components/auth/AuthLayout";
import AuthRoleSelector from "../../components/auth/AuthRoleSelector";

const RegisterSelectorPage = () => {
    return (
        <AuthLayout>
            <AuthRoleSelector mode="register" />
        </AuthLayout>
    );
};

export default RegisterSelectorPage;