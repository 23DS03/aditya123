import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import "./Home.css"
import adityaAi from "../../assets/adityaAi.jpeg"
import { TypeAnimation } from "react-type-animation";
import {useGSAP} from "@gsap/react"
import gsap from "gsap";



function Home() {
const [isHireDialogOpen, setIsHireDialogOpen] = useState(false)
const hireButtonRef = useRef(null)
const closeButtonRef = useRef(null)

useEffect(() => {
  if (!isHireDialogOpen) return

  closeButtonRef.current?.focus()
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsHireDialogOpen(false)
      hireButtonRef.current?.focus()
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [isHireDialogOpen])

useGSAP(()=>{
  let tl1 = gsap.timeline()
      tl1.from(".line1",{
        y:80,
        duration:1,
        opacity:0
      })

      tl1.from(".line2",{
        y:80,
        duration:1,
        opacity:0
      })

      tl1.from(".line3",{
        y:80,
        duration:1,
        opacity:0
      })

      tl1.from(".righthome img",{
        x:100,
        duration:2,
        opacity:0
      })  
})

  return (
    
      <div id="home">
        <div className="lefthome">
          <div className="homedetails">
            <div className="line1">Hey, I AM</div>
            <div className="line2">ADITYA PATHAK</div>
            <div className="line3">
             <TypeAnimation

              sequence={[
                 "WEBSITE DEVELOPER",
                  2000,
                 "SOFTWARE ENGINEER WITH GEN AI",
                  2000,
                 "DATA SCIENCE & AUTOMATION",
                  2000,
               ]}
               wrapper="span"
               speed={50}
               repeat={Infinity}
               cursor='|'
               
              />
            </div>
            <button
              ref={hireButtonRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setIsHireDialogOpen(true)}
            >
              Hire Me
            </button>

          </div>

        </div>

        <div className="righthome">
          <div className="profile-showcase">
            <div className="profile-portrait">
              <img src={adityaAi} alt="Portrait of Aditya Pathak" />
            </div>
            <div className="profile-caption">
              <h2>Aditya Pathak</h2>
              <p>Software Engineer</p>
              <p className="profile-summary">
                Computer Science building full-stack web experiences with a data-driven mindset.
              </p>
              <span className="availability-label">
                <span className="availability-dot" aria-hidden="true"></span>
                Open to opportunities
              </span>
            </div>
          </div>
        </div>

        {isHireDialogOpen && createPortal(
          <div
            className="hire-dialog-backdrop"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsHireDialogOpen(false)
                hireButtonRef.current?.focus()
              }
            }}
          >
            <section
              className="hire-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hire-dialog-title"
            >
              <button
                ref={closeButtonRef}
                className="hire-dialog-close"
                type="button"
                onClick={() => {
                  setIsHireDialogOpen(false)
                  hireButtonRef.current?.focus()
                }}
              >
                Close
              </button>
              <p className="hire-dialog-eyebrow">SOFTWARE ENGINEER</p>
              <h2 id="hire-dialog-title">A little about me</h2>
              <ol>
                <li>I am a Computer Science and Engineering student specializing in Data Science.</li>
                <li>I build web experiences with the MERN stack: MongoDB, Express, React, and Node.js.</li>
                <li>I work with Java, JavaScript, and Python to solve problems across different areas.</li>
                <li>I practice data structures and algorithms in Java to strengthen my problem-solving skills.</li>
                <li>I enjoy turning data into useful insights through data analytics.</li>
                <li>I bring a data-focused perspective to software design and development.</li>
                <li>I like breaking complex challenges into clear, manageable steps.</li>
                <li>I am building my skills through hands-on learning and practical projects.</li>
                <li>I value readable, maintainable code and thoughtful user experiences.</li>
                <li>I communicate in Hindi and English and am ready to contribute to a collaborative team.</li>
              </ol>
            </section>
          </div>,
          document.body
        )}

      </div>
    
  )
}

export default Home
