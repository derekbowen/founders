import React from 'react';
import { ClapperboardIcon, CodeXmlIcon, MegaphoneIcon, PaletteIcon, PenLineIcon } from 'lucide-react';
import { CategoryId } from '../types/marketplace';

const icons: Record<CategoryId, React.ComponentType<{className?: string;}>> = {
  design: PaletteIcon,
  development: CodeXmlIcon,
  writing: PenLineIcon,
  video: ClapperboardIcon,
  marketing: MegaphoneIcon
};

export function CategoryIcon({ id, className = 'h-5 w-5' }: {id: CategoryId;className?: string;}) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden="true" />;
}