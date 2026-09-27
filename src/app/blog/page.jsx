"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Search,
  Bookmark,
  Heart,
  Share2,
  Sparkles,
  TrendingUp,
  Mail,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

export default function BlogPage() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [articles, setArticles] = useState([]);
  const [bookmarked, setBookmarked] = useState({});

  const topics = [
    "All",
    "AI & RAG",
    "Web Engineering",
    "DevOps & Cloud",
    "Architecture",
  ];

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchLiveArticles();
  }, []);

  const fetchLiveArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      if (Array.isArray(res.data)) {
        setArticles(res.data);
      }
    } catch (err) {
      console.log("Error or backend offline:", err.message);
    }
  };

  const handleBackToPortfolio = (e) => {
    e?.preventDefault();
    router.push("/");
  };

  const handleClap = async (id) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id ? { ...art, claps: (art.claps || 0) + 1 } : art
      )
    );

    try {
      await axios.post(`${API_URL}/api/blogs/${id}/clap`);
    } catch (e) {
      // Local optimistic update stays active
    }
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const filteredArticles = articles.filter((art) => {
    const matchesTopic = selectedTopic === "All" || art.category === selectedTopic;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.subtitle && art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e6e6e6] font-sans selection:bg-green-500 selection:text-black antialiased">
      {/* Top Editorial Navbar */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left Brand Title */}
            <div className="flex items-center space-x-6">
              <button
                onClick={handleBackToPortfolio}
                className="flex items-center space-x-2 text-gray-400 hover:text-green-400 font-medium text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Portfolio</span>
              </button>

              <div className="h-4 w-px bg-gray-800"></div>

              <div className="flex items-center space-x-3">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Blog Spot
                </span>
                <span className="text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full uppercase">
                  TECHNICAL JOURNAL
                </span>
              </div>
            </div>

            {/* Middle Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-xs">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141414] border border-gray-800 focus:border-green-500/60 text-sm text-gray-200 pl-9 pr-4 py-1.5 rounded-full focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`text-xs font-medium px-5 py-2 rounded-full transition-all cursor-pointer ${
                  isFollowing
                    ? "bg-gray-800 text-gray-300 border border-gray-700"
                    : "bg-green-500 hover:bg-green-400 text-black font-bold shadow-md shadow-green-500/20"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          {/* Medium Topic Pills Navbar */}
          <div className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar border-t border-gray-900/60">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-white text-black font-bold shadow"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Medium Headline Banner */}
      <section className="border-b border-gray-800/80 bg-gradient-to-b from-[#111812] to-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 text-green-400 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BLOG SPOT • OFFICIAL PUBLICATION</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              Stay curious.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-sans">
              Discover stories, technical breakdowns, AI engineering guides, and software architecture insights from{" "}
              <span className="text-green-400 font-semibold">Sojan O Nelson</span>.
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const el = document.getElementById("article-feed");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-green-500/20 transition-all cursor-pointer"
              >
                <span>Explore Articles ({articles.length})</span>
              </button>
            </div>
          </div>

          {/* Medium Author Badge */}
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 w-full md:w-80 shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://i.ibb.co/dQCwWr0/sqqure.jpg"
                alt="Sojan O Nelson"
                className="w-14 h-14 rounded-full object-cover border-2 border-green-500/50"
              />
              <div>
                <h3 className="font-bold text-white text-base">Sojan O Nelson</h3>
                <p className="text-xs text-gray-400">Software & AI Engineer</p>
                <span className="inline-block text-[10px] font-mono text-green-400 mt-1">
                  12.4k Readers • {articles.length} Posts
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Writing on RAG AI architectures, Next.js, Node.js microservices, and cloud deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Editorial Layout */}
      <main id="article-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Main Stream (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 bg-[#111111] rounded-3xl border border-gray-800 p-8">
                <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">
                  No Articles Published Yet
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto font-sans leading-relaxed">
                  New technical stories, AI engineering guides, and software architecture breakdowns will appear here soon!
                </p>
                {(selectedTopic !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedTopic("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 text-xs font-bold text-green-400 underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            ) : (
              filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group pb-10 border-b border-gray-800/80 transition-all"
                >
                  {/* Article Author Row */}
                  <div className="flex items-center space-x-3 mb-3 text-xs text-gray-400 font-sans">
                    <img
                      src={article.authorAvatar || "https://i.ibb.co/dQCwWr0/sqqure.jpg"}
                      alt={article.author}
                      className="w-6 h-6 rounded-full object-cover border border-green-500/40"
                    />
                    <span className="font-semibold text-gray-200">{article.author}</span>
                    <span>·</span>
                    <span className="text-gray-400">{article.date}</span>
                    <span>·</span>
                    <span className="text-green-400 font-mono text-[11px]">
                      {article.readTime}
                    </span>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-1.5 py-0.5 rounded font-mono">
                      ★ Member
                    </span>
                  </div>

                  {/* Article Content Layout: Title/Snippet Left, Image Right */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                    <div className="sm:col-span-8 space-y-2">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-green-400 transition-colors leading-snug">
                        {article.title}
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-sans">
                        {article.subtitle}
                      </p>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="sm:col-span-4">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 border border-gray-800 group-hover:border-green-500/40 transition-colors">
                        <img
                          src={article.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Article Footer & Interactive Toolbar */}
                  <div className="flex items-center justify-between mt-6 pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono bg-gray-900 text-gray-300 border border-gray-800 px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      {Array.isArray(article.tags) && article.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="hidden sm:inline-block text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Clap & Bookmark */}
                    <div className="flex items-center space-x-4 text-gray-400">
                      <button
                        onClick={() => handleClap(article.id)}
                        className="flex items-center space-x-1.5 hover:text-green-400 transition-colors cursor-pointer group/clap"
                      >
                        <Heart className="w-4 h-4 group-hover/clap:scale-125 transition-transform text-pink-500 fill-pink-500/20" />
                        <span className="text-xs font-mono">{article.claps || 0}</span>
                      </button>

                      <button
                        onClick={() => toggleBookmark(article.id)}
                        className="hover:text-green-400 transition-colors cursor-pointer"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            bookmarked[article.id]
                              ? "text-green-400 fill-green-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                          }
                        }}
                        title="Copy Link"
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right Editorial Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Staff Picks / Trending Section */}
            <div className="bg-[#111111] border border-gray-800/80 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6 text-white font-bold text-sm uppercase tracking-wider font-mono">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Trending Articles</span>
              </div>

              <div className="space-y-6">
                {articles.slice(0, 3).map((item, i) => (
                  <div key={item.id || i} className="flex items-start space-x-4">
                    <span className="font-serif text-2xl font-bold text-gray-700">
                      0{i + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                        <img
                          src={item.authorAvatar || "https://i.ibb.co/dQCwWr0/sqqure.jpg"}
                          alt={item.author}
                          className="w-4 h-4 rounded-full"
                        />
                        <span>{item.author}</span>
                      </div>
                      <h4 className="font-serif font-bold text-xs text-white hover:text-green-400 transition-colors cursor-pointer leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {item.date} · {item.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tag Cloud */}
            <div className="bg-[#111111] border border-gray-800/80 rounded-2xl p-6">
              <h3 className="font-bold text-white text-sm mb-4">Recommended Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js 14",
                  "Gemini AI",
                  "RAG System",
                  "Node.js",
                  "Express",
                  "DevOps",
                  "Vercel",
                ].map((tag, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs font-mono bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 hover:border-green-500/40 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-[#111111] border border-gray-800/80 rounded-2xl p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Subscribe to Digest
              </h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Get new technical posts and AI architectural breakdowns delivered directly to your inbox.
              </p>

              {subscribed ? (
                <div className="inline-flex items-center space-x-2 text-green-400 bg-green-950/80 border border-green-500/40 px-4 py-2 rounded-xl text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 focus:border-green-500 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-md shadow-green-500/20"
                  >
                    Get Email Updates
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-gray-500 bg-[#070707]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="font-serif font-bold text-white text-sm">Blog Spot</span>
            <span>© {new Date().getFullYear()} Sojan O Nelson</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={handleBackToPortfolio} className="hover:text-green-400 underline cursor-pointer">
              Back to Portfolio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
