import { useState } from 'react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../components/ToastProvider';

/** Simulates downloading a file from an order and marks the order as downloaded. */
export function useDownload(orderId: string | undefined) {
  const { markDownloaded } = useStore();
  const { addToast } = useToast();
  const [pending, setPending] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const download = (fileName: string) => {
    if (!orderId || pending) return;
    setPending(fileName);
    window.setTimeout(() => {
      setPending(null);
      setDone((d) => d.includes(fileName) ? d : [...d, fileName]);
      markDownloaded(orderId);
      addToast({ type: 'success', message: `Downloaded ${fileName}` });
    }, 900);
  };

  return { download, pending, done };
}