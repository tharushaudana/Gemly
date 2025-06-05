import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import CollectionCard from '../components/ui/CollectionCard';
import TestimonialCard from '../components/ui/TestimonialCard.jsx';
import Newsletter from '../components/ui/Newsletter';

import { getBestSellers, getNewArrivals } from '../data/products';
import { collections } from '../data/collections';
import { testimonials } from '../data/testimonials';
import { useMemo } from 'react';
import AsyncWrapper from '../components/AsyncWrapper.jsx';
import { fetchWithError } from '../utils/fetchWithError.js';
import { useState } from 'react';

const Home = () => {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const [homepageData, setHomepageData] = useState(null);

  const handleOnSuccess = (data) => {
    setHomepageData(data);
  }

  const promises = useMemo(() => [
    () => fetchWithError(fetch(`http://localhost:3000/homepage`)),
  ], []);

  return (
    <AsyncWrapper
      promises={promises}
      onSuccess={handleOnSuccess}
    >
      <div>
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="assets/banner.jpg"
              alt="Luxury jewelry"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4">
                Timeless Elegance <span className="font-normal">For Every Occasion</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Discover our exquisite collection of handcrafted jewelry pieces designed to celebrate life's most precious moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button variant="primary" size="lg">Shop Collection</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-gray-900 mb-3">Featured Collections</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our carefully curated collections, each designed to capture a unique essence of style and craftsmanship.
              </p>
            </div>

            {homepageData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homepageData.featuredCollections.map(collection => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif text-gray-900">Best Sellers</h2>
              <Link
                to="/products?filter=bestsellers"
                className="flex items-center text-[#D4AF37] hover:underline font-medium"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            {homepageData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {homepageData.bestSellers.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Luxury Banner */}
        <section className="py-20 bg-[#1A237E] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="assets/panaromic-banner.jpg"
              alt="Luxury jewelry background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-6">Craftsmanship That Tells A Story</h2>
              <p className="text-lg text-white/90 mb-8">
                Each piece in our collection is meticulously handcrafted by master artisans who bring decades of expertise to their work. We use only the finest materials, ethically sourced from around the world.
              </p>
              <Link to="/about">
                <Button variant="primary2" size="lg" className="bg-white hover:bg-white/90 text-[#000000]">
                  Discover Our Process
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif text-gray-900">New Arrivals</h2>
              <Link
                to="/products?filter=new"
                className="flex items-center text-[#D4AF37] hover:underline font-medium"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            {homepageData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {homepageData.newArrivals.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-gray-900 mb-3">What Our Customers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We take pride in delivering exceptional quality and service. Here's what our customers have to say about their LUXE experience.
              </p>
            </div>

            {/* Slider component configuration remains the same */}
            <Slider {...testimonialSettings} className="testimonial-slider">
              {/* Assumes TestimonialCard is a valid JS/TS component */}
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="px-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </AsyncWrapper>
  );
};

export default Home;