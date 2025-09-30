# Dynamic Scroll Animation System

## Overview
The IBLT landing page now features a dramatic and dynamic scroll animation system with multiple animation types, parallax effects, and staggered animations.

## Animation Types

### 1. **Slide Up** (`data-animation="slide-up"`)
- Elements slide in from bottom with fade
- **Use case:** Default animation, general content
- **Example:** Contact form

### 2. **Slide Left** (`data-animation="slide-left"`)
- Elements slide in from left side
- **Use case:** Left-aligned content, text blocks
- **Example:** Welcome section text

### 3. **Slide Right** (`data-animation="slide-right"`)
- Elements slide in from right side
- **Use case:** Right-aligned content, images
- **Example:** Image galleries

### 4. **Scale In** (`data-animation="scale-in"`)
- Elements scale up from 85% with bounce effect
- **Use case:** Cards, images, featured content
- **Example:** Program cards, partner logos, welcome image

### 5. **Fade In** (`data-animation="fade-in"`)
- Simple opacity fade-in
- **Use case:** Headers, subtle content
- **Example:** Section headers, stats

### 6. **Rotate In** (`data-animation="rotate-in"`)
- Elements rotate and scale in with bounce
- **Use case:** CTAs, special announcements
- **Example:** Admissions section

## Parallax Effect

Add `parallax` class with `data-speed` attribute for parallax scrolling:

```html
<div class="parallax" data-speed="0.1">
  <!-- Content moves slower than scroll -->
</div>
```

**Speed values:**
- `0.1` - Subtle parallax (recommended for images)
- `0.3` - Medium parallax
- `0.5` - Strong parallax

## Staggered Animations

Add `data-delay` attribute to create cascading effects:

```html
<div class="animate-on-scroll" data-animation="scale-in" data-delay="1">Card 1</div>
<div class="animate-on-scroll" data-animation="scale-in" data-delay="2">Card 2</div>
<div class="animate-on-scroll" data-animation="scale-in" data-delay="3">Card 3</div>
```

**Delay values:** 1-5 (0.1s - 0.5s increments)

## Applied Animations by Section

### ✅ **Hero Section**
- Typewriter effect (existing)
- No scroll animation (always visible)

### ✅ **Features Section**
- Default slide-up animation
- Auto-play carousel

### ✅ **Welcome Section**
- **Left Column:** `slide-left` - Text slides from left
- **Right Image:** `scale-in` with `parallax` - Scales in with subtle parallax
- **Stats:** `fade-in` - Fades in after image

### ✅ **Programs Section**
- **Header:** `fade-in`
- **6 Program Cards:** `scale-in` with staggered delays (1-5)
- Creates dramatic cascading effect

### ✅ **Admissions Section**
- **Entire section:** `rotate-in` - Rotates and scales for dramatic effect

### ✅ **Contact Section**
- **Header:** `fade-in`
- **Form:** `slide-up` - Slides up from bottom

### ✅ **Partners Section**
- **Header:** `fade-in`
- **Partner Grid:** `scale-in` - All partners scale in together

### ✅ **Newsletter Section**
- Default slide-up animation

## Performance Optimizations

1. **RequestAnimationFrame** - All scroll handlers use RAF for smooth 60fps
2. **Throttling** - Scroll events are throttled to prevent excessive calls
3. **Will-change** - CSS `will-change` property for hardware acceleration
4. **Cubic Bezier Easing** - Smooth, natural-feeling animations

## Animation Timing

- **Slide animations:** 0.9s
- **Scale animations:** 1s (with bounce easing)
- **Fade animations:** 1.2s
- **Rotate animations:** 1s (with bounce easing)

## Browser Compatibility

✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ Mobile-optimized with touch-friendly interactions
✅ Respects `prefers-reduced-motion` for accessibility

## How to Use

### Adding animation to new elements:

```html
<!-- Simple animation (default slide-up) -->
<div class="animate-on-scroll">Content</div>

<!-- Specific animation type -->
<div class="animate-on-scroll" data-animation="scale-in">Content</div>

<!-- With delay (for staggering) -->
<div class="animate-on-scroll" data-animation="scale-in" data-delay="2">Content</div>

<!-- With parallax -->
<div class="animate-on-scroll parallax" data-animation="scale-in" data-speed="0.1">
  <img src="image.jpg" alt="Parallax image">
</div>
```

## Tips for Best Results

1. **Use scale-in for cards** - Creates impactful entrance
2. **Use fade-in for headers** - Subtle and professional
3. **Use slide animations for content blocks** - Directional flow
4. **Add parallax to hero images** - Depth and engagement
5. **Stagger similar elements** - Visual rhythm (cards, grid items)
6. **Mix animation types** - Variety keeps it interesting

## Future Enhancements

- [ ] Mouse parallax (elements follow cursor)
- [ ] Scroll-triggered particle effects
- [ ] 3D flip animations for cards
- [ ] Magnetic buttons (hover attraction)
- [ ] Smooth scroll anchors
