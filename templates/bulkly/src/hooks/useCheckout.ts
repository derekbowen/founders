import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import type { Brand, Product } from '../types/marketplace';
import { getBrand, getProduct } from '../utils/catalog';
import { getLineSavings, getLineTotal, getShippingForSubtotal } from '../utils/pricing';

export interface CheckoutForm {
  storeName: string;
  businessType: string;
  taxId: string;
  contactName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardZip: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

export interface CheckoutLine {
  product: Product;
  cases: number;
  total: number;
  savings: number;
}

export interface BrandGroup {
  brand: Brand;
  lines: CheckoutLine[];
  subtotal: number;
  shipping: number;
  belowMinimum: boolean;
}

const emptyForm: CheckoutForm = {
  storeName: '',
  businessType: 'Café',
  taxId: '',
  contactName: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cardZip: ''
};

function validate(form: CheckoutForm): CheckoutErrors {
  const e: CheckoutErrors = {};
  const req: (keyof CheckoutForm)[] = ['storeName', 'taxId', 'contactName', 'email', 'address1', 'city', 'state', 'zip', 'cardName'];
  req.forEach((k) => {
    if (!form[k].trim()) e[k] = 'Required';
  });
  if (form.taxId && !/^\d{2}-?\d{7}$/.test(form.taxId.trim())) e.taxId = 'Enter a 9-digit EIN, e.g. 12-3456789';
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
  if (form.zip && !/^\d{5}$/.test(form.zip)) e.zip = '5-digit ZIP';
  if (form.cardNumber.replace(/\s/g, '').length < 15) e.cardNumber = 'Card number is incomplete';
  if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(form.cardExpiry)) e.cardExpiry = 'Use MM / YY';
  if (!/^\d{3,4}$/.test(form.cardCvc)) e.cardCvc = '3–4 digits';
  if (!/^\d{5}$/.test(form.cardZip)) e.cardZip = '5-digit ZIP';
  return e;
}

export function useCheckout() {
  const { items, updateItem, removeItem, clear } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{number: string;total: number;brandCount: number;} | null>(null);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        storeName: f.storeName || user.businessName,
        businessType: user.businessType,
        contactName: f.contactName || `${user.firstName} ${user.lastName}`,
        email: f.email || user.email
      }));
    }
  }, [user]);

  const groups = useMemo<BrandGroup[]>(() => {
    const map = new Map<string, BrandGroup>();
    items.forEach((item) => {
      const product = getProduct(item.productId);
      const brand = product && getBrand(product.brandId);
      if (!product || !brand) return;
      const group = map.get(brand.id) ?? { brand, lines: [], subtotal: 0, shipping: 0, belowMinimum: false };
      const total = getLineTotal(product, item.cases);
      group.lines.push({ product, cases: item.cases, total, savings: getLineSavings(product, item.cases) });
      group.subtotal += total;
      map.set(brand.id, group);
    });
    return Array.from(map.values()).map((g) => ({
      ...g,
      shipping: getShippingForSubtotal(g.subtotal),
      belowMinimum: g.subtotal < g.brand.minOrderValue
    }));
  }, [items]);

  const subtotal = groups.reduce((s, g) => s + g.subtotal, 0);
  const shipping = groups.reduce((s, g) => s + g.shipping, 0);
  const savings = groups.reduce((s, g) => s + g.lines.reduce((ls, l) => ls + l.savings, 0), 0);
  const total = subtotal + shipping;
  const blocked = groups.some((g) => g.belowMinimum);

  const setField = (key: keyof CheckoutForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || blocked) {
      const first = Object.keys(nextErrors)[0];
      if (first) document.getElementById(`checkout-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setPlacedOrder({ number: `BK-${20500 + Math.floor(Math.random() * 400)}`, total, brandCount: groups.length });
      clear();
      setSubmitting(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  return {
    groups,
    subtotal,
    shipping,
    savings,
    total,
    blocked,
    form,
    errors,
    setField,
    submit,
    submitting,
    placedOrder,
    updateItem,
    removeItem,
    isEmpty: items.length === 0
  };
}