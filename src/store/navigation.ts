import { create } from 'zustand';

export type PageName = 'home' | 'about' | 'products' | 'productDetail' | 'dealership' | 'contact' | 'privacy' | 'terms' | 'freeDelivery' | 'returnsPolicy' | 'notFound';

interface NavigationState {
  currentPage: PageName;
  productId: string | null;
  navigate: (page: PageName, productId?: string | null) => void;
}

/* ─── Page title mapping for SEO ─── */
export const pageTitles: Record<PageName, string> = {
  home: "Shark Bond | India's Trusted Solvent Cement Manufacturer",
  about: 'About Us | Shark Bond — 10+ Years of Manufacturing Excellence',
  products: 'Products | Shark Bond — PVC, UPVC & CPVC Solvent Cement',
  productDetail: 'Product Details | Shark Bond Solvent Cement',
  dealership: 'Become a Dealer | Shark Bond Partnership Program',
  contact: 'Contact Us | Shark Bond — Get in Touch',
  privacy: 'Privacy Policy | Shark Bond — Chemseal Industries',
  terms: 'Terms & Conditions | Shark Bond — Chemseal Industries',
  freeDelivery: 'Free Delivery Across India | Shark Bond',
  returnsPolicy: 'Easy Free Returns Policy | Shark Bond',
  notFound: '404 — Page Not Found | Shark Bond',
};

/* ─── Page description mapping for SEO ─── */
export const pageDescriptions: Record<PageName, string> = {
  home: "Chemseal Industries manufactures Shark Bond - India's premium, ISO-certified PVC, UPVC & CPVC solvent cements. High bonding strength, leak-proof joints, and fast curing formulas.",
  about: "Chemseal Industries (est. 2015) has 10+ years of excellence in manufacturing premium solvent cements. Learn about our mission, vision, and dealer network.",
  products: "Explore our range of ISO certified Shark Bond solvent cements. Engineered for PVC, UPVC, and CPVC plumbing, pressure systems, and hot/cold water pipes.",
  productDetail: "Shark Bond product specifications. Learn about viscosity, cure speed, thermal ratings, and standards compatibility for your plumbing applications.",
  dealership: "Partner with Shark Bond - Chemseal Industries. Apply to become an authorized dealer or distributor in your region and join our network of 5,000+ dealers.",
  contact: "Get in touch with Chemseal Industries for wholesale orders, dealership queries, or technical support. Find our office locations, call us, or email us.",
  privacy: "Privacy Policy of Chemseal Industries (Shark Bond). Learn how we collect, protect, and handle your business inquiry data.",
  terms: "Terms and conditions of using the Shark Bond website. Intellectual property, liability limits, and dealer transaction rules.",
  freeDelivery: "Shark Bond offers 100% free delivery across all 28 states and union territories in India. Real-time tracking and secure OTP verification included.",
  returnsPolicy: "Enjoy peace of mind with our 24-month easy returns policy on Shark Bond products. Learn about reverse pickups, damage replacements, and refund terms.",
  notFound: "Page not found - Shark Bond.",
};

/* ─── Page keywords mapping for SEO ─── */
export const pageKeywords: Record<PageName, string> = {
  home: "Shark Bond, solvent cement, PVC cement, UPVC cement, CPVC cement, Chemseal Industries, leak-proof joint, hot water pipe cement, agricultural piping, high pressure solvent cement, India plumbing cement",
  about: "about Chemseal Industries, Shark Bond history, solvent cement manufacturers India, ISO 9001:2015 certified company, piping adhesives, piping solutions India",
  products: "solvent cement products, PVC solvent cement price, heavy bodied solvent cement, medium bodied cement, agricultural pipe glue, CPVC hot water cement",
  productDetail: "solvent cement specifications, pipe adhesive viscosity, ASTM standard solvent cement, IS 848 solvent cement",
  dealership: "become a dealer, solvent cement distributor, plumbing wholesale partnership, pipe adhesive dealership, Chemseal partnership program",
  contact: "contact Chemseal, Shark Bond phone number, Nikol Ahmedabad address, solvent cement wholesale contact, plumbing support",
  privacy: "privacy policy, Chemseal privacy, data protection policy",
  terms: "terms and conditions, user agreement, business terms",
  freeDelivery: "free delivery India, secure shipping, OTP delivery, order tracking, pan-India logistics, Chemseal dispatch",
  returnsPolicy: "free returns, replacement policy, return window, reverse logistics, refund processing, damaged shipment claims",
  notFound: "404 page, page not found",
};

/* ─── Hash ↔ Page mapping ─── */
export function parseHash(hash?: string): { page: PageName; productId: string | null } {
  const h = (hash ?? (typeof window !== 'undefined' ? window.location.hash : '')).replace('#', '') || '/';
  const segments = h.split('/').filter(Boolean);

  if (segments.length === 0) return { page: 'home', productId: null };

  switch (segments[0]) {
    case 'about':
      return { page: 'about', productId: null };
    case 'products':
      return segments.length > 1
        ? { page: 'productDetail', productId: segments[1] }
        : { page: 'products', productId: null };
    case 'dealership':
      return { page: 'dealership', productId: null };
    case 'contact':
      return { page: 'contact', productId: null };
    case 'privacy':
      return { page: 'privacy', productId: null };
    case 'terms':
      return { page: 'terms', productId: null };
    case 'free-delivery':
      return { page: 'freeDelivery', productId: null };
    case 'returns-policy':
      return { page: 'returnsPolicy', productId: null };
    default:
      return { page: 'notFound', productId: null };
  }
}

export function pageToHash(page: PageName, productId: string | null): string {
  switch (page) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'products':
      return '/products';
    case 'productDetail':
      return productId ? `/products/${productId}` : '/products';
    case 'dealership':
      return '/dealership';
    case 'contact':
      return '/contact';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'freeDelivery':
      return '/free-delivery';
    case 'returnsPolicy':
      return '/returns-policy';
    case 'notFound':
      return '/not-found';
    default:
      return '/';
  }
}

/* ─── Flag to suppress duplicate hashchange during programmatic navigation ─── */
let isNavigating = false;

/* ─── Zustand store — always starts with 'home' for SSR consistency ─── */
export const useNavigation = create<NavigationState>((set) => ({
  currentPage: 'home',
  productId: null,

  navigate: (page, productId = null) => {
    const hash = pageToHash(page, productId);

    // Update URL hash (this creates a browser history entry)
    isNavigating = true;
    window.location.hash = hash;

    // Immediately update state for instant UI response
    set({ currentPage: page, productId });

    // Update document title for SEO/accessibility
    document.title = pageTitles[page] || pageTitles.home;

    // Scroll to top instantly (smooth scroll during transitions causes jank)
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Reset flag after the hashchange event fires
    requestAnimationFrame(() => {
      isNavigating = false;
    });
  },
}));

/* ─── Sync store with URL hash on client-side mount ─── */
export function syncWithHash(): void {
  if (typeof window === 'undefined') return;

  const { page, productId } = parseHash();
  if (page !== 'home' || productId !== null) {
    useNavigation.setState({ currentPage: page, productId });
    document.title = pageTitles[page] || pageTitles.home;
  } else {
    // Ensure hash exists even for home page
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#/');
    }
  }
}

/* ─── Listen for hash changes (browser back/forward & deep links) ─── */
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    // Skip if this hashchange was triggered by our own navigate() call
    if (isNavigating) return;

    const { page, productId } = parseHash();
    const current = useNavigation.getState();

    // Only update if the page actually changed
    if (current.currentPage !== page || current.productId !== productId) {
      useNavigation.setState({ currentPage: page, productId });
      document.title = pageTitles[page] || pageTitles.home;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
}
