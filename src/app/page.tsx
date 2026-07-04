'use client';

import React, { useEffect } from 'react';
import { useNavigation, pageTitles, pageDescriptions, pageKeywords, syncWithPath } from '@/store/navigation';
import Navbar from '@/components/sharkbond/Navbar';
import Footer from '@/components/sharkbond/Footer';
import FloatingButtons from '@/components/sharkbond/FloatingButtons';
import PageTransition from '@/components/sharkbond/PageTransition';
import Home from '@/views/Home';
import About from '@/views/About';
import Products from '@/views/Products';
import ProductDetail from '@/views/ProductDetail';
import Dealership from '@/views/Dealership';
import Contact from '@/views/Contact';
import Privacy from '@/views/Privacy';
import Terms from '@/views/Terms';
import FreeDelivery from '@/views/FreeDelivery';
import ReturnsPolicy from '@/views/ReturnsPolicy';
import NotFound from '@/views/NotFound';

const pageComponents: Record<string, React.ComponentType> = {
  home: Home,
  about: About,
  products: Products,
  productDetail: ProductDetail,
  dealership: Dealership,
  contact: Contact,
  privacy: Privacy,
  terms: Terms,
  freeDelivery: FreeDelivery,
  returnsPolicy: ReturnsPolicy,
  notFound: NotFound,
};

export default function Page() {
  const { currentPage, productId } = useNavigation();

  // Sync with URL path on first client-side mount (deep linking support)
  useEffect(() => {
    syncWithPath();
  }, []);

  // Sync document title and SEO meta tags whenever the page changes
  useEffect(() => {
    document.title = pageTitles[currentPage] || pageTitles.home;

    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const desc = pageDescriptions[currentPage] || pageDescriptions.home;
    const keywords = pageKeywords[currentPage] || pageKeywords.home;
    const title = pageTitles[currentPage] || pageTitles.home;

    setMetaTag('name', 'description', desc);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', desc);
  }, [currentPage]);

  const PageComponent = pageComponents[currentPage] || NotFound;
  // Include productId in key so product detail pages re-render when switching products
  const pageKey = currentPage === 'productDetail' ? `productDetail-${productId}` : currentPage;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageTransition pageKey={pageKey}>
          <PageComponent />
        </PageTransition>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
