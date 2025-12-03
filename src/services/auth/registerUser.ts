/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { registerValidationSchema } from "@/zod/auth.validation";
import { serverFetch } from "@/lib/serverFetch";


export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password'),
        }


        if (zodValidator(payload, registerValidationSchema).success === false) {
            return zodValidator(payload, registerValidationSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerValidationSchema).data;
        const registerData = {
            password: validatedPayload.password,
            member: {
                name: validatedPayload.name,
                phone: validatedPayload.phone,
                email: validatedPayload.email,
            }
        }

        // const newFormData = new FormData();

        // newFormData.append("data", JSON.stringify(registerData));

        // if (formData.get("file")) {
        //     newFormData.append("file", formData.get("file") as Blob);
        // }

        // const res = await serverFetch.post("/auth/register", {
        //     body: newFormData,
        // })
        const res = await serverFetch.post("/auth/register", {
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}