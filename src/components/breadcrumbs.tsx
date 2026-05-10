/**
 * Minimal breadcrumb trail. Used by help-center pages.
 * (Extracted from listing-card.tsx during the pool-rental cleanup.)
 *
 * API kept identical to the original: `items: Array<{ name, path }>`.
 */
export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-2">
              {item.path && !isLast ? (
                <a href={item.path} className="hover:text-foreground">
                  {item.name}
                </a>
              ) : (
                <span className={isLast ? "text-foreground" : ""}>{item.name}</span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
