"use server"

import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandaler";

export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    redirect("/signin?loggedOut=true");
}