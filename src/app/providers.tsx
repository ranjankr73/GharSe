import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            fontFamily:
                                '"Plus Jakarta Sans", system-ui, sans-serif',
                            fontWeight: 600,
                            fontSize: "13px",
                            borderRadius: "12px",
                            padding: "10px 16px",
                        },
                        success: {
                            style: {
                                background: "#f0fdf4",
                                color: "#166534",
                                border: "1px solid #bbf7d0",
                            },
                        },
                        error: {
                            style: {
                                background: "#fef2f2",
                                color: "#991b1b",
                                border: "1px solid #fecaca",
                            },
                        },
                    }}
                />
            </Provider>
        </GoogleOAuthProvider>
    );
};

export default AppProviders;
