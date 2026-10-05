import type { Transaction } from '../types/marketplace';
import { formatDayOffset, pluralize } from './format';
import { computeBreakdown, getService } from './pricing';

export function transactionUnits(tx: Transaction): number {
  return tx.endDay !== undefined ? Math.max(1, tx.endDay - tx.startDay) : 1;
}

export function transactionDateText(tx: Transaction): string {
  if (tx.endDay !== undefined) {
    const units = transactionUnits(tx);
    return `${formatDayOffset(tx.startDay)} → ${formatDayOffset(tx.endDay)} · ${units} ${pluralize('night', units)}`;
  }
  return `${formatDayOffset(tx.startDay)}${tx.time ? ` at ${tx.time}` : ''}`;
}

export function transactionBreakdown(tx: Transaction) {
  return computeBreakdown({
    unitPrice: tx.unitPrice,
    units: transactionUnits(tx),
    pets: tx.pets,
    extraPetPrice: tx.extraPetPrice,
    unitLabel: getService(tx.serviceId).unitLabel
  });
}

export function transactionTitle(tx: Transaction): string {
  const pets = tx.petNames.join(' & ');
  const service = getService(tx.serviceId);
  if (tx.role === 'provider') return `${service.label} for ${pets}`;
  return service.unitType === 'night' ? `${pets}’s stay with ${tx.counterpartName.split(' ')[0]}` : `${pets}’s ${service.unitLabel} with ${tx.counterpartName.split(' ')[0]}`;
}