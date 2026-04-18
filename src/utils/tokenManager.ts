let token: string | null = null;

export const setToken = (accessToken: string | null) => {
    token = accessToken;
}

export const getToken = (): string | null => token;