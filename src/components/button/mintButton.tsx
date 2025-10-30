export default function MintPageButton({
  wording,
  action,
  disabled,
}: {
  wording: string
  action: () => void
  disabled: boolean
}) {
  return (
    <button
      onClick={action}
      type="button"
      disabled={disabled}
      className={`w-full rounded-[32px] bg-primary-green py-3 duration-150 hover:bg-green-900 disabled:cursor-default disabled:bg-neutral-60 disabled:text-neutral-40`}
    >
      <p className="font-medium text-white">{wording}</p>
    </button>
  )
}
