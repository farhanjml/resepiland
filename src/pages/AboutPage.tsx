import React, { useState } from 'react';
import { ChefHat, Heart, Users, Globe2, Utensils, Star, ChevronDown, Mail, Phone } from 'lucide-react';
import CommunitySection from '../components/home/CommunitySection';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Resepi Land?",
    answer: "Resepi Land is Malaysia's largest cooking community platform that connects food enthusiasts with authentic Malaysian recipes and talented creators. We provide a space for sharing, learning, and preserving Malaysia's rich culinary heritage."
  },
  {
    question: "How do I sign up?",
    answer: "Joining Resepi Land is completely free! Simply click the 'Join Now' button and create an account using your email. Once registered, you can see recipes available from selected content creator, save recipes and create shopping lists."
  },
  {
    question: "How do I save recipes and create shopping lists?",
    answer: "Once you're logged in, you can save any recipe by clicking the bookmark icon. For shopping lists, you can add ingredients directly from recipe pages. Access your saved recipes and shopping lists from your profile dashboard."
  },
  {
    question: "Do I need to pay to access recipes?",
    answer: "No, accessing recipes on Resepi Land is completely free. We believe in making Malaysian cuisine accessible to everyone. However, some creators might offer premium content like cooking courses or exclusive recipes."
  }
];

const AboutPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505817368554-2165b1e42f85?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Malaysian Food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-4">
            <ChefHat className="w-12 h-12 md:w-20 md:h-20 text-amber-400 mx-auto mb-4 md:mb-8" />
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="block text-amber-400">About us</span>
            </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Connecting food enthusiasts with authentic recipes and talented creators from across Malaysia
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Our Mission</h2>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                  At Resepi Land, we're dedicated to preserving and celebrating Malaysia's rich culinary heritage. Our platform connects passionate food creators with enthusiasts, making authentic recipes accessible to everyone.
                </p>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Preserve Traditions</h3>
                      <p className="text-sm md:text-base text-gray-600">Documenting and sharing authentic Malaysian recipes for future generations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Build Community</h3>
                      <p className="text-sm md:text-base text-gray-600">Creating connections between food creators and enthusiasts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Promote Excellence</h3>
                      <p className="text-sm md:text-base text-gray-600">Showcasing Malaysia's best culinary talents and their expertise</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 md:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1974&auto=format&fit=crop"
                  alt="Malaysian street food"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Everything you need to know about Resepi Land
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-sm md:text-base text-gray-800">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`px-4 md:px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                      openFAQ === index ? 'max-h-48 py-3 md:py-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-sm md:text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}

    
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              If you wish your content to be removed from the website, please do not hesitate to contact us
            </p>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center p-6 rounded-xl bg-amber-50">
                  <Mail className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                  <a href="mailto:support@resepiland.xyz" className="text-amber-600 hover:text-amber-700">
                    support@resepiland.xyz
                  </a>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-xl bg-amber-50">
                  <Phone className="w-8 h-8 text-amber-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
                  <a href="tel:+60123456789" className="text-amber-600 hover:text-amber-700">
                    +60 12-345 6789
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Our support team is available Monday to Friday, 9:00 AM - 6:00 PM (GMT+8)
                </p>
              </div>
            </div>
          </div>
        </div>
   
    

      {/* Community Section */}
      <div className="container mx-auto px-2">
        <CommunitySection />
      </div>
    </div>
  );
};

export default AboutPage;