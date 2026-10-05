import React from 'react';
import { HeartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useFavorites } from '../../contexts/FavoritesContext';

interface FavoriteButtonProps {
  listingId: string;
  title: string;
  variant?: 'overlay' | 'outline';
}

export function FavoriteButton({ listingId, title, variant = 'overlay' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(listingId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(listingId);
    toast(added ? `Saved “${title}” to favorites` : `Removed “${title}” from favorites`);
  };

  const base =
  variant === 'overlay' ?
  'h-9 w-9 bg-surface/90 shadow-soft backdrop-blur hover:bg-surface' :
  'h-11 w-11 border border-line bg-surface hover:bg-subtle';

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
      className={`flex items-center justify-center rounded-full transition-colors ${base}`}>
      
      <HeartIcon className={`h-[18px] w-[18px] transition-colors ${active ? 'fill-primary text-primary' : 'text-ink'}`} />
    </motion.button>);

}