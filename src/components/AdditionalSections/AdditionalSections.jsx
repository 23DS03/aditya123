import "./AdditionalSections.css";

const skillGroups = [
  {
    title: "Full-stack development",
    items: ["MongoDB", "Express.js", "React", "Node.js"],
    description: "Building responsive web interfaces and the server-side features behind them.",
  },
  {
    title: "Programming",
    items: ["JavaScript", "Java", "Python", "C++"],
    description: "Applying programming fundamentals and problem-solving across different projects.",
  },
  {
    title: "Data and analytics",
    items: ["Python", "Postgres SQl", "Data structures", "Data analysis"],
    description: "Exploring data, looking for useful patterns, and communicating clear insights.",
  },
];

const experienceItems = [
  {
    title: "Full-stack web projects",
    period: "Hands-on project work",
    description:
      "Built and explored web applications across e-commerce, conversational interfaces, and the MERN stack.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Data-focused projects",
    period: "Ongoing learning",
    description:
      "Developing practical data-analysis skills and applying a data-driven perspective to software projects.",
    tags: ["Python", "SQL", "Analytics"],
  },
];

const educationItems = [
  {
    title: "B.Tech in Computer Science and Engineering",
    focus: "Specialization in Data Science",
    detail: "Building a foundation in software development, computing, and data-focused problem-solving.",
    period: "2023–2027",
  },
  {
    title: "Continuous learning",
    focus: "Practical skills and personal projects",
    detail:
      "Strengthening development and problem-solving skills through hands-on practice and project work.",
    period: "Ongoing",
  },
];

function AdditionalSections() {
  return (
    <>
      <section className="portfolio-section" id="skills" aria-labelledby="skills-title">
        <div className="portfolio-section-heading">
          <p className="portfolio-eyebrow">WHAT I WORK WITH</p>
          <h2 id="skills-title">Skills &amp; tools</h2>
          <p>
            A growing toolkit for building web experiences, solving problems, and working with data.
          </p>
        </div>
        <div className="portfolio-card-grid">
          {skillGroups.map((group) => (
            <article className="portfolio-info-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="portfolio-tags" aria-label={`${group.title} skills`}>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="experience" aria-labelledby="experience-title">
        <div className="portfolio-section-heading">
          <p className="portfolio-eyebrow">WHAT I HAVE BEEN BUILDING</p>
          <h2 id="experience-title">Experience</h2>
          <p>Hands-on work and learning across software development and data analytics.</p>
        </div>
        <div className="portfolio-timeline">
          {experienceItems.map((item) => (
            <article className="portfolio-info-card portfolio-timeline-card" key={item.title}>
              <div className="portfolio-card-heading">
                <h3>{item.title}</h3>
                <span>{item.period}</span>
              </div>
              <p>{item.description}</p>
              <ul className="portfolio-tags" aria-label={`${item.title} technologies`}>
                {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="education" aria-labelledby="education-title">
        <div className="portfolio-section-heading">
          <p className="portfolio-eyebrow">MY LEARNING JOURNEY</p>
          <h2 id="education-title">Education</h2>
          <p>Academic foundations paired with practical, continuous learning.</p>
        </div>
        <div className="portfolio-timeline">
          {educationItems.map((item) => (
            <article className="portfolio-info-card portfolio-timeline-card" key={item.title}>
              <div className="portfolio-card-heading">
                <h3>{item.title}</h3>
                <span>{item.period}</span>
              </div>
              <p className="portfolio-card-focus">{item.focus}</p>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default AdditionalSections;
