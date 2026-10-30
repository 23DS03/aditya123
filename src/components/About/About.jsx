import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Card from "../Card/Card";
import MERN from "../../assets/MERN.jpg";
import C from "../../assets/C.png";
import data from "../../assets/data.jpg";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    title: "Full-Stack Development",
    image: MERN,
    description: "Responsive web experiences, from polished interfaces to server-side features.",
    detail:
      "I build web projects with JavaScript and the MERN stack: MongoDB, Express.js, React, and Node.js. I care about clear interfaces, maintainable code, and how each part works together.",
    ariaLabel: "Explore full-stack development skills",
  },
  {
    title: "Data Structures & Algorithms",
    image: C,
    description: "A thoughtful approach to problem-solving, algorithms, and core programming.",
    detail:
      "I practice data structures and algorithms to strengthen my problem-solving skills, with experience using C++, Java, and Python.",
    ariaLabel: "Explore data structures and algorithms skills",
  },
  {
    title: "Data Science & Automation",
    image: data,
    description: "Data science and automation combine to turn raw, messy data into fast, reliable insights. ",
    detail:
      "My Data Science studies and data-analysis interests help me approach information methodically. I work with Python and SQL as part of my broader software and analytics skill set.",
    ariaLabel: "Explore data science skills",
  },
];

function About() {
  const [activeExpertise, setActiveExpertise] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!activeExpertise) return undefined;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveExpertise(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeExpertise]);

  useGSAP(() => {
    const responsiveAnimations = gsap.matchMedia();
    const animationTargets = [".about-intro", ".about-highlights", ".rightabout"];

    animationTargets.forEach((target) => {
      gsap.from(target, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: target,
          scroll: "body",
          scrub: 1,
          start: "top 82%",
          end: "top 52%",
        },
      });
    });

    return () => responsiveAnimations.revert();
  });

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="about-intro">
        <p className="about-eyebrow">ABOUT ME</p>
        <h1 id="about-title">
          Building useful digital experiences with <span>code and data.</span>
        </h1>
        <p className="about-lead">
          I am Aditya Pathak,  Computer Science & Engineering
          specializing in Data Science.
        </p>
        <p className="about-copy">
          I enjoy turning ideas into thoughtful web experiences and breaking
          challenging problems into clear, practical solutions. My interests
          span full-stack development, problem-solving, and data.
        </p>

        <div className="about-highlights" aria-label="Education highlights">
          <div className="about-highlight">
            <span className="about-highlight-value">B.Tech</span>
            <span className="about-highlight-label">CSE · Data Science</span>
          </div>
          <div className="about-highlight">
            <span className="about-highlight-value">2023–2027</span>
            <span className="about-highlight-label">Student batch</span>
          </div>
          <div className="about-highlight">
            <span className="about-highlight-value">8.01</span>
            <span className="about-highlight-label">Listed CGPA</span>
          </div>
        </div>
      </div>

      <div className="rightabout" aria-label="Areas of expertise">
        {expertise.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            image={item.image}
            description={item.description}
            ariaLabel={item.ariaLabel}
            className="about-skill-card"
            onClick={() => setActiveExpertise(item)}
          />
        ))}
      </div>

      {activeExpertise &&
        createPortal(
          <div
            className="about-dialog-backdrop"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveExpertise(null);
            }}
          >
            <section
              className="about-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-dialog-title"
            >
              <button
                ref={closeButtonRef}
                className="about-dialog-close"
                type="button"
                onClick={() => setActiveExpertise(null)}
              >
                Close
              </button>
              <img src={activeExpertise.image} alt="" />
              <p className="about-eyebrow">AREA OF INTEREST</p>
              <h2 id="about-dialog-title">{activeExpertise.title}</h2>
              <p>{activeExpertise.detail}</p>
            </section>
          </div>,
          document.body,
        )}
    </section>
  );
}

export default About;
