import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangleIcon, ArrowLeftIcon, CheckCircle2Icon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '../components/Input';
import { useToast } from '../components/ToastProvider';
import { BrandButton, buttonLinkClass } from '../components/ui/BrandButton';
import { TextAreaField } from '../components/ui/TextAreaField';
import { CardForm } from '../components/checkout/CardForm';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { sitters } from '../data/sitters';
import { priceBreakdown } from '../utils/pricing';
import { formatCurrency, formatDate, formatTime } from '../utils/format';
import { todayIso } from '../utils/time';
import { NotFound } from './NotFound';

export function Checkout() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { addToast } = useToast();
  const sitter = sitters.find((s) => s.id === id);
  const date = params.get('date') ?? todayIso();
  const start = params.get('start') ?? '18:00';
  const end = params.get('end') ?? '22:00';
  const initialKids = Math.max(1, Number(params.get('kids') ?? 1) || 1);
  const f = useCheckoutForm(initialKids);

  if (!sitter) return <NotFound />;
  const first = sitter.name.split(' ')[0];
  const kids = Math.max(1, f.children.length);
  const b = priceBreakdown(sitter.hourlyRate, sitter.extraChildRate, start, end, kids);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await f.submit();
    if (ok) addToast({ type: 'success', message: `Request sent to ${first}!` });
  };

  if (f.status === 'success') {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2Icon className="h-8 w-8 text-emerald-700" aria-hidden />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-bold text-ink-900">Request sent to {first}</h1>
        <p className="mt-3 text-ink-600">
          {formatDate(date, 'EEEE, MMM d')} · {formatTime(start)} – {formatTime(end)}. {first} usually responds {sitter.responseTime}. We’ve authorized {formatCurrency(b.total)} — you’ll only be charged once they accept.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/inbox/tx-1042" className={buttonLinkClass('primary', 'lg')}>View booking in inbox</Link>
          <Link to="/s" className={buttonLinkClass('outline', 'lg')}>Keep browsing</Link>
        </div>
      </div>);

  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link to={`/l/${sitter.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-primary-700">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to {first}’s listing
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-bold text-ink-900 sm:text-4xl">Request to book</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form onSubmit={onSubmit} noValidate className="space-y-8">
          <section aria-labelledby="kids-heading" className="rounded-3xl border border-ink-200 bg-white p-6">
            <h2 id="kids-heading" className="font-heading text-xl font-bold text-ink-900">Your children</h2>
            <p className="mt-1 text-sm text-ink-600">Only shared with {first} once the booking is confirmed.</p>
            <ul className="mt-5 space-y-4">
              {f.children.map((c, i) =>
              <li key={i} className="grid grid-cols-[1fr_96px_auto] items-start gap-3">
                  <Input id={`child-${i}-name`} label={`Child ${i + 1} first name`} value={c.name} error={f.errors[`child-${i}-name`]} onChange={(e) => f.updateChild(i, { name: e.target.value })} />
                  <Input id={`child-${i}-age`} label="Age" value={c.age} placeholder="e.g. 4" error={f.errors[`child-${i}-age`]} onChange={(e) => f.updateChild(i, { age: e.target.value.slice(0, 6) })} />
                  <button
                  type="button"
                  onClick={() => f.removeChild(i)}
                  disabled={f.children.length === 1}
                  aria-label={`Remove child ${i + 1}`}
                  className="mt-7 flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-red-50 hover:text-red-600 disabled:invisible">
                  
                    <Trash2Icon className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              )}
            </ul>
            {f.children.length < sitter.maxKids ?
            <button type="button" onClick={f.addChild} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
                <PlusIcon className="h-4 w-4" aria-hidden /> Add another child (+${sitter.extraChildRate}/hr)
              </button> :

            <p className="mt-4 text-xs text-ink-600">{first} can care for up to {sitter.maxKids} children.</p>
            }
          </section>

          <section aria-labelledby="notes-heading" className="rounded-3xl border border-ink-200 bg-white p-6">
            <h2 id="notes-heading" className="font-heading text-xl font-bold text-ink-900">Care notes</h2>
            <div className="mt-5 space-y-4">
              <TextAreaField label="Allergies & medical needs" placeholder="e.g. Peanut allergy — EpiPen in kitchen drawer" value={f.allergies} maxLength={300} onChange={(e) => f.setAllergies(e.target.value)} helperText="Leave blank if none" />
              <TextAreaField label="Bedtime & routines" placeholder="e.g. Bath at 7, two books, lights out at 7:45" value={f.bedtime} maxLength={300} onChange={(e) => f.setBedtime(e.target.value)} />
              <TextAreaField label={`Message to ${first}`} placeholder="Anything else they should know — pets, dinner plans, house rules" value={f.notes} maxLength={500} onChange={(e) => f.setNotes(e.target.value)} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="emergency-name" label="Emergency contact name" value={f.emergency.name} error={f.errors['emergency-name']} onChange={(e) => f.setEmergency((x) => ({ ...x, name: e.target.value }))} />
                <Input id="emergency-phone" label="Emergency contact phone" type="tel" value={f.emergency.phone} error={f.errors['emergency-phone']} onChange={(e) => f.setEmergency((x) => ({ ...x, phone: e.target.value }))} />
              </div>
            </div>
          </section>

          <section aria-labelledby="pay-heading" className="rounded-3xl border border-ink-200 bg-white p-6">
            <h2 id="pay-heading" className="font-heading text-xl font-bold text-ink-900">Payment</h2>
            <div className="mt-5">
              <CardForm card={f.card} setCard={f.setCard} errors={f.errors} />
            </div>
            {f.status === 'declined' &&
            <div role="alert" className="mt-5 flex gap-2.5 rounded-2xl bg-red-50 p-4 text-sm text-red-800">
                <AlertTriangleIcon className="h-5 w-5 shrink-0" aria-hidden />
                Your card was declined. Please try a different card or contact your bank.
              </div>
            }
          </section>

          <div>
            <BrandButton type="submit" size="lg" fullWidth loading={f.status === 'submitting'}>
              Request {first} · {formatCurrency(b.total)}
            </BrandButton>
            <p className="mt-3 text-center text-xs text-ink-600">
              By requesting, you agree to the <Link to="/terms" className="underline hover:text-primary-700">Terms</Link> and cancellation policy.
            </p>
          </div>
        </form>

        <aside className="self-start lg:sticky lg:top-24">
          <BookingSummary sitter={sitter} date={date} start={start} end={end} kids={kids} breakdown={b} />
        </aside>
      </div>
    </div>);

}