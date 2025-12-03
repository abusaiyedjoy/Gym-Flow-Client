
export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN" | "TRAINER" | "MEMBER";
    phone?: string;
    profileImage?: string | null;
    isActive: boolean;
    isVerified: boolean;
    needPasswordChange: boolean;
};
