import React from "react";
import Banner from "./Banner/Banner";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import BenifitSection from "./BenifitSection";

// import { Container } from "@/components/ui-library/container";

const HomeComponent = () => {
  return (
    <div className="">
      <Banner />
      <FeaturesSection />
      <HowItWorksSection />
      <BenifitSection />
    </div>
  );
};

export default HomeComponent;
