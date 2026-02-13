export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
    VerifyOtp: { email: string };
    ResetPassword: { token: string };
    Home: undefined;
};
