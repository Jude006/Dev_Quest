import React from "react";
import HomeBanner from "../components/home/HomeBanner";
import FeaturesSection from "../components/home/FeauturesSection";
import CTASection from "../components/home/CTASection";
import TestimonialsSection from "../components/home/TestimonialsSection";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <FeaturesSection />
      <CTASection />
      <TestimonialsSection />
    </>
  );
};

export default Home;
