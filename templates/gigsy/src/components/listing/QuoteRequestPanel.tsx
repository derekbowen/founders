import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, PaperclipIcon, ShieldCheckIcon, UploadCloudIcon, XIcon, ZapIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { TextAreaField } from '../ui/TextAreaField';
import { SelectField } from '../ui/SelectField';
import { TextField } from '../ui/TextField';
import { useToast } from '../ToastProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionsContext';
import { budgetRanges } from '../../data/navigation';
import { Listing, User } from '../../types/marketplace';
import { deliveryLabel, formatMoney } from '../../utils/format';

interface QuoteRequestPanelProps {
  listing: Listing;
  freelancer: User;
}

interface Errors {
  description?: string;
  budget?: string;
  deadline?: string;
}

export function QuoteRequestPanel({ listing, freelancer }: QuoteRequestPanelProps) {
  const { user, isSignedIn } = useAuth();
  const { requestQuote } = useTransactions();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const minDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
  const isOwn = user?.id === listing.freelancerId;

  const validate = (): Errors => {
    const e: Errors = {};
    if (description.trim().length < 30) e.description = 'Add a few more details (at least 30 characters).';
    if (!budget) e.budget = 'Choose a budget range.';
    if (!deadline) e.deadline = 'Pick a deadline.';
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!isSignedIn) {
      navigate(`/login?redirect=${encodeURIComponent(`/l/${listing.id}`)}`);
      return;
    }
    const range = budgetRanges.find((b) => b.value === budget);
    setSubmitting(true);
    window.setTimeout(() => {
      const id = requestQuote(listing.id, {
        description: description.trim(),
        budgetMin: range?.min ?? 0,
        budgetMax: range?.max ?? 0,
        deadline,
        attachments: files
      });
      setSubmitting(false);
      addToast({ type: 'success', message: `Quote request sent to ${freelancer.name.split(' ')[0]}` });
      navigate(`/inbox/${id}`);
    }, 700);
  };

  return (
    <div id="request-quote" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="border-b border-slate-100 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Starting at</p>
        <div className="mt-1 flex items-baseline justify-between">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">{formatMoney(listing.startingPrice)}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" /> {deliveryLabel(listing.deliveryDays)} delivery
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <ZapIcon className="h-3.5 w-3.5 text-accent-600" aria-hidden="true" />
          Usually responds within {freelancer.responseTime}
        </p>
      </div>

      {isOwn ?
      <div className="p-5">
          <p className="text-sm text-slate-600">This is your listing. Clients will see a quote request form here.</p>
          <ButtonLink to="/create-listing" variant="secondary" fullWidth className="mt-4">Edit listing</ButtonLink>
        </div> :

      <form onSubmit={onSubmit} noValidate className="space-y-4 p-5">
          <h2 className="text-base font-bold text-slate-900">Request a quote</h2>
          <TextAreaField
          label="Project description"
          placeholder="What do you need, what does success look like, and any references?"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          hint={`${description.trim().length}/30 characters minimum`} />
        
          <div className="grid grid-cols-2 gap-3">
            <SelectField
            label="Budget range"
            placeholder="Select"
            options={budgetRanges}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            error={errors.budget} />
          
            <TextField
            label="Deadline"
            type="date"
            min={minDate}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            error={errors.deadline} />
          
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-800">Attachments <span className="font-normal text-slate-500">(optional)</span></p>
            <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center transition-colors hover:border-primary-400 hover:bg-primary-50">
            
              <UploadCloudIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-700">Add briefs, mockups or references</span>
              <span className="text-xs text-slate-500">PDF, PNG, DOCX up to 25 MB</span>
            </button>
            <input
            ref={fileRef}
            type="file"
            multiple
            className="sr-only"
            aria-label="Upload attachments"
            onChange={(e) => {
              const names = Array.from(e.target.files ?? []).map((f) => f.name);
              setFiles((prev) => [...prev, ...names]);
              e.target.value = '';
            }} />
          
            {files.length > 0 &&
          <ul className="mt-2 space-y-1.5">
                {files.map((name, i) =>
            <li key={name + i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    <PaperclipIcon className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <span className="flex-1 truncate">{name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="rounded p-0.5 text-slate-400 hover:text-slate-700" aria-label={`Remove ${name}`}>
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </li>
            )}
              </ul>
          }
          </div>

          <Button type="submit" fullWidth size="lg" loading={submitting}>
            {isSignedIn ? 'Request a quote' : 'Log in to request a quote'}
          </Button>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600" aria-hidden="true" />
            You won't be charged yet. {freelancer.name.split(' ')[0]} will reply with an offer you can accept, counter or decline.
          </p>
        </form>
      }
    </div>);

}