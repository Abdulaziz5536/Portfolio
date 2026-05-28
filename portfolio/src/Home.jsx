import "./styles.css";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaNewspaper,
  FaPython,
  FaReact,
  FaUser,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiExpress, SiMongodb } from "react-icons/si";
import { WiWindy } from "react-icons/wi";

const ROLES = ["Software Engineer", "Backend Developer", "React Developer"];

const CODE_SAMPLE = `function portfolio(profile) {
  const skills = ["JavaScript", "React", "Python", "C"];

  return {
    name: Abdulaziz,
    focus: "Clear, useful software",
    isLearning: true,
  };
}`;

const ABOUT_LINES = [
  "Software Engineer passionate about building efficient and user-friendly solutions through code. I enjoy solving real-world problems and continuously improving my technical skills. I love developing programs using javaScript, but i am conversant with python and C. Outside of programming, I love reading, playing football, and exploring new technologies. My goal is to grow as a developer while creating impactful and meaningful software",
];

const SKILLS = [
  { name: "JavaScript", icon: <IoLogoJavascript />, color: "#c6c3c1" },
  { name: "React", icon: <FaReact />, color: "#c6c3c1" },
  { name: "Python", icon: <FaPython />, color: "#c6c3c1" },
  { name: "Express.js", icon: <SiExpress />, color: "#c6c3c1" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#c6c3c1" },
];

export default function Home() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [codeText, setCodeText] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [apiStatus, setApiStatus] = useState("Checking API");

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const isRoleComplete = typedRole === currentRole;
    const isRoleEmpty = typedRole === "";
    const delay = isRoleComplete && !isDeleting ? 900 : isDeleting ? 55 : 110;

    const timer = setTimeout(() => {
      if (isRoleComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isRoleEmpty && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((currentIndex) => (currentIndex + 1) % ROLES.length);
        return;
      }

      const nextLength = typedRole.length + (isDeleting ? -1 : 1);
      setTypedRole(currentRole.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timer);
  }, [isDeleting, roleIndex, typedRole]);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex += 1;
      setCodeText(CODE_SAMPLE.slice(0, currentIndex));

      if (currentIndex >= CODE_SAMPLE.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function checkApiSpeed() {
      try {
        const start = performance.now();
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        await response.json();
        const end = performance.now();

        setResponseTime((end - start).toFixed(2));
        setApiStatus("API online");
      } catch (error) {
        if (error.name !== "AbortError") {
          setApiStatus("API unavailable");
        }
      }
    }

    checkApiSpeed();

    return () => controller.abort();
  }, []);

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(today);

  return (
    <main className="container">
      <nav className="navigation" aria-label="Main navigation">
        <a href="#home">
          <FaHome />
          Home
        </a>
        <a href="#about">
          <FaUser />
          About
        </a>
        <a href="/Abdulaziz_CV.docx" download>
          <FaNewspaper />
          Resume
        </a>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
         
          <h1>Abdulaziz Bedru</h1>
          <h2>
            {typedRole}
            <span className="cursor" aria-hidden="true" />
          </h2>
        </div>

        <pre className="code-card" aria-label="Animated code sample">
          <code>{codeText}</code>
        </pre>
      </section>

      <section id="about" className="content-grid">
        <article className="about-panel" style={{marginTop:90}}>
          <p className="section-kicker"></p>
          <h2>About Me</h2>
          <p className="about-summary">
            I build practical software with a focus on clean code, useful
            features, and steady growth as a developer.
          </p>
          {ABOUT_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>

        <article id="resume" className="skills-panel">
          
          <h2>Tech Stack</h2>
          <ul className="skills-list">
            {SKILLS.map((skill) => (
              <li key={skill.name}>
                <span
                  className="skill-icon"
                  style={{ "--skill-color": skill.color }}
                  aria-hidden="true"
                >
                  {skill.icon}
                </span>
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="social-section" aria-labelledby="social-heading">
        <h2 id="social-heading">You can find me on</h2>
        <div className="social-links">
          <span aria-label="LinkedIn">
            <FaLinkedin />
          </span>
          <span aria-label="GitHub">
            <FaGithub />
          </span>
          <span aria-label="Instagram">
            <FaInstagram />
          </span>
        </div>
      </section>

      <footer className="site-footer">
        <span>{formattedDate}</span>
        <span>
          <WiWindy />
          {responseTime ? `${responseTime} ms` : apiStatus}
        </span>
      </footer>
    </main>
  );
}
