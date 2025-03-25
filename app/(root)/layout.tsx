import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="m-4">{children}</div>
    </div>
  );
};

export default RootLayout;
