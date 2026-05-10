import React, { useState } from "react";
import { motion } from "framer-motion";
import Profile from "../assets/profile.jpeg";
import { Helmet } from 'react-helmet';
import { Shield, Code, Database, Server, Terminal, GraduationCap, Award, Cpu } from "lucide-react";
import './About.css'

const About = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [isHovered, setIsHovered] = useState(false);

  const skills = {
    cybersecurity: [
      "Network Security",
      "Ethical Hacking",
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Auditing",
      "Burp Suite",
      "Nmap",
      "Metasploit"
    ],
    frontend: [
      "React.js",
      "Next.js",
      "Vite.js",
      "Tailwind CSS",
      "Bootstrap",
      "Framer Motion",
      "Figma"
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Python",
      "REST APIs",
      "Authentication",
      "JWT"
    ],
    database: [
      "MongoDB",
      "Firebase",
      "MySQL"
    ],
    tools: [
      "Visual Studio Code",
      "Git/GitHub",
      "Postman",
      "Insomnia",
      "Docker",
      "Linux"
    ]
  };

  const education = [
    {
      degree: "BCA in Cloud Computing & Ethical Hacking",
      institution: "East West College of Management, Bangalore",
      period: "2022 - 2025",
      courses: [
        "Advanced Network Security",
        "Cloud Infrastructure",
        "Web Application Security",
        "Cryptography"
      ]
    }
  ];

  const certifications = [
    {
      name: "Internship Completion Certificate",
      issuer: "Cyber Security Firm",
      date: "01/2023 - 03/2023"
    },
    {
      name: "Cyber Security Webinar Attendee",
      issuer: "Tech Conference",
      date: "02/2023"
    }
  ];

  const projects = [
    {
      name: "Kasavu Aalayam",
      description: "A premium e-commerce platform for Indian ethnic wear with worldwide shipping and secure payments.",
      tech: ["React.js", "Node.js", "MongoDB", "MERN Stack"]
    },
    {
      name: "Persona Gifts",
      description: "A specialized e-commerce store for personalized gifts based in the UK, featuring custom gift builders.",
      tech: ["React.js", "Node.js", "MongoDB", "Paypal/Stripe"]
    },
    {
      name: "ChordBeats",
      description: "Digital studio web application for creating music beats and virtual instruments.",
      tech: ["React.js", "Node.js", "Web Audio API"]
    },
    {
      name: "Vulnerability Scanner",
      description: "Automated web application security scanner for identifying common vulnerabilities.",
      tech: ["Python", "BeautifulSoup", "Nmap"]
    }
  ];

  const sectionIcons = {
    skills: <Terminal className="mr-2" size={18} />,
    education: <GraduationCap className="mr-2" size={18} />,
    certifications: <Award className="mr-2" size={18} />,
    projects: <Cpu className="mr-2" size={18} />
  };

  const skillIcons = {
    cybersecurity: <Shield size={18} className="mr-2 text-green-400" />,
    frontend: <Code size={18} className="mr-2 text-green-400" />,
    backend: <Server size={18} className="mr-2 text-green-400" />,
    database: <Database size={18} className="mr-2 text-green-400" />,
    tools: <Terminal size={18} className="mr-2 text-green-400" />
  };

  return (
    <section
      id="about"
      className="min-h-screen  bg-gradient-to-b from-[#0a0a0a] to-[#111111] py-20 px-4 sm:px-6 lg:px-8"
    >
      <Helmet>
        <title>Sojan O Nelson | Cybersecurity & Full-Stack Developer</title>
        <meta name="description" content="Cybersecurity Analyst and MERN Stack Developer with expertise in building secure web applications" />
        <meta name="keywords" content="Sojan, Cybersecurity, Ethical Hacking, MERN Developer, Web Security" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-white">
            About Me
          </span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Profile Image */}
          <motion.div 
            className="lg:w-1/3 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative group">
              <motion.img
                src={Profile}
                alt="Sojan O Nelson"
                className={`w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-green-400/30 transition-all duration-500 `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-green-400/50 transition-all duration-500"></div>
              <div className="absolute -inset-2 rounded-full bg-green-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Cybersecurity Analyst & Software Engineer
              </h2>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                I specialize in building <span className="text-green-400 font-medium">secure, scalable web applications</span> with modern technologies. 
                With dual expertise in <span className="text-green-400 font-medium">cybersecurity</span> and <span className="text-green-400 font-medium">full-stack development</span>, 
                I create solutions that are not just functional but hardened against modern threats. 
                My work spans ethical hacking, penetration testing, and developing robust applications 
                with React, Node.js, and MongoDB.
              </p>

              {/* Navigation Tabs */}
              <div className="mb-8 border-b border-gray-800">
                <div className="flex flex-wrap gap-4">
                  {Object.keys(sectionIcons).map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`relative px-4 py-3 text-sm font-medium flex items-center transition-colors ${
                        activeSection === section 
                          ? 'text-green-400' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {sectionIcons[section]}
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                      {activeSection === section && (
                        <motion.div 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"
                          layoutId="underline"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Sections */}
              <div className="bg-[#0a0a0a] rounded-xl p-6 border border-gray-800">
                {/* Skills Section */}
                {activeSection === "skills" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="bg-[#111111] p-5 rounded-lg border border-gray-800 hover:border-green-400/30 transition-colors">
                          <div className="flex items-center mb-3">
                            {skillIcons[category]}
                            <h4 className="text-lg font-semibold text-green-400 capitalize">
                              {category.replace(/([A-Z])/g, ' $1')}
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {items.map((skill, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-2 flex-shrink-0"></span>
                                <span className="text-gray-300">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Education Section */}
                {activeSection === "education" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <div key={index} className="bg-[#111111] p-5 rounded-lg border border-gray-800 hover:border-green-400/30 transition-colors">
                          <h4 className="text-xl font-semibold text-green-400">{edu.degree}</h4>
                          <p className="text-gray-300 mt-1">{edu.institution}</p>
                          <p className="text-gray-400 text-sm mt-2">{edu.period}</p>
                          
                          <div className="mt-4">
                            <h5 className="text-gray-400 font-medium">Key Courses:</h5>
                            <ul className="mt-2 space-y-1">
                              {edu.courses.map((course, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 mr-2 flex-shrink-0"></span>
                                  <span className="text-gray-300">{course}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Certifications Section */}
                {activeSection === "certifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
                    <div className="space-y-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="bg-[#111111] p-5 rounded-lg border border-gray-800 hover:border-green-400/30 transition-colors">
                          <div className="flex items-start">
                            <Award className="text-green-400 mr-3 mt-0.5 flex-shrink-0" size={18} />
                            <div>
                              <h4 className="text-lg font-semibold text-green-400">{cert.name}</h4>
                              <p className="text-gray-300">{cert.issuer}</p>
                              <p className="text-gray-400 text-sm mt-1">{cert.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Projects Section */}
                {activeSection === "projects" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Notable Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project, index) => (
                        <div key={index} className="bg-[#111111] p-5 rounded-lg border border-gray-800 hover:border-green-400/30 transition-colors">
                          <h4 className="text-lg font-semibold text-green-400">{project.name}</h4>
                          <p className="text-gray-300 mt-2">{project.description}</p>
                          
                          <div className="mt-3">
                            <h5 className="text-gray-400 text-sm font-medium">Technologies:</h5>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.tech.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p 
                      
                      className="inline-flex items-center mt-6 text-green-400 hover:text-green-300 transition-colors"
                    >
                      Scroll down to view all project
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;