export interface SavedAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

export const seedAddresses: SavedAddress[] = [
{ id: "a1", label: "Home", line1: "214 Mill Road", city: "Rhinebeck, NY", zip: "12572", isDefault: true },
{ id: "a2", label: "Work", line1: "31 Wall Street, Suite 2", city: "Kingston, NY", zip: "12401", isDefault: false }];