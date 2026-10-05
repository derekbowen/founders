import { brand } from "./brand";

export const legalPages = {
  terms: {
    title: "Terms of service",
    updated: "September 1, 2026",
    sections: [
    { heading: "1. The marketplace", body: `${brand.name} is a platform that connects independent farms ("Sellers") with buyers. ${brand.name} is not a party to the sale; each order is a contract between the buyer and the farm.` },
    { heading: "2. Orders & payment", body: "When you place an order, your card is authorized and charged once the farm confirms. Prices are set by farms and include applicable taxes unless stated. A service fee is shown at checkout." },
    { heading: "3. Pickup & delivery", body: "Buyers must collect pickup orders during the chosen window. Orders not collected within 24 hours may be forfeited without refund, at the farm's discretion. Delivery is limited to each farm's published zones." },
    { heading: "4. Cancellations & refunds", body: "You may cancel an order free of charge until the farm marks it ready. If a farm cannot fulfill an order — due to weather, pests or other causes — you'll receive a full refund." },
    { heading: "5. Seller obligations", body: "Farms are responsible for the accuracy of listings, food-safety compliance and any required licenses or certifications (including organic certification claims)." }]

  },
  privacy: {
    title: "Privacy policy",
    updated: "September 1, 2026",
    sections: [
    { heading: "What we collect", body: "Your name, email, phone, delivery addresses and order history. Payment details are handled by our payment processor and never stored on our servers." },
    { heading: "How we use it", body: "To process orders, share pickup or delivery details with the farm you buy from, send order updates, and improve the marketplace." },
    { heading: "Sharing", body: "We share only what a farm needs to fulfill your order. We never sell your personal data." },
    { heading: "Your choices", body: "You can update or delete your account at any time from Account settings, and unsubscribe from marketing emails in one click." }]

  }
};