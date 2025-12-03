"use server";

import { zodValidator } from "@/lib/zodValidator";
import { loginValidationSchema } from "@/zod/auth.validation";


export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
    
    try {
        const redirect = formData.get('redirect') as string || '/dashboard';
        let accessTokenObject = null;
        let refreshTokenObject = null;
        const userInfo = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };
        if (zodValidator(userInfo, loginValidationSchema).success === false) {
            return zodValidator(userInfo, loginValidationSchema)
        }
        const validatedPayload = zodValidator(userInfo, loginValidationSchema).data;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedPayload),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return { success: true, message: 'Login successful', data: data, redirectTo: redirect };



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    }
};    