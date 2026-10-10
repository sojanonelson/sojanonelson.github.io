"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { Bot } from "lucide-react";
import About from "./About";
import Project from "./Project";
import Home from "./Home";
import Contact from "./Contact";
import CareerRouteMap from "./CareerMap";

const PortfolioView = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [viewCount, setViewCount] = useState(0);

  // Increment and fetch view count on mount
  useEffect(() => {
    const incrementAndFetchCount = async () => {
      try {
        await axios.post("https://myportfolio-8gej.onrender.com/increment");
        const response = await axios.get(
          "https://myportfolio-8gej.onrender.com/count"
        );
        setViewCount(response.data.count);
      } catch (error) {
        console.error("Error fetching or incrementing view count:", error);
      }
    };

    incrementAndFetchCount();
  }, []);

  useEffect(() => {
    // Extract section ID from path (e.g. "/about/" -> "about")
    const sectionId = pathname.replace(/^\/|\/$/g, "");
    if (sectionId) {
      // Small timeout to ensure the DOM is fully hydrated/rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="App bg-[#0a0a0a] text-white">
      <Navbar router={router} />
      <Home viewCount={viewCount} />
      <About />
      <Project />
      <Contact />
      <CareerRouteMap />
      <AIAssistantIcon />
    </div>
  );
};

const Navbar = ({ router }) => (
  <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-sm py-2.5 md:py-3 z-50 select-none border-b border-green-500/20">
    <div className="container mx-auto px-3 sm:px-4 flex justify-center items-center">
      <ul className="flex items-center justify-center space-x-3.5 sm:space-x-6 md:space-x-8 text-xs sm:text-sm md:text-base font-medium">
        <NavItem router={router} to="home" label="Home" />
        <NavItem router={router} to="about" label="About" />
        <NavItem router={router} to="projects" label="Projects" />
        <NavItem router={router} to="contact" label="Contact" />
        <NavItem router={router} to="career" label="Career" />
      </ul>
    </div>
  </nav>
);

const NavItem = ({ router, to, label }) => (
  <li>
    <button
      onClick={() => router.push(`/${to === "home" ? "" : to}`)}
      className="relative py-1 md:py-3 text-white hover:text-green-400 transition-colors duration-300 group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
    </button>
  </li>
);

const AIAssistantIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-16 right-0 bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            <div className="text-sm font-medium">
              Option is unavailable right now
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#30363d]"></div>
          </div>
        )}

        {/* AI Icon with bouncing animation */}
        <div className="bg-gradient-to-r from-[#00ff41] to-[#00cc33] p-4 rounded-full shadow-lg shadow-[#00ff41]/30 cursor-pointer hover:shadow-[#00ff41]/50 transition-all duration-300 animate-bounce-slow">
          <Bot className="w-6 h-6 text-black" />
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PortfolioView;
