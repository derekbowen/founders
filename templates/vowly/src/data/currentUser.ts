import type { User } from "../types/marketplace";

/** Demo account used by the mock login. Emma is engaged AND runs Hart & Bloom Florals. */
export const demoUser: User = {
  id: "user-emma",
  firstName: "Emma",
  lastName: "Hart",
  email: "emma@hartandbloom.co",
  phone: "(415) 555-0142",
  ownerId: "u-emma"
};

export const demoCredentials = {
  email: "emma@hartandbloom.co",
  password: "vowly-demo"
};