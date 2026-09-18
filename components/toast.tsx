"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setVisible(false);
      }, 2400)
    );
  }, [timer]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg shadow-xl font-label-sm text-label-sm transition-opacity duration-300 flex items-center gap-2 z-[60] ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-live="polite"
      >
        <Icon name="check_circle" className="text-tertiary-fixed text-[18px]" />
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

import { Icon } from "./icon";