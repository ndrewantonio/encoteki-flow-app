export default function SDGBadge({
  wording,
  bgColor,
  textColor,
  className,
}: {
  wording: string
  bgColor: string
  textColor: string
  className?: string
}) {
  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`w-fit rounded-full px-2 py-1 text-xs tablet:text-sm ${className}`}
    >
      {wording}
    </div>
  )
}
