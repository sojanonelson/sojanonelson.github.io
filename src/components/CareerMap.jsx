import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Code2, 
  Globe, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Heart, 
  Brain, 
  Bot,
  Terminal,
  Cpu,
  Zap,
  ChevronRight,
  Monitor
} from "lucide-react";

const CareerRouteMap = () => {
  const milestones = [
    {
      year: "Schooling",
      title: "Introduction to Hacking",
      description: "Started learning about hacking. Created 'Code Brother' YouTube channel for ethical hacking tutorials.",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      shadowColor: "shadow-red-500/50"
    },
    {
      year: "10th Grade",
      title: "Self-Learning Era",
      description: "Explored penetration testing via TryHackMe & Hack The Box. Mastered Python fundamentals.",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-500/50"
    },
    {
      year: "11th-12th",
      title: "Web Development",
      description: "Computer Science stream. Built projects using HTML, CSS, and JavaScript with audio integration.",
      icon: Globe,
      color: "from-orange-500 to-yellow-500",
      shadowColor: "shadow-orange-500/50"
    },
    {
      year: "2022",
      title: "Started BCA Journey",
      description: "Enrolled in BCA (Cloud Computing & Cyber Security) at East West College, Bangalore. Began professional academic training.",
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-500",
      shadowColor: "shadow-purple-500/50"
    },
    {
      year: "2022 - 2024",
      title: "Full Stack Developer @ Fosoft",
      description: "Balanced academic studies with a Remote Full Stack Developer role at Fosoft Solutions, building mobile and web apps while mentoring interns.",
      icon: Briefcase,
      color: "from-emerald-500 to-lime-500",
      shadowColor: "shadow-emerald-500/50"
    },
    {
      year: "2023 - 2024",
      title: "ML Exploration",
      description: "Deep research into Machine Learning models (KNN, K-Means) using Scikit-learn and TensorFlow for academic projects.",
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      shadowColor: "shadow-violet-500/50"
    },
    {
      year: "2025",
      title: "BCA Graduation",
      description: "Successfully completed BCA in Cloud Computing and Cyber Security from East West College of Management.",
      icon: GraduationCap,
      color: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-cyan-500/50"
    },
    {
      year: "2025 - Present",
      title: "Webyfy IOT Pvt Ltd",
      description: "Technology Designer. Leading the design and implementation of innovative IOT solutions and high-performance tech stacks post-graduation.",
      icon: Zap,
      color: "from-blue-600 to-blue-400",
      shadowColor: "shadow-blue-600/50"
    },
    {
      year: "Future",
      title: "Personal AI Assistant",
      description: "Building a voice-enabled AI assistant with deep local system integration and automation.",
      icon: Bot,
      color: "from-purple-600 to-blue-600",
      shadowColor: "shadow-purple-600/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="career" className="min-h-screen bg-[#0a0a0a] py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A roadmap of my professional growth, from early exploration to professional technology design.
          </p>
        </motion.div>

        {/* Horizontal Stepped Roadmap */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connecting Arrow (Desktop Only) */}
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-6 text-gray-700/50 z-0">
                    <ChevronRight size={24} className="group-hover:text-green-400 transition-colors" />
                  </div>
                )}

                <div className="h-full bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/5 group-hover:-translate-y-2">
                  <div className={`mb-6 p-3 rounded-xl bg-gradient-to-br ${milestone.color} w-fit shadow-lg ${milestone.shadowColor}`}>
                    <Icon className="text-white w-6 h-6" />
                  </div>

                  <span className="text-sm font-mono text-green-400 mb-2 block tracking-wider uppercase">
                    {milestone.year}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {milestone.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Career Stats / Bottom Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-[#30363d] flex flex-wrap justify-center gap-10"
        >
          <div className="flex items-center gap-3">
            <Terminal className="text-green-400" size={20} />
            <span className="text-gray-300 font-mono">Secure Coding</span>
          </div>
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-400" size={20} />
            <span className="text-gray-300 font-mono">IOT Solutions</span>
          </div>
          <div className="flex items-center gap-3">
            <Monitor className="text-purple-400" size={20} />
            <span className="text-gray-300 font-mono">UI/UX Design</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerRouteMap;