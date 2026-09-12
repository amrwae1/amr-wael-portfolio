/**
 * One labelled fact in a project's masthead.
 *
 * Role, scope, type and status are the four things a reviewer checks before
 * deciding whether to read the argument, so they sit above it as a definition
 * list rather than being buried in prose. Status in particular has to be
 * unmissable: three of these projects are concepts and one is a live client
 * engagement, and that difference changes how everything below should be read.
 */
export function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="col-span-4 md:col-span-4 lg:col-span-3">
      <dt className="meta text-text-muted">{label}</dt>
      <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-text">{value}</dd>
    </div>
  );
}
