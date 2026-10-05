export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export const termsUpdated = "2026-09-01";
export const privacyUpdated = "2026-09-01";

export const termsSections: LegalSection[] = [
{ id: "about", title: "1. About these terms", body: ["These Terms of Service govern your use of the marketplace, including browsing vendor listings, sending inquiries and messaging other members. By creating an account you agree to these terms.", "If you use the marketplace on behalf of a business, you confirm you're authorized to accept these terms on its behalf."] },
{ id: "accounts", title: "2. Accounts", body: ["You must be at least 18 years old to create an account. Keep your login details secure and tell us immediately if you suspect unauthorized access.", "You're responsible for the accuracy of the information in your profile and listings."] },
{ id: "inquiries", title: "3. Inquiries and bookings", body: ["The marketplace lets couples send inquiries to vendors and continue the conversation in the inbox. We don't process payments, contracts or deposits.", "Any agreement you reach with a vendor — including pricing, cancellation and refund policies — is strictly between you and that vendor. We encourage both parties to put agreements in writing."] },
{ id: "listings", title: "4. Vendor listings", body: ["Vendors must accurately describe their services, starting prices, service area and availability. Portfolio images must be the vendor's own work or used with permission.", "We may remove listings that are misleading, inactive or that violate these terms."] },
{ id: "conduct", title: "5. Community standards", body: ["Treat other members with respect. Harassment, discrimination, spam and off-platform solicitation for unrelated services are not allowed.", "Reviews must reflect genuine experiences. Vendors may not offer incentives in exchange for reviews."] },
{ id: "liability", title: "6. Limitation of liability", body: ["The marketplace is provided \"as is\". We're not a party to agreements between couples and vendors and are not liable for the services vendors provide.", "To the maximum extent permitted by law, our total liability is limited to $100."] },
{ id: "changes", title: "7. Changes to these terms", body: ["We may update these terms from time to time. We'll notify you of material changes by email or in the app before they take effect."] }];


export const privacySections: LegalSection[] = [
{ id: "collect", title: "1. Information we collect", body: ["Account details such as your name, email and phone number; wedding details you share in inquiries (date, guest count, budget); and messages you send through the inbox.", "We also collect basic usage data — pages viewed, searches and device information — to improve the marketplace."] },
{ id: "use", title: "2. How we use information", body: ["To deliver your inquiries to vendors, show you relevant listings, send account notifications, and keep the marketplace safe.", "We never sell your personal information."] },
{ id: "share", title: "3. Sharing with vendors", body: ["When you send an inquiry, the vendor receives your names, contact email and the wedding details you provide so they can respond.", "Vendors may only use this information to respond to your inquiry and provide their services."] },
{ id: "cookies", title: "4. Cookies", body: ["We use essential cookies to keep you signed in and optional analytics cookies to understand how the site is used. You can manage preferences in your browser."] },
{ id: "rights", title: "5. Your rights", body: ["You can access, correct, export or delete your personal information at any time from your account settings or by contacting us.", "California residents have additional rights under the CCPA/CPRA."] },
{ id: "retention", title: "6. Data retention", body: ["We keep your information for as long as your account is active. Messages are retained for 24 months after your wedding date unless you delete them sooner."] },
{ id: "contact", title: "7. Contact us", body: ["Questions about privacy? Email our team and we'll get back to you within two business days."] }];