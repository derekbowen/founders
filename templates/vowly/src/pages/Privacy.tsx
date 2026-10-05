import React from "react";
import { brand } from "../data/brand";
import { privacySections, privacyUpdated } from "../data/legal";
import { LegalPage } from "../components/legal/LegalPage";

export function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={privacyUpdated}
      intro={`Your wedding details are personal. This policy explains what information ${brand.name} collects, how we use it, and the choices you have.`}
      sections={privacySections} />);


}