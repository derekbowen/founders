import { useEffect, type RefObject } from 'react';

export function useClickOutside(
ref: RefObject<HTMLElement>,
onOutside: () => void,
active = true)
: void {
  useEffect(() => {
    if (!active) return;
    function handlePointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onOutside();
    }
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [ref, onOutside, active]);
}