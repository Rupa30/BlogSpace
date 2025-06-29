import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, FileUser } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutTheCreator = () => {
  const fullName = 'Rupa Mahindrakar';
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setTypedName(fullName.slice(0, current + 1));
      current++;
      if (current === fullName.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-10 sm:px-4 py-20 transition-colors">
      <div className="container w-full text-center space-y-10">
        {/* Heading Section */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">🙋‍♀️ Meet the Creator</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
            <span className="border-b-2 border-blue-600 dark:border-blue-400 pb-1">
              {typedName}
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic">
          "Front-end developer from Pune with 3 years at TCS, including 2+ years building clean, responsive, and user-focused web apps using React and modern UI libraries."
          </p>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">👩‍💻 My Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">
              I started with HTML, CSS, and JavaScript, gradually mastering React, Redux, and UI libraries. I've created projects like CineBinge (movie finder), ShoesHub (e-commerce), UI Component Library (a collection of Machine Coding problems solved), and BlogSpace to showcase end-to-end front-end development.
            </p>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">🪄 Why I Built BlogSpace</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Most blogging platforms are bloated. BlogSpace is my effort to create a fast, minimal platform for writing and reading. It's also a playground for building real-world features like CRUD, authentication, state handling, and responsive design.
            </p>
          </div>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">📬 Connect With Me</h2>
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            <a href="https://github.com/Rupa30" target="_blank" rel="noreferrer">
              <Button variant="outline" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github className="mr-2" /> GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rupa-mahindrakar1" target="_blank" rel="noreferrer">
              <Button variant="outline" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="mr-2" /> LinkedIn
              </Button>
            </a>
            <a href="https://personal-portfolio-rupa30s-projects.vercel.app/" target="_blank" rel="noreferrer">
              <Button variant="outline" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <FileUser className="mr-2" /> Portfolio
              </Button>
            </a>
          </div>
        </div>

        {/* Footer CTA */}
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm my-4 ">
            Thanks for stopping by! I hope you enjoy exploring BlogSpace.✨
          </p>
          <Link to="/">
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutTheCreator;
