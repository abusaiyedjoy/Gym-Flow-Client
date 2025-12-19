
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getUserInfo } from "../auth/getUserInfo";

export async function getDashboardMetaData() {
  try {
    const userInfo = await getUserInfo();
    const cacheTag = `${userInfo.role.toLowerCase()}-dashboard-meta`;

    const response = await serverFetch.get("/meta/dashboard", {
      next: {
        tags: [cacheTag, "dashboard-meta", "meta-data"],
        revalidate: 30, // 30 seconds
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Dashboard meta data error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load dashboard data",
    };
  }
}