# Physical catalog only

Requirement: Luminare Gallery no longer offers digital downloads.
Cause: static cards, translations, product badges and catalog sync retained the digital offer.
Scope: remove digital category/cards/benefits and current-offer references from About,
Terms and Privacy; preserve the remaining policy wording and integrations.
Filter digital products at sync and rendering, using explicit metadata before text fallback.
Do not relabel digital products as physical. Do not edit raw catalog data or Etsy listings.
Old category URLs show the regular catalog because the removed filter has no button.
Acceptance: EN/IT/ES/FR/DE contain no digital offer; physical catalog/pagination remain intact.
1366x768: existing responsive grids and navigation retained, no new fixed widths.
Validation: JS syntax, focused catalog sync/render tests, translation references, diff --check.
No browser/GUI verification, per project instruction. No dependencies or DB changes.
Commit: fix: remove digital download offer from Luminare Gallery
