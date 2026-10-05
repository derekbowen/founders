import { ListingDraft, WizardStepId } from '../types/listingDraft';

export function validateStep(step: WizardStepId, d: ListingDraft): string | null {
  switch (step) {
    case 'details':
      if (d.title.trim().length < 5) return 'Give your court a title of at least 5 characters.';
      if (!d.clubName.trim()) return 'Add your club or venue name.';
      if (d.description.trim().length < 20) return 'Write a short description (20+ characters).';
      return null;
    case 'sport':
      return d.surface ? null : 'Choose a playing surface.';
    case 'location':
      if (!d.address.trim()) return 'Add a street address.';
      if (!d.city.trim()) return 'Add a city.';
      if (!/^\d{5}$/.test(d.zip)) return 'Enter a 5-digit ZIP code.';
      return null;
    case 'pricing':
      if (!(d.pricePerHour > 0)) return 'Set an hourly price above $0.';
      if (d.openPlayEnabled) {
        if (d.seatsTotal < 2) return 'Open play needs at least 2 seats.';
        if (!(d.pricePerSeat > 0)) return 'Set a per-seat price above $0.';
        if (!d.sessions.length) return 'Add at least one open-play session.';
      }
      return null;
    case 'hours':
      if (!d.weeklyHours.some((h) => h.open)) return 'Open the court on at least one day.';
      if (d.weeklyHours.some((h) => h.open && h.from >= h.to)) return 'Closing time must be after opening time.';
      return null;
    case 'photos':
      return d.photos.length ? null : 'Add at least one photo.';
    default:
      return null;
  }
}