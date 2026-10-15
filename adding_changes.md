# Customizing Personalized Resources with Bob

> **Note:** The **Personalized Resources** page is currently disabled to ensure the privacy of client documents.

This guide explains how IBM teams can customize the **Personalized Resources** page for specific clients, accounts, or Bobathons using **Bob (AI Coding Assistant)** when enabled.

---

## 1. Overview of the Personalized Resources Section

The **Personalized Resources** page (`PersonalizedResourcesPage` in `src/App.tsx`) is designed to showcase account-specific deliverables:
- **Featured Presentation Banner**: The main highlight deck (e.g., *Lab Intro*, *Executive Overview*).
- **Personalized Resources Grid / Carousel**: Account-specific lab setup guides, discovery workshop decks, PDFs, and presentations.
- **Client Eyebrows & Branding**: Header labels such as *"Featured for Honda"*.

---

## 2. File & Asset Locations

| Item | Location | Description |
| :--- | :--- | :--- |
| **Code & Config** | [`src/App.tsx`](src/App.tsx) | Contains `FEATURED_PRESENTATION`, `PERSONALIZED_RESOURCES`, and client text labels. |
| **Document Files** | [`public/personalized-resources/`](public/personalized-resources/) | Place `.pdf`, `.pptx`, or `.docx` files here. |
| **Preview Images** | [`public/personalized-resources/`](public/personalized-resources/) | Place `.png`, `.jpg`, or `.svg` preview thumbnails here. |

---

## 3. How to Use Bob to Make Changes

Bob can automatically update the data structures, asset paths, and text labels for you. Just open your workspace in Bob and prompt Bob in natural language.

### Example Prompts for Bob

#### A. Updating the Client Name & Branding
> *"Bob, update the personalized resources page to be branded for 'Acme Financial'. Change the 'Featured for Honda' tag to 'Featured for Acme Financial' and update any Honda references in the lab descriptions."*

#### B. Adding a New Document / Slide Deck
1. Drop your PDF or PPTX file (and optional preview image) into the `public/personalized-resources/` folder.
2. Ask Bob:
> *"Bob, I added `public/personalized-resources/cloud-migration-guide.pdf` and its thumbnail `public/personalized-resources/cloud-migration-thumb.png`. Please add this as a new PDF resource in `PERSONALIZED_RESOURCES` with the title 'Cloud Migration Lab Guide', accent '#009D9A', and eyebrow 'Lab Architecture'."*

#### C. Changing the Featured Presentation
> *"Bob, change the featured presentation on the Personalized Resources page to use 'use-case-discovery.pptx' instead of 'lab-intro.pptx'. Update the title to 'Modernization Use Case Workshop' and description to match."*

#### D. Adding or Removing Multiple Resources
> *"Bob, replace the existing personalized resources with these 3 items:*
> 1. *Title: 'Day 1 Hands-on Lab', PDF: 'day1-lab.pdf', preview: 'day1-preview.png', accent: '#0F62FE'*
> 2. *Title: 'Executive Briefing', PPTX: 'exec-briefing.pptx', preview: 'exec-preview.png', accent: '#8A3FFC'*
> 3. *Title: 'Architecture Blueprint', PDF: 'blueprint.pdf', preview: 'blueprint-preview.png', accent: '#009D9A' "*

---

## 4. Manual Configuration Reference

If you prefer to make manual edits in [`src/App.tsx`](src/App.tsx), here is how the data structures are defined:

### The `PersonalizedResource` Object

```typescript
interface PersonalizedResource {
  title: string        // Document title (e.g. "Lab Intro")
  description: string  // Brief summary
  type: 'PowerPoint' | 'PDF'
  url: string          // File download path using ${BASE}
  preview: string      // Image preview path using ${BASE}
  accent: string       // Hex color (e.g. IBM Blue '#0F62FE', Purple '#8A3FFC', Teal '#009D9A')
  eyebrow: string      // Small category label above the title
}
```

### Example Entry in `src/App.tsx`

```typescript
const FEATURED_PRESENTATION: PersonalizedResource = {
  title: 'Lab Intro',
  description: 'An introduction to the application modernization lab and exercises.',
  type: 'PowerPoint',
  url: `${BASE}personalized-resources/my-presentation.pptx`,
  preview: `${BASE}personalized-resources/my-preview.png`,
  accent: '#0F62FE',
  eyebrow: 'Featured presentation',
}

const PERSONALIZED_RESOURCES: PersonalizedResource[] = [
  {
    title: 'Bobathon Setup Guide',
    description: 'Setup instructions and prerequisites for the hands-on lab.',
    type: 'PDF',
    url: `${BASE}personalized-resources/setup-guide.pdf`,
    preview: `${BASE}personalized-resources/setup-preview.jpg`,
    accent: '#0F62FE',
    eyebrow: 'Lab preparation',
  },
  // Add additional resources here...
]
```

> **Note on Asset Paths:** Always use the `${BASE}` template variable before `/personalized-resources/...` so assets resolve properly on GitHub Pages and subpaths.

---

## 5. Previewing & Deploying Changes

1. **Test locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` and click **Personalized Resources** in the navigation bar to inspect your changes.

2. **Deploy to GitHub Pages**:
   Commit and push your changes to `main`:
   ```bash
   git add .
   git commit -m "Update personalized resources for client workshop"
   git push origin main
   ```
   Or ask Bob:
   > *"Bob, build and deploy the latest changes to the gh-pages branch."*
