import React from "react";
import { AlertTriangleIcon, Loader2Icon, LockIcon, SendIcon, StoreIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { brand } from "../../data/brand";
import { budgetOptions } from "../../data/inquiryOptions";
import { formatPrice, priceSuffix } from "../../utils/format";
import { getOwner } from "../../utils/vendors";
import { Button } from "../ui/Button";
import { ButtonLink } from "../ui/ButtonLink";
import { StarRating } from "../ui/StarRating";
import { TextField } from "../ui/TextField";
import { SelectField } from "../ui/SelectField";
import { TextAreaField } from "../ui/TextAreaField";
import { useInquiryForm } from "./useInquiryForm";
import type { Vendor } from "../../types/marketplace";

interface InquiryPanelProps {
  vendor: Vendor;
}

export function InquiryPanel({ vendor }: InquiryPanelProps) {
  const { user } = useAuth();
  const { values, errors, setField, handleSubmit, submitting, dateConflict, minDate } = useInquiryForm(vendor);
  const owner = getOwner(vendor.ownerId);
  const isOwner = Boolean(user?.ownerId && user.ownerId === vendor.ownerId);
  const ownerFirst = owner?.name.split(" ")[0] ?? "there";

  return (
    <div id="inquiry" className="scroll-mt-24 rounded-3xl border border-line bg-surface p-6 shadow-soft">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p>
          <span className="text-sm text-muted">From </span>
          <span className="font-display text-3xl font-semibold text-ink">{formatPrice(vendor.startingPrice)}</span>
          <span className="text-sm text-muted"> {priceSuffix(vendor.priceUnit)}</span>
        </p>
        <StarRating rating={vendor.rating} count={vendor.reviewCount} />
      </div>
      <p className="mt-1 text-xs text-muted">Usually responds {vendor.responseTime}</p>

      <div className="my-5 border-t border-line" />

      {isOwner ?
      <div className="rounded-2xl bg-blush/50 p-5 text-center">
          <StoreIcon aria-hidden="true" className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 font-display text-xl font-semibold text-ink">This is your listing</p>
          <p className="mt-1 text-sm text-muted">Couples will see an inquiry form here. Manage leads from your inbox.</p>
          <ButtonLink to="/inbox/leads" className="mt-4" size="sm">View your leads</ButtonLink>
        </div> :

      <form onSubmit={handleSubmit} noValidate>
          <h2 className="font-display text-2xl font-semibold text-ink">Send an inquiry</h2>
          <p className="mb-5 mt-1 text-sm text-muted">Free and no obligation. Share a few details to check availability.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextField id="inq-partnerOne" label="Your name" autoComplete="name" value={values.partnerOne} onChange={setField("partnerOne")} error={errors.partnerOne} />
              <TextField id="inq-partnerTwo" label="Partner's name" optional value={values.partnerTwo} onChange={setField("partnerTwo")} />
            </div>
            <TextField id="inq-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={setField("email")} error={errors.email} />
            <div className="grid grid-cols-2 gap-3">
              <TextField id="inq-weddingDate" label="Wedding date" type="date" min={minDate} value={values.weddingDate} onChange={setField("weddingDate")} error={errors.weddingDate} />
              <TextField id="inq-guestCount" label="Guests" type="number" min={1} inputMode="numeric" placeholder="120" value={values.guestCount} onChange={setField("guestCount")} error={errors.guestCount} />
            </div>
            {dateConflict &&
          <p role="status" className="flex items-start gap-2 rounded-xl bg-warning/10 p-3 text-xs text-warning">
                <AlertTriangleIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                {vendor.name} is already booked on this date. You can still ask about nearby dates or a second team.
              </p>
          }
            <SelectField id="inq-budget" label="Budget for this vendor" placeholder="Select a range" options={budgetOptions} value={values.budget} onChange={setField("budget")} error={errors.budget} />
            <TextAreaField
            id="inq-message"
            label="Message"
            rows={4}
            placeholder={`Hi ${ownerFirst}! We're planning a wedding and would love to know more about…`}
            value={values.message}
            onChange={setField("message")}
            error={errors.message} />
          
          </div>

          <Button type="submit" fullWidth size="lg" className="mt-5" disabled={submitting}>
            {submitting ? <Loader2Icon aria-hidden="true" className="h-4 w-4 animate-spin" /> : <SendIcon aria-hidden="true" className="h-4 w-4" />}
            {submitting ? "Sending…" : "Send inquiry"}
          </Button>
          <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-xs text-muted">
            <LockIcon aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
            You won't be charged. {brand.name} doesn't handle payments — you'll book with {vendor.name} directly.
          </p>
        </form>
      }
    </div>);

}