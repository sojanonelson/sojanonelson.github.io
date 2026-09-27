"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  PenSquare,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  UserCheck,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Tag,
  Lock,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("create"); // "create" | "manage"
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  // Auth Form State
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Blog Post Form State
  const [postForm, setPostForm] = useState({
    title: "",
    subtitle: "",
    category: "AI & RAG",
    readTime: "5 min read",
    imageUrl: "",
    tags: "",
    content: "",
  });
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState("");

  // Blogs List State
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  const API_URL = "http://localhost:5000";

  // Check saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem("blog_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved user", e);
      }
    }
  }, []);

  // Fetch blogs when "manage" tab opens
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    const cleanEmail = authForm.email.trim();
    const cleanPassword = authForm.password.trim();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: cleanEmail,
        password: cleanPassword,
      });

      if (res.data?.success) {
        const user = res.data.user;
        setCurrentUser(user);
        localStorage.setItem("blog_user", JSON.stringify(user));
        return;
      }
    } catch (err) {
      // Direct Admin Credential Verification Fallback
      if (
        cleanEmail.toLowerCase() === "sojanonelson54@gmail.com" &&
        cleanPassword === 'sO7G@#$.{*fdehHG35"'
      ) {
        const adminUser = {
          id: "user-admin",
          name: "Sojan O Nelson",
          email: "sojanonelson54@gmail.com",
          role: "Admin",
          avatar: "https://i.ibb.co/dQCwWr0/sqqure.jpg",
        };
        setCurrentUser(adminUser);
        localStorage.setItem("blog_user", JSON.stringify(adminUser));
        return;
      }

      setAuthError(
        err.response?.data?.error || "Authentication failed. Invalid email or password."
      );
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("blog_user");
  };

  const handlePublishPost = async (e) => {
    e.preventDefault();
    if (!postForm.title || !postForm.content) {
      setPublishStatus("Title and Content are required fields.");
      return;
    }

    setPublishing(true);
    setPublishStatus("");

    try {
      const payload = {
        ...postForm,
        author: currentUser?.name || "Sojan O Nelson",
        authorEmail: currentUser?.email || "sojanonelson54@gmail.com",
        authorRole: currentUser?.role || "Author",
        authorAvatar: currentUser?.avatar || "https://i.ibb.co/dQCwWr0/sqqure.jpg",
        tags: postForm.tags ? postForm.tags.split(",").map((t) => t.trim()) : ["General"],
      };

      const res = await axios.post(`${API_URL}/api/blogs`, payload);

      if (res.data?.success) {
        setPublishStatus("Blog post published successfully!");
        setPostForm({
          title: "",
          subtitle: "",
          category: "AI & RAG",
          readTime: "5 min read",
          imageUrl: "",
          tags: "",
          content: "",
        });
        fetchBlogs();
        setTimeout(() => setPublishStatus(""), 4000);
      }
    } catch (err) {
      setPublishStatus(err.response?.data?.error || "Failed to publish post.");
    } finally {
      setPublishing(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete post.");
    }
  };

  // ==========================================
  // LOGIN / REGISTER VIEW FOR UNAUTHENTICATED
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center p-4 selection:bg-green-500 selection:text-black">
        {/* Navigation Back */}
        <div className="w-full max-w-md mb-6 flex justify-between items-center">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-400 text-sm font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog Spot</span>
          </Link>
          <span className="text-xs font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-3 py-1 rounded-full">
            Admin & Author Portal
          </span>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-white">
              Blog Spot Author Portal
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Log in to publish and manage technical articles on Blog Spot.
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  placeholder="sojanonelson54@gmail.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm pl-9 pr-4 py-2.5 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer shadow-lg shadow-green-500/20"
            >
              Sign In to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN ADMIN DASHBOARD VIEW
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-green-500 selection:text-black">
      {/* Admin Top Header Bar */}
      <header className="bg-[#111111] border-b border-gray-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 font-mono text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Blog Spot</span>
            </Link>
            <span className="text-gray-700">|</span>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <h1 className="font-serif text-lg font-bold text-white">
                Admin Control Dashboard
              </h1>
            </div>
          </div>

          {/* User Status & Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-900 border border-gray-800 px-3.5 py-1.5 rounded-full">
              <img
                src={currentUser.avatar || "https://i.ibb.co/dQCwWr0/sqqure.jpg"}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-green-500/50"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </p>
                <span className="text-[10px] font-mono text-green-400">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-red-400 font-mono transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Navigation Tabs */}
        <div className="flex space-x-3 mb-8 border-b border-gray-800 pb-4">
          <button
            onClick={() => setActiveTab("create")}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "create"
                ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                : "bg-[#141414] text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <PenSquare className="w-4 h-4" />
            <span>Publish New Post</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("manage");
              fetchBlogs();
            }}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === "manage"
                ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                : "bg-[#141414] text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Manage Posts ({blogs.length})</span>
          </button>
        </div>

        {/* ==========================================
            TAB 1: PUBLISH NEW POST FORM
            ========================================== */}
        {activeTab === "create" && (
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-white mb-1">
                Create & Publish Article
              </h2>
              <p className="text-gray-400 text-xs font-mono">
                Your post will immediately display live on the Blog Spot feed.
              </p>
            </div>

            {publishStatus && (
              <div
                className={`mb-6 px-4 py-3 rounded-xl text-xs font-mono border ${
                  publishStatus.includes("successfully")
                    ? "bg-green-950/80 border-green-500/40 text-green-300"
                    : "bg-red-950/80 border-red-500/40 text-red-300"
                }`}
              >
                {publishStatus}
              </div>
            )}

            <form onSubmit={handlePublishPost} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                {/* Article Title */}
                <div className="sm:col-span-8">
                  <label className="block text-xs font-mono text-gray-400 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Building Scalable Microservices with Node.js & Docker"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none font-serif text-lg font-bold"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="sm:col-span-4">
                  <label className="block text-xs font-mono text-gray-400 mb-2">
                    Category *
                  </label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none"
                  >
                    <option value="AI & RAG">AI & RAG</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>
              </div>

              {/* Subtitle / Excerpt */}
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">
                  Subtitle / Summary Excerpt
                </label>
                <input
                  type="text"
                  placeholder="A concise 1-2 sentence summary of the article..."
                  value={postForm.subtitle}
                  onChange={(e) => setPostForm({ ...postForm, subtitle: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                {/* Cover Image URL */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-mono text-gray-400 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={postForm.imageUrl}
                    onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none"
                  />
                </div>

                {/* Tags */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-mono text-gray-400 mb-2">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Node.js, Express, Docker, DevOps"
                    value={postForm.tags}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Full Content Markdown/HTML Body */}
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">
                  Full Article Body Content *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Write your article content here..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-800 focus:border-green-500 text-white text-sm px-4 py-3 rounded-xl focus:outline-none font-sans leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={publishing}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-8 py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-green-500/20"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{publishing ? "Publishing Post..." : "Publish Article Now"}</span>
              </button>
            </form>
          </div>
        )}

        {/* ==========================================
            TAB 2: MANAGE POSTS LIST
            ========================================== */}
        {activeTab === "manage" && (
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-1">
                  Manage Published Articles
                </h2>
                <p className="text-gray-400 text-xs font-mono">
                  View, inspect, or remove posts from the live feed.
                </p>
              </div>
              <button
                onClick={fetchBlogs}
                className="text-xs font-mono text-green-400 hover:underline"
              >
                Refresh Posts
              </button>
            </div>

            {loadingBlogs ? (
              <div className="py-12 text-center text-gray-400 font-mono text-sm">
                Loading published articles...
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-sans border border-dashed border-gray-800 rounded-2xl">
                No blog posts found. Click "Publish New Post" to create your first article!
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#161616] border border-gray-800 rounded-2xl p-5 gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      {b.imageUrl && (
                        <img
                          src={b.imageUrl}
                          alt={b.title}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-800 shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-mono bg-green-950/80 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">
                            {b.category}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {b.date}
                          </span>
                        </div>
                        <h3 className="font-bold text-white text-base font-serif">
                          {b.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                          Author: {b.author} ({b.authorEmail})
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePost(b.id)}
                      className="inline-flex items-center space-x-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-500/40 text-xs font-mono px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
