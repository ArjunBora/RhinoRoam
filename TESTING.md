# RhinoRoam Testing Checklist

## 🎯 Testing Overview
Test the RhinoRoam website for branding consistency, functionality, and user experience.

**URLs to Test:**
- **Production**: https://guenark-heritage.vercel.app
- **Local Dev**: http://localhost:3000

---

## ✅ Branding & Visual Identity

### Navigation (All Pages)
- [ ] Logo shows 🦏 rhino emoji
- [ ] Brand name displays "RhinoRoam" (not AxomConnect)
- [ ] Logo is clickable and returns to homepage
- [ ] Navigation is transparent on homepage, solid on other pages
- [ ] Mobile menu works on small screens

### Footer (All Pages)
- [ ] Footer logo shows "RhinoRoam"
- [ ] Copyright text: "© 2026 RhinoRoam. All rights reserved."
- [ ] Social links present (if applicable)
- [ ] Footer links are clickable

### Homepage
- [ ] Page title in browser tab: "RhinoRoam - Roam Assam with the Locals"
- [ ] Hero section displays properly
- [ ] Tagline mentions local/community focus
- [ ] CTA buttons work

---

## 🧭 Core Navigation & Pages

### Explore Section
- [ ] `/map` - Interactive map loads without errors
  - [ ] POI list displays on right sidebar
  - [ ] Clicking POI shows detail panel
  - [ ] Map controls visible (zoom, locate)
  - [ ] Default markers show (leaflet icons)
  
- [ ] `/experiences` - Experience listings page loads
  - [ ] Sample experiences display
  - [ ] Filters work (if any)
  - [ ] Cards are clickable

- [ ] `/experiences/[slug]` - Individual experience page
  - [ ] Hero image displays
  - [ ] Reviews section shows (with reviewCount)
  - [ ] Host info visible
  - [ ] Booking button present

- [ ] `/trails` - Heritage trails page
- [ ] `/districts` - Districts listing
- [ ] `/collections` - Experience collections

### Plan Section
- [ ] `/plan` - Trip planner wizard
  - [ ] Multi-step form works
  - [ ] Experience category selection (no ringColor errors)
  - [ ] District selection (no ringColor errors)
  - [ ] Budget selector shows correct pricing
  
- [ ] `/seasonality` - Best time to visit
  - [ ] Month selection works (no ringColor errors)
  - [ ] Weather info displays
  
- [ ] `/how-to-reach` - Transportation guide

### Connect Section
- [ ] `/guides` - Local guides directory
  - [ ] CTA: "Join RhinoRoam to connect with travelers..."
  - [ ] Guide cards display
  
- [ ] `/communities` - Community hosts
- [ ] `/artisans` - Artisan directory
  - [ ] CTA: "Join RhinoRoam to showcase your craft..."
  
- [ ] `/stays` - Accommodation listings
  - [ ] Filter by type works (no ringColor errors)
  - [ ] Price filter works

### Host Registration
- [ ] `/hosts/register` - Become a host
  - [ ] Welcome message: "Welcome to RhinoRoam!" (on completion)
  - [ ] Multi-step wizard works (4 steps)
  - [ ] Host type selection (no ringColor errors)
  - [ ] Terms: "I agree to RhinoRoam's Terms of Service..."
  - [ ] Verification text: "RhinoRoam will verify my identity..."

### Content Pages
- [ ] `/festivals` - Festivals & events
- [ ] `/articles` - Blog/articles
- [ ] `/stories` - Traveler stories

---

## 🔍 Functionality Tests

### Search & Filters
- [ ] Search bar in navigation works
- [ ] Category filters work without errors
- [ ] Price range sliders function
- [ ] Location/district filters apply correctly

### Interactive Elements
- [ ] All buttons are clickable
- [ ] Hover effects work on cards
- [ ] Dropdown menus open/close
- [ ] Modals open and close
- [ ] Image galleries work (if any)

### Forms
- [ ] Host registration form validates
- [ ] Email format validation works
- [ ] Required fields marked
- [ ] Error messages display properly

### Responsive Design
- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Navigation hamburger menu on mobile
- [ ] Touch interactions work on mobile

---

## 🐛 Known Issues to Verify Fixed

### CSS Property Errors
- [ ] No `ringColor` errors in console
  - Check: `/plan` page (experience/district selection)
  - Check: `/seasonality` (month selection)
  - Check: `/stays` (filter selection)
  - Check: `/artisans` (artisan cards)
  - Check: `/map` (POI selection)
  - Check: `/hosts/register` (host type selection)

### Build Errors
- [ ] `/map` page doesn't crash (SSR leaflet fix)
- [ ] No TypeScript errors in console
- [ ] No missing image warnings

### Data Display
- [ ] Review counts show correctly (not ReactNode type)
- [ ] Budget property mapping works (`mid-range` → `midRange`)
- [ ] All sample data displays

---

## 🎨 Design & UX

### Color Palette
- [ ] Tea Garden green (`--tea-garden`) used for primary actions
- [ ] Muga Gold (`--muga-gold`) used for accents
- [ ] River blue (`--brahmaputra`) visible
- [ ] Dark mode toggle works (if implemented)

### Typography
- [ ] Headings use `var(--font-heading)`
- [ ] Body text is readable
- [ ] Font sizes responsive

### Spacing & Layout
- [ ] Consistent padding/margins
- [ ] Cards align properly in grids
- [ ] No overlapping content
- [ ] Proper whitespace

### Animations
- [ ] Smooth page transitions
- [ ] Hover effects subtle
- [ ] Loading states show
- [ ] No janky animations

---

## 🚀 Performance

### Load Times
- [ ] Homepage loads in < 3 seconds
- [ ] Images lazy load
- [ ] Smooth scrolling

### Console
- [ ] No JavaScript errors
- [ ] No 404 errors for resources
- [ ] No CORS errors

---

## 📱 SEO & Meta Tags

### Open Browser DevTools → Elements → `<head>`
- [ ] Title: "RhinoRoam - Roam Assam with the Locals"
- [ ] Meta description mentions Assam & community
- [ ] Open Graph tags present
- [ ] Twitter card tags present
- [ ] Favicon displays (if added)

---

## 📝 Testing Notes

**Date:** _________________

**Tested By:** _________________

**Browser:** _________________

**Device:** _________________

### Issues Found:
1. 
2. 
3. 

### Suggestions:
1. 
2. 
3. 

---

## ✨ Quick Test Commands

```bash
# Run local dev server
npm run dev

# Build for production (check for errors)
npm run build

# Run linter
npm run lint

# Check TypeScript
npx tsc --noEmit
```

---

**Happy Testing! 🦏**
