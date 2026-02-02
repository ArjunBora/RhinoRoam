# Plan: Image Asset Integration & Update

## 1. Objective
Update the `src/app/page.tsx` file to utilize the newly uploaded WebP images for the "Experiences" section and the "Hero" section, replacing the current placeholders/URLs.

## 2. Asset Preparation (Renaming)
To ensure best practices and avoid URL encoding issues, we will rename the uploaded files to kebab-case before linking them.

| Original Filename | New Filename | Usage |
| :--- | :--- | :--- |
| `Majuli Island Heritage Walk.webp` | `majuli-island-heritage-walk.webp` | Experience ID: 1 |
| `Kaziranga Safari & Conservation.webp` | `kaziranga-safari-conservation.webp` | Experience ID: 2 |
| `Muga Silk Weaving Workshop.webp` | `muga-silk-weaving-workshop.webp` | Experience ID: 3 |
| `Tea Garden Stay & Plucking.webp` | `tea-garden-stay-plucking.webp` | Experience ID: 4 |
| `Mising Tribal Village Stay.webp` | `mising-tribal-village-stay.webp` | Experience ID: 5 |
| `Brahmaputra River Cruise.webp` | `brahmaputra-river-cruise.webp` | Experience ID: 6 |
| `Hero page.jpg` | `hero-page.jpg` | Main Hero Background |

## 3. Implementation Steps (`src/app/page.tsx`)

### A. Update Hero Section
- **Current**: `/images/home-hero.jpg`
- **New**: `/images/hero-page.jpg` (or keeping original name if preferred, but optimized name is better)

### B. Update `featuredExperiences` Data
Update the `image` property for each experience object in the `featuredExperiences` array.

1.  **ID 1 (Majuli)**: `https://images.unsplash.com...` -> `/images/majuli-island-heritage-walk.webp`
2.  **ID 2 (Kaziranga)**: `https://images.unsplash.com...` -> `/images/kaziranga-safari-conservation.webp`
3.  **ID 3 (Muga Silk)**: `https://images.unsplash.com...` -> `/images/muga-silk-weaving-workshop.webp`
4.  **ID 4 (Tea Garden)**: `/images/tea-garden-dibrugarh.jpg` -> `/images/tea-garden-stay-plucking.webp`
5.  **ID 5 (Mising)**: `https://images.unsplash.com...` -> `/images/mising-tribal-village-stay.webp`
6.  **ID 6 (River Cruise)**: `https://images.unsplash.com...` -> `/images/brahmaputra-river-cruise.webp`

## 4. Verification
- Verify that the application builds correctly.
- Verify that images load correctly in the browser (no 404s).
- Run linting to ensure no code quality issues were introduced.
