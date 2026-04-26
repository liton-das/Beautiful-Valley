import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

// Scroll reveal component
const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Page loader
const PageLoader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0b0f19] flex items-center justify-center z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-cyan-400 mt-4 tracking-widest">Loading Portfolio</p>
      </motion.div>
    </motion.div>
  );
};

// Mobile navbar
const MobileNavbar = ({ open, setOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="fixed top-0 right-0 w-3/4 h-full bg-[#0f172a] z-50 p-6 flex flex-col gap-6"
        >
          <button onClick={() => setOpen(false)} className="self-end text-2xl">
            <FiX />
          </button>
          <a href="#">Home</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  // demo projects
  const projects = [
    {
      title: "Room Rent System",
      desc: "Airbnb style booking platform",
      img: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      tech: ["React", "Node", "MongoDB"],
    },
    {
      title: "YouTube Clone",
      desc: "Video streaming UI with playlists",
      img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
      tech: ["React", "API", "Tailwind"],
    },
    {
      title: "Blog CMS",
      desc: "Full stack blog management system",
      img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      tech: ["MERN", "JWT", "Redux"],
    },
  ];

  const skills = ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind", "Framer Motion"];

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <PageLoader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0b0f19] text-white min-h-screen overflow-x-hidden"
        >
          {/* scroll bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50"
          />

          {/* navbar */}
          <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-20 py-4 bg-[#0b0f19]/70 backdrop-blur z-40">
            <h1 className="text-cyan-400 font-bold text-xl">Raj.dev</h1>

            <div className="hidden md:flex gap-6">
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <FiMenu size={24} />
            </button>
          </div>

          <MobileNavbar open={menuOpen} setOpen={setMenuOpen} />

          {/* HERO */}
          <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-28 gap-10">
            <ScrollReveal>
              <motion.div style={{ y: heroY }}>
                <h1 className="text-4xl md:text-6xl font-bold">
                  Hi, I’m <span className="text-cyan-400">Raj</span>
                </h1>
                <p className="text-gray-400 mt-4">
                  Full Stack Developer building modern web apps
                </p>
              </motion.div>
            </ScrollReveal>

            <motion.img
              style={{ y: heroY }}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-2xl border-4 border-cyan-500"
            />
          </section>

          {/* PROJECTS */}
          <section id="projects" className="px-6 md:px-20 py-20">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-10">Demo Projects</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <ScrollReveal key={i}>
                  <div className="bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500 transition">
                    <img src={p.img} className="h-48 w-full object-cover" />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      <p className="text-gray-400 text-sm mt-2">{p.desc}</p>

                      <div className="flex gap-2 mt-3 flex-wrap">
                        {p.tech.map((t, i) => (
                          <span key={i} className="text-xs bg-cyan-900 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="px-6 md:px-20 py-16">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-6">Skills</h2>
            </ScrollReveal>

            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <ScrollReveal key={i}>
                  <span className="px-4 py-2 bg-gray-800 rounded-xl border border-gray-700">
                    {s}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="px-6 md:px-20 py-16 text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold">Let’s Work Together</h2>
              <button className="mt-6 px-6 py-3 bg-cyan-500 rounded-xl">
                Send Message
              </button>
            </ScrollReveal>
          </section>

          {/* FOOTER */}
          <ScrollReveal>
            <footer className="border-t border-gray-800 py-10 text-center">
              <p className="text-gray-400">Built with React & Motion</p>
              <p className="text-gray-600 text-sm mt-2">
                © {new Date().getFullYear()} Raj. All rights reserved.
              </p>
            </footer>
          </ScrollReveal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}