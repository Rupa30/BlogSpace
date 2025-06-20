
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import HeroIllustration from '@/components/HeroIllustration';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, BookOpen, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
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
      duration: 1.2,
      ease: "power3.out",
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")
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
    }, "-=0.6")
    .to(statsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    // Continuous floating animation for illustration
    gsap.to(illustrationRef.current, {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: 2,
    });

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-800 text-black dark:text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      <Navigation />
      
      <main className="relative">
        <div ref={heroRef} className="container mx-auto px-6 lg:px-8">
          <div className="min-h-screen flex items-center justify-between pt-20">
            {/* Left Content */}
            <div className="flex-1 max-w-3xl relative z-10">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 backdrop-blur-sm">
                  <Sparkles size={16} className="animate-pulse" />
                  Welcome to the Future of Blogging
                </span>
              </div>
              
              <h1 
                ref={titleRef}
                className="text-6xl lg:text-8xl font-bold leading-none mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
              >
                Stories
                <br />
                <span className="relative">
                  Worth
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform scale-x-0 animate-[scaleX_2s_ease-out_2s_forwards] origin-left"></div>
                </span>
                <br />
                Reading
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-2xl"
              >
                Discover thoughtful perspectives and compelling narratives 
                from writers around the world. Join our community of storytellers and readers.
              </p>
              
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button 
                        size="lg" 
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Go to Dashboard
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/blogs">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      >
                        Read Blogs
                        <BookOpen size={20} className="ml-2" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        size="lg" 
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Login to Read Blogs
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      >
                        Start Reading
                        <Sparkles size={20} className="ml-2" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Stats Section */}
              <div ref={statsRef} className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Stories</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Writers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10k+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Readers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div 
              ref={illustrationRef}
              className="flex-1 flex justify-center items-center max-w-lg ml-8 hidden lg:block relative z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 blur-2xl transform scale-110"></div>
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute top-1/4 right-10 w-4 h-32 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-4 bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </main>

      {/* Enhanced Community Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Connect with writers and readers who share your passion for great storytelling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">1,000+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Amazing Stories</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Talented Writers</div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">10k+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Active Readers</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
