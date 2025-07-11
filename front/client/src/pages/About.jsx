import React from 'react';
import { Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="panaromic-banner.jpg"
            alt="Jewelry craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Story</h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Crafting exquisite jewelry with passion and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At LUXE, we believe that jewelry is more than an accessory—it's a tangible expression of life's most cherished moments. Our mission is to create exquisite pieces that become treasured heirlooms, passed down through generations.
              </p>
              <p className="text-gray-600 mb-4">
                We are committed to ethical sourcing, exceptional craftsmanship, and unparalleled customer service. Each piece in our collection is designed with intention and crafted with care, using only the finest materials.
              </p>
              <p className="text-gray-600">
                Our team of master jewelers combines traditional techniques with innovative design to create pieces that are both timeless and contemporary. We take pride in our attention to detail and our dedication to quality.
              </p>
            </div>

            <div className="relative">
              <img
                src="mission.jpg"
                alt="Jewelry crafting"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 bg-[#D4AF37]/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-900 mb-3">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at LUXE, from design and craftsmanship to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#D4AF37] text-xl font-serif">01</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Exceptional Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials and employ rigorous quality control to ensure that each piece meets our exacting standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#D4AF37] text-xl font-serif">02</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Ethical Sourcing</h3>
              <p className="text-gray-600">
                We are committed to responsible sourcing practices, ensuring that our materials are obtained in ways that respect both people and the planet.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#D4AF37] text-xl font-serif">03</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Timeless Design</h3>
              <p className="text-gray-600">
                We create pieces that transcend trends, focusing on elegant designs that will be cherished for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#1A237E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Have Questions?</h2>
            <p className="text-lg text-white/90 mb-8">
              We're here to help! Our team of jewelry experts is ready to assist you with any questions you may have about our collections, custom designs, or care instructions.
            </p>
            <Link to="/contact">
              <Button
                variant="primary2"
                size="lg"
                className="bg-white hover:bg-white/90 text-[#000000] flex items-center mx-auto"
              >
                <Mail size={18} className="mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;