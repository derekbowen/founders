import React from 'react';
import {
  BookOpenIcon,
  CameraIcon,
  GraduationCapIcon,
  HeadphonesIcon,
  LayoutTemplateIcon,
  PrinterIcon } from
'lucide-react';
import type { CategoryId } from '../../types/marketplace';

const icons: Record<CategoryId, React.ElementType> = {
  ebooks: BookOpenIcon,
  printables: PrinterIcon,
  templates: LayoutTemplateIcon,
  'photo-packs': CameraIcon,
  audio: HeadphonesIcon,
  courses: GraduationCapIcon
};

export function CategoryIcon({ id, className = 'h-5 w-5' }: {id: CategoryId;className?: string;}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" />;
}