import React, { useState } from 'react'
import './Nav.css'
import {Link} from 'react-scroll'
import {useGSAP} from '@gsap/react' 
import gsap from 'gsap'
function Nav({ theme, onThemeChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useGSAP(()=>{
    let t1 = gsap.timeline() 
    t1.from(".site-nav h1",{
        y:-100,
        duration:1,
        opacity:0
    })
    t1.from(".site-nav .desktopmenu li",{
        y:-100,
        duration:1,
        opacity:0,
        stagger:1
    })
  })


  return (
    <nav className="site-nav">
        <h1>ADITYA</h1>
        <ul className= 'desktopmenu'>
            <Link to="home" activeClass="active" spy={true} smooth={true} duration={100}><li>Home</li></Link>
            <Link to="about" activeClass="active" spy={true} smooth={true} duration={100}><li>About</li></Link>
            <Link to="skills" activeClass="active" spy={true} smooth={true} duration={100}><li>Skills</li></Link>
            <Link to="experience" activeClass="active" spy={true} smooth={true} duration={100}><li>Experience</li></Link>
            <Link to="education" activeClass="active" spy={true} smooth={true} duration={100}><li>Education</li></Link>
            <Link to="projects" activeClass="active" spy={true} smooth={true} duration={100}><li>Projects</li></Link>
            <Link to="contact" activeClass="active" spy={true} smooth={true} duration={100}><li>Contact</li></Link>
            
        </ul>
        <button
          className={isMobileMenuOpen ? "hamburger activemenu" : "hamburger"}
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <div className="ham"></div>
          <div className="ham"></div>
          <div className="ham"></div>
        </button>
       
        <ul
          className={isMobileMenuOpen ? "mobilemenu activemobile" : "mobilemenu"}
          id="mobile-navigation"
          aria-hidden={!isMobileMenuOpen}
        >
            <Link to="home" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Home</li></Link>
            <Link to="about" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>About</li></Link>
            <Link to="skills" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Skills</li></Link>
            <Link to="experience" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Experience</li></Link>
            <Link to="education" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Education</li></Link>
            <Link to="projects" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Projects</li></Link>
            <Link to="contact" activeClass="active" spy={true} smooth={true} duration={500} onClick={closeMobileMenu}><li>Contact</li></Link>
            <li className="mobile-theme-item">
              <button
                className="theme-toggle"
                type="button"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "light"}
                onClick={() => {
                  onThemeChange(theme === "dark" ? "light" : "dark")
                  closeMobileMenu()
                }}
              >
                <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
                <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
              </button>
            </li>
        </ul>
    </nav>
  )
}

export default Nav
