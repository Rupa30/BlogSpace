
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import HeroIllustration from '@/components/HeroIllustration';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
    });
    
    gsap.set(illustrationRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    // Animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4")
    .to(illustrationRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    }, "-=0.6");

    // Continuous floating animation for illustration
    gsap.to(illustrationRef.current, {
      y: -10,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: 2,
    });

  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      <main className="relative overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-6 lg:px-8">
          <div className="min-h-screen flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <h1 
                ref={titleRef}
                className="text-6xl lg:text-8xl font-bold leading-none mb-8"
              >
                Stories
                <br />
                <span className="text-gray-600">Worth</span>
                <br />
                Reading
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed"
              >
                Discover thoughtful perspectives and compelling narratives 
                from writers around the world.
              </p>
              
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button 
                        size="lg" 
                        className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link to="/blogs">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-black text-black hover:bg-gray-50 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        Read Blogs
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        size="lg" 
                        className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        Login to Read Blogs
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-black text-black hover:bg-gray-50 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        Start Reading
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right Illustration */}
            <div 
              ref={illustrationRef}
              className="flex-1 flex justify-center items-center max-w-lg ml-8 hidden lg:block"
            >
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-2 h-32 bg-black opacity-10"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-2 bg-black opacity-10"></div>
      </main>

      {/* Community Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with writers and readers who share your passion for great storytelling.
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-gray-600">Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-gray-600">Writers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-gray-600">Readers</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
