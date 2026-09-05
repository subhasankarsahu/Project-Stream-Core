export function FormField({ label, error, ...props }) {
  return <label className="block space-y-2 text-sm font-medium"><span>{label}</span><input {...props} className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-white outline-none transition focus:border-accent" />{error && <span className="block text-xs text-accent">{error}</span>}</label>
}
