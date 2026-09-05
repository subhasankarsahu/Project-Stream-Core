export function BrandMark({ className = "h-8 w-8", label = "StreamCore" }) {
  return <img src="/streamcore-logo.svg" alt={label} className={`block shrink-0 object-contain ${className}`} />
}
