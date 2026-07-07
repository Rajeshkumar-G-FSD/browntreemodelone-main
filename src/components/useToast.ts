import { useState, useCallback, useRef } from "react";

export type ToastVariant = "destructive" | "success" | "info";

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

let _setToast: ((t: ToastData | null) => void) | null = null;

export function useToastStore() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  _setToast = useCallback((t: ToastData | null) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(t);
    if (t) {
      timerRef.current = setTimeout(() => setToast(null), 3200);
    }
  }, []);

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  return { toast, dismiss };
}

export function useToast() {
  const toast = useCallback((data: Omit<ToastData, "id">) => {
    if (_setToast) {
      _setToast({ ...data, id: Math.random().toString(36).slice(2) });
    }
  }, []);
  return { toast };
}
