import React, { useEffect, useRef, useState } from 'react'
import "./Projects.css"
import Card from '../Card/Card'
import jarvis from '../../assets/jarvis.png'
import food from '../../assets/food.png'
import movieGuide from '../../assets/movie guide app.png'
import mern from '../../assets/MERN.jpg'
import analytics from '../../assets/data.jpg'
import {useGSAP} from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import eCommerce from '../../assets/e-commerce.png';
gsap.registerPlugin(ScrollTrigger)

function getProjectHref(link) {
  if (!link?.trim()) return undefined

  try {
    const projectUrl = new URL(link, window.location.origin)
    return ['http:', 'https:'].includes(projectUrl.protocol) ? projectUrl.href : undefined
  } catch {
    return undefined
  }
}


function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const [backgroundVideoActive, setBackgroundVideoActive] = useState(false)
  const projectsSectionRef = useRef(null)
  const backgroundVideoRef = useRef(null)
  const projects = [
    {
      title: 'E-Commerce',
      image: eCommerce,
      link: 'https://e-commerce4567.netlify.app/',
      description: 'An online shopping experience built around browsing products and exploring a digital storefront.',
      implementation: 'Explore the E-Commerce portfolio project and its online shopping experience.',
    },
    {
      title: 'AI Assistant',
      image: jarvis,
      link: '',
      description: 'A conversational interface for sending prompts and receiving AI-generated responses.',
      implementation: 'A conversational assistant interface for sending prompts and reading AI-generated responses.',
    },
    {
      title: 'FOOD RECIPE APP',
      image: food,
      link: '',
      description: 'Discover meal ideas, browse ingredients, and find preparation steps.',
      implementation: 'A recipe browser for discovering meals and reviewing ingredients and preparation steps.',
    },
    {
      title: 'MOVIE GUIDE APP',
      image: movieGuide,
      link: 'http://127.0.0.1:5500/style.html',
      description: 'A movie discovery interface for searching titles and exploring film details.',
      implementation: 'A movie guide experience for finding titles and viewing information such as ratings, genres, release dates, and plot summaries.',
    },
    {
      title: 'MERN Web App',
      image: mern,
      link: '',
      description: 'A full-stack web development showcase built around the MERN ecosystem.',
      implementation: 'A showcase of full-stack web development skills with MongoDB, Express.js, React, and Node.js.',
    },
    {
      title: 'Data Analytics Dashboard',
      image: analytics,
      link: '',
      description: 'A data-focused showcase for exploring analysis and communicating insights.',
      implementation: 'A showcase of data analytics interests and skills, including working with Python and SQL to explore information and communicate insights.',
    },
  ]

  useEffect(() => {
    const section = projectsSectionRef.current
    const video = backgroundVideoRef.current

    if (!section || !video) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setBackgroundVideoActive(entry.isIntersecting)

      if (entry.isIntersecting) {
        video.play().catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('Unable to play the Projects background video.', error)
          }
        })
      } else {
        video.pause()
      }
    }, { threshold: 0.1 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useGSAP(()=>{
   gsap.from("#pro",{
    y:100,
    duration:1,
    opacity:0,
    stagger:1,
    scrollTrigger:{
      trigger: "#pro",
      scroll: "body",
      scrub:2,
      start: "top 80%",
      end: "top 30%",
    }
   })

   gsap.from(".slider",{
    y:-100,
    duration:1,
    opacity:0,
    stagger:1,
    scrollTrigger:{
      trigger: ".slider",
      scroll: "body",
      scrub:2,
      start: "top 80%",
      end: "top 30%",
    }
   })
 }) 
  return (
    <div
      id="projects"
      ref={projectsSectionRef}
      data-video-background="true"
      data-video-active={backgroundVideoActive}
    >
       <video
         ref={backgroundVideoRef}
         className="projects-background-video"
         src="/projects-backgroun.webm"
         muted
         loop
         playsInline
         aria-hidden="true"
       />
       <h1 id ="pro">Project Library</h1>
       <div className="slider">
            {projects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                image={project.image}
                description={project.description}
                href={getProjectHref(project.link)}
                onClick={() => setActiveProject(project)}
                className="project-card"
              />
            ))}
        </div>
        {activeProject && (
          <div
            className="project-details-backdrop"
            role="presentation"
            onClick={() => setActiveProject(null)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setActiveProject(null)
            }}
          >
            <section
              className="project-details"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-details-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="project-details-close"
                type="button"
                onClick={() => setActiveProject(null)}
                autoFocus
              >
                Close
              </button>
              <h2 id="project-details-title">{activeProject.title}</h2>
              <h3>Implementation</h3>
              <p>{activeProject.implementation}</p>
            </section>
          </div>
        )}
    </div>
  )
}

export default Projects
