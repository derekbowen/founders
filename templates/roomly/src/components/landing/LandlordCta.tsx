import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '../Button';
import { images } from '../../data/images';
import { landlordBenefits } from '../../data/discover';
import { buttonStyles } from '../../utils/styles';

export function LandlordCta() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid overflow-hidden rounded-3xl bg-primary-400 lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-wide text-navy-800">For landlords &amp; flatmates</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Have a spare room? Find a great renter.
          </h2>
          <p className="mt-4 max-w-md text-navy-800">
            Students, interns and remote workers are looking for rooms right now. Create a listing and receive
            inquiries straight to your inbox.
          </p>
          <ul className="mt-6 space-y-3">
            {landlordBenefits.map((b) =>
            <li key={b} className="flex items-center gap-3 text-navy-900">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-900 text-primary-300">
                  <CheckIcon size={14} strokeWidth={3} />
                </span>
                {b}
              </li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="large"
              rightIcon={<ArrowRightIcon size={18} />}
              className={buttonStyles.navy}
              onClick={() => navigate('/listings/new')}>
              
              List a room
            </Button>
            <Button size="large" className={buttonStyles.outline} onClick={() => navigate('/about')}>
              Learn more
            </Button>
          </div>
        </div>
        <div className="relative min-h-[260px]">
          <img
            src={images.living}
            alt="Bright shared living room"
            className="absolute inset-0 h-full w-full object-cover" />
          
        </div>
      </div>
    </section>);

}