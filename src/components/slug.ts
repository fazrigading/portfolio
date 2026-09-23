// Slug helpers for project detail pages. Single source so home,
// projects index, and [...slug] never drift.
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
