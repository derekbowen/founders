import React from 'react';
import { ArchiveIcon, FileTextIcon, MusicIcon, TableIcon } from 'lucide-react';
import type { FileType } from '../../types/marketplace';

const icons: Record<FileType, React.ElementType> = {
  PDF: FileTextIcon,
  ZIP: ArchiveIcon,
  MP3: MusicIcon,
  XLSX: TableIcon
};

export function FileTypeBadge({ type }: {type: FileType;}) {
  const Icon = icons[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-ink bg-white px-2 py-0.5 font-display text-[11px] font-bold tracking-wide text-ink">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {type}
    </span>);

}