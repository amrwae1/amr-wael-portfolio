import type { MissingAsset } from "@/content/portfolio";

/**
 * A slot for an artifact that does not exist yet.
 *
 * Deliberately not designed to resemble a screen: no chrome, no wireframe
 * blocks, no shimmer. It names the exact artifact that is missing and reserves
 * the correct aspect ratio so the real asset drops in without reflow.
 */
export function MissingAssetSlot({ asset }: { asset: MissingAsset }) {
  return (
    <div
      className="flex flex-col justify-end rounded-[12px] border border-dashed p-5"
      style={{
        aspectRatio: `${asset.width} / ${asset.height}`,
        borderColor: "color-mix(in srgb, var(--color-boundary) 45%, transparent)",
        backgroundColor: "var(--color-surface-1)",
      }}
    >
      <p className="meta" style={{ color: "var(--color-boundary)" }}>
        Missing asset — not evidence
      </p>
      <p className="mt-2 text-[0.95rem] leading-snug text-text">{asset.artifact}</p>
      <p className="meta mt-2">Reserved at {asset.ratio}</p>
    </div>
  );
}

/**
 * A compact list of absent artifacts, with no reserved boxes.
 *
 * Used where real evidence is already present: the gap is worth stating, but a
 * placeholder sitting beside actual screens would compete with them.
 */
export function MissingAssetRows({
  assets,
  className = "",
}: {
  assets: readonly MissingAsset[];
  className?: string;
}) {
  return (
    <ul className={`flex list-none flex-col gap-0 border-t border-rule p-0 ${className}`}>
      {assets.map((asset) => (
        <li
          key={asset.artifact}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule py-3"
        >
          <span className="text-[0.95rem] leading-snug text-text">{asset.artifact}</span>
          <span className="meta" style={{ color: "var(--color-boundary)" }}>
            Awaiting artifact · {asset.ratio}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The primary missing artifact is reserved at its true ratio; any further ones
 * are listed compactly. Three empty boxes would out-shout the real evidence
 * elsewhere on the page, which is the opposite of the point.
 */
export function MissingAssetGroup({
  assets,
  className = "",
}: {
  assets: readonly MissingAsset[];
  className?: string;
}) {
  const [primary, ...rest] = assets;

  return (
    <div className={className}>
      <MissingAssetSlot asset={primary} />

      {rest.length > 0 ? (
        <ul className="mt-4 flex list-none flex-col gap-0 p-0">
          {rest.map((asset) => (
            <li
              key={asset.artifact}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule py-3"
            >
              <span className="text-[0.95rem] leading-snug text-text">{asset.artifact}</span>
              <span className="meta" style={{ color: "var(--color-boundary)" }}>
                Awaiting artifact · {asset.ratio}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
