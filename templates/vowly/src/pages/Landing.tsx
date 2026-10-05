import React from "react";
import { Hero } from "../components/landing/Hero";
import { CategoryGrid } from "../components/landing/CategoryGrid";
import { RealWeddings } from "../components/landing/RealWeddings";
import { PlanningTools } from "../components/landing/PlanningTools";
import { VendorCta } from "../components/landing/VendorCta";

export function Landing() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <RealWeddings />
      <PlanningTools />
      <VendorCta />
    </>);

}