# PostHog post-wizard report

The wizard has completed a deep integration of your Willow & Wisp gift shop project with PostHog analytics. The integration includes client-side event tracking via `instrumentation-client.ts` (the recommended approach for Next.js 16+), server-side tracking capabilities via `posthog-node`, and a reverse proxy configuration to route analytics through your domain for improved reliability and ad-blocker bypass.

## Integration Summary

### Infrastructure Files Created
- **`instrumentation-client.ts`** - Client-side PostHog initialization with error tracking enabled
- **`lib/posthog-server.ts`** - Server-side PostHog client for backend event tracking
- **`.env`** - Environment variables for PostHog API key and host (EU region)
- **`next.config.ts`** - Updated with reverse proxy rewrites for `/ingest` routes

### Component Tracking Added
New client components were created to encapsulate tracking logic while keeping server components intact:
- **`components/add-to-cart-button.tsx`** - Add to cart button with tracking
- **`components/product-view-tracker.tsx`** - Product page view tracker
- **`components/collection-view-tracker.tsx`** - Collection page view tracker
- **`components/product-card.tsx`** - Product card with click tracking
- **`components/collection-card.tsx`** - Collection card with click tracking

## Events Implemented

| Event Name | Description | File(s) |
|------------|-------------|---------|
| `cta_clicked` | User clicked a call-to-action button (Explore Gifts, View Bundles) | `components/hero-home.tsx` |
| `category_clicked` | User clicked a featured category to browse products | `components/featured-categories.tsx` |
| `newsletter_subscribed` | User submitted email to subscribe to newsletter (includes user identification) | `components/join-the-wisp.tsx` |
| `navigation_clicked` | User clicked a main navigation link (Shop, Bundles, About, Journal) | `components/header.tsx` |
| `search_clicked` | User clicked the search button | `components/header.tsx` |
| `cart_viewed` | User clicked to view their shopping cart | `components/header.tsx` |
| `collection_viewed` | User viewed a product collection page | `components/collection-view-tracker.tsx`, `app/collections/[slug]/page.tsx` |
| `collection_card_clicked` | User clicked on a collection card to browse products | `components/collection-card.tsx`, `app/shop/page.tsx` |
| `product_viewed` | User viewed a product detail page | `components/product-view-tracker.tsx`, `app/product/[slug]/page.tsx` |
| `product_card_clicked` | User clicked on a product card to view details | `components/product-card.tsx`, `app/collections/[slug]/page.tsx` |
| `add_to_cart_clicked` | User clicked Add to Cart button on a product page | `components/add-to-cart-button.tsx`, `app/product/[slug]/page.tsx` |

## User Identification

Users are identified when they subscribe to the newsletter via the `posthog.identify()` call, using their email address as the distinct ID. This links all future events to their profile and sets the following person properties:
- `email`
- `subscribed_to_newsletter`
- `newsletter_signup_date`

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/115278/dashboard/484664) - Core analytics dashboard with conversion funnels and engagement metrics

### Insights
- [Product Views Over Time](https://eu.posthog.com/project/115278/insights/kE8EFwx7) - Track daily product page views
- [Product to Cart Conversion Funnel](https://eu.posthog.com/project/115278/insights/WfKx6AZC) - Monitor conversion from product view to add-to-cart
- [Newsletter Subscriptions](https://eu.posthog.com/project/115278/insights/R6EOWqxG) - Track newsletter signup growth
- [Homepage to Collection Funnel](https://eu.posthog.com/project/115278/insights/YrFOVrk4) - Measure CTA effectiveness to collection browsing
- [Navigation Usage Breakdown](https://eu.posthog.com/project/115278/insights/b51nh2CI) - See which navigation links are most popular

## Environment Variables

Make sure your `.env` file contains:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_IXrwkGLaFD2aBOSJu6uvAf6fmcYFnVly3vq1X5kGwMQ
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

## Packages Installed
- `posthog-js` - Client-side analytics SDK
- `posthog-node` - Server-side analytics SDK
