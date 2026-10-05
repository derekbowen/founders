import React from "react";
import { brand } from "../data/brand";
import { termsSections, termsUpdated } from "../data/legal";
import { LegalPage } from "../components/legal/LegalPage";

export function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated={termsUpdated}
      intro={`Welcome to ${brand.name}. These terms explain how our wedding vendor marketplace works, what we expect from couples and vendors, and what you can expect from us.`}
      sections={termsSections} />);


}