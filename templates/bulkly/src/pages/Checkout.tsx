import React from 'react';
import { CalendarClockIcon, CreditCardIcon, ShoppingCartIcon } from 'lucide-react';
import { CardPaymentForm } from '../components/checkout/CardPaymentForm';
import { CartLineItem } from '../components/checkout/CartLineItem';
import { CheckoutSuccess } from '../components/checkout/CheckoutSuccess';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Input } from '../components/Input';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { SelectField } from '../components/ui/SelectField';
import { useCheckout } from '../hooks/useCheckout';

const businessTypes = ['Café', 'Grocery', 'Gift shop', 'Home boutique', 'Bookstore', 'Pet shop', 'Online store', 'Other'].map((v) => ({
  value: v,
  label: v
}));

function Step({ number, title, children }: {number: number;title: string;children: React.ReactNode;}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby={`step-${number}`}>
      <h2 id={`step-${number}`} className="mb-4 flex items-center gap-3 text-base font-semibold text-slate-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-700 text-xs font-bold text-white">{number}</span>
        {title}
      </h2>
      {children}
    </section>);

}

export function Checkout() {
  const c = useCheckout();

  if (c.placedOrder) {
    return <CheckoutSuccess orderNumber={c.placedOrder.number} total={c.placedOrder.total} brandCount={c.placedOrder.brandCount} />;
  }

  if (c.isEmpty) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={ShoppingCartIcon}
          title="Your order is empty"
          description="Add cases from any listing to start a wholesale order. Tier pricing applies automatically."
          action={<ButtonLink to="/search">Browse wholesale products</ButtonLink>} />
        
      </div>);

  }

  type ExtraProps = Omit<React.ComponentProps<typeof Input>, 'id' | 'label' | 'value' | 'onChange' | 'error'>;
  const field = (key: Parameters<typeof c.setField>[0], label: string, extra: ExtraProps = {}) =>
  <Input id={`checkout-${key}`} label={label} value={c.form[key]} onChange={(e) => c.setField(key, e.target.value)} error={c.errors[key]} {...extra} />;


  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Checkout</h1>
      <p className="mt-1 text-sm text-slate-600">Review your cases, confirm business details and place your wholesale order.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            c.submit();
          }}
          noValidate>
          
          <Step number={1} title="Review order">
            <div className="space-y-5">
              {c.groups.map((g) =>
              <div key={g.brand.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {g.brand.name} · ships from {g.brand.location}
                  </p>
                  <ul className="divide-y divide-slate-100">
                    {g.lines.map((l) =>
                  <CartLineItem
                    key={l.product.id}
                    line={l}
                    onChange={(n) => c.updateItem(l.product.id, n)}
                    onRemove={() => c.removeItem(l.product.id)} />

                  )}
                  </ul>
                </div>
              )}
            </div>
          </Step>

          <Step number={2} title="Business details">
            <div className="grid gap-4 sm:grid-cols-2">
              {field('storeName', 'Store name', { autoComplete: 'organization' })}
              <SelectField
                id="checkout-businessType"
                label="Business type"
                value={c.form.businessType}
                onChange={(e) => c.setField('businessType', e.target.value)}
                options={businessTypes} />
              
              {field('taxId', 'Tax ID (EIN) / resale certificate', {
                placeholder: '12-3456789',
                helperText: 'Used to apply tax-exempt wholesale pricing.'
              })}
              {field('contactName', 'Contact name', { autoComplete: 'name' })}
              <div className="sm:col-span-2">{field('email', 'Order email', { type: 'email', autoComplete: 'email' })}</div>
            </div>
          </Step>

          <Step number={3} title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-6">{field('address1', 'Street address', { autoComplete: 'address-line1' })}</div>
              <div className="sm:col-span-6">{field('address2', 'Suite, unit (optional)', { autoComplete: 'address-line2' })}</div>
              <div className="sm:col-span-3">{field('city', 'City', { autoComplete: 'address-level2' })}</div>
              <div className="sm:col-span-1">{field('state', 'State', { autoComplete: 'address-level1', maxLength: 2 })}</div>
              <div className="sm:col-span-2">{field('zip', 'ZIP', { autoComplete: 'postal-code', inputMode: 'numeric' })}</div>
            </div>
          </Step>

          <Step number={4} title="Payment">
            <div className="mb-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Payment method">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-primary-600 bg-primary-50/50 p-3">
                <input type="radio" name="method" defaultChecked className="mt-1 h-4 w-4 accent-primary-700" />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                    <CreditCardIcon className="h-4 w-4" aria-hidden="true" /> Credit or debit card
                  </span>
                  <span className="text-xs text-slate-600">Charged when each brand confirms</span>
                </span>
              </label>
              <label className="flex cursor-not-allowed items-start gap-3 rounded-lg border border-dashed border-slate-300 p-3 opacity-70">
                <input type="radio" name="method" disabled className="mt-1 h-4 w-4" />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                    <CalendarClockIcon className="h-4 w-4" aria-hidden="true" /> Net 60 terms
                    <span className="rounded-full bg-slate-200 px-1.5 text-[10px] font-semibold text-slate-700">Soon</span>
                  </span>
                  <span className="text-xs text-slate-600">Pay 60 days after delivery</span>
                </span>
              </label>
            </div>
            <CardPaymentForm form={c.form} errors={c.errors} setField={c.setField} />
          </Step>
        </form>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <OrderSummary
            groups={c.groups}
            subtotal={c.subtotal}
            shipping={c.shipping}
            savings={c.savings}
            total={c.total}
            blocked={c.blocked}
            submitting={c.submitting}
            onSubmit={c.submit} />
          
        </div>
      </div>
    </div>);

}