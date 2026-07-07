import { useEffect, useState } from "react";
import { useToastStore, ToastData } from "./useToast";
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  const colors = {
    destructive: {
      bg: "#fff",
      border: "#fca5a5",
      titleColor: "#991b1b",
      descColor: "#6b7280",
      iconBg: "#fef2f2",
      icon: <AlertTriangle size={15} style={{ color: "#dc2626" }} />,
      bar: "#dc2626",
    },
    success: {
      bg: "#fff",
      border: "#86efac",
      titleColor: "#14532d",
      descColor: "#6b7280",
      iconBg: "#f0fdf4",
      icon: <CheckCircle size={15} style={{ color: "#16a34a" }} />,
      bar: "#16a34a",
    },
    info: {
      bg: "#fff",
      border: "#E9D9B3",
      titleColor: "#4A2C1D",
      descColor: "#6b7280",
      iconBg: "#fdf9f0",
      icon: <Info size={15} style={{ color: "#D4AF37" }} />,
      bar: "#D4AF37",
    },
  };

  const c = colors[toast.variant] || colors.info;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        padding: "14px 16px 14px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: 11,
        minWidth: 300,
        maxWidth: 380,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) scale(1)" : "translateX(24px) scale(0.96)",
      }}
    >
      {/* colour bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: c.bar, borderRadius: "14px 0 0 14px" }} />

      {/* icon */}
      <div style={{ background: c.iconBg, borderRadius: 8, padding: 6, flexShrink: 0, marginLeft: 4 }}>
        {c.icon}
      </div>

      {/* text */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: c.titleColor, marginBottom: 2, letterSpacing: "0.02em" }}>
          {toast.title}
        </p>
        {toast.description && (
          <p style={{ fontSize: 11, color: c.descColor, lineHeight: 1.5 }}>{toast.description}</p>
        )}
      </div>

      {/* close */}
      <button
        type="button"
        onClick={handleDismiss}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "#9ca3af", flexShrink: 0 }}
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>

      {/* progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: c.bar,
          opacity: 0.35,
          borderRadius: "0 0 14px 14px",
          animation: "toastProgress 3.2s linear forwards",
        }}
      />
      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export default function Toaster() {
  const { toast, dismiss } = useToastStore();

  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
    </div>
  );
}
