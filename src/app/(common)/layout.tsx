import Footer from "@/components/shared/Footer/Footer";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
