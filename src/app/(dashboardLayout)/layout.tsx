import React from "react";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
        <main className="">
          <div className="">{children}</div>
        </main>
  );
};

export default CommonDashboardLayout;
