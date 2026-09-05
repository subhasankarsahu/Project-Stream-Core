import { CheckCircle2, X, XCircle } from "lucide-react"
import { createContext, useCallback, useContext, useMemo, useState } from "react"

const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const remove = useCallback((id) => setToasts((items) => items.filter((toast) => toast.id !== id)), [])
  const toast = useCallback((message, type = "success") => { const id = crypto.randomUUID(); setToasts((items) => [...items, { id, message, type }]); window.setTimeout(() => remove(id), 4000) }, [remove])
  const value = useMemo(() => ({ toast, remove }), [remove, toast])
  return <ToastContext.Provider value={value}>{children}<div className="fixed bottom-5 right-5 z-[90] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2" aria-live="polite" aria-atomic="true">{toasts.map((item) => <div key={item.id} className="flex items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-white shadow-2xl"><span className={item.type === "error" ? "text-accent" : "text-white"}>{item.type === "error" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}</span><span className="flex-1">{item.message}</span><button onClick={() => remove(item.id)} className="text-muted hover:text-white" aria-label="Dismiss notification"><X size={16} /></button></div>)}</div></ToastContext.Provider>
}
export function useToast() { const context = useContext(ToastContext); if (!context) throw new Error("useToast must be used inside ToastProvider"); return context }
