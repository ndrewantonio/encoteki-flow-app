export default function ExternalRedirectionBtn({
  wording,
  url,
  classname,
}: {
  wording: string
  url: string
  classname?: string
}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className={`${classname} w-full rounded-[32px] bg-primary-green py-2 duration-150 hover:bg-green-900`}
      >
        <p className="text-base font-medium text-white">{wording}</p>
      </button>
    </a>
  )
}
