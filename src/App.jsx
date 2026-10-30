import { useEffect, useState } from "react";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Projects from "./components/Projects/Projects";
import AdditionalSections from "./components/AdditionalSections/AdditionalSections";
import Chatbot from "./components/Chatbot/Chatbot";
import "./App.css";
import "./theme.css";

export default function App() {
  const [activeInfoDialog, setActiveInfoDialog] = useState(null);
  const [theme, setTheme] = useState(() => (
    window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark"
  ));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div id="portfolio-root" data-theme={theme}>
    <Nav theme={theme} onThemeChange={setTheme}/>
    <Home/>
    <About/>
    <AdditionalSections/>
    <Projects/>
    <Contact/>
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} <span>Aditya Pathak</span>. All rights reserved.
      </p>
      <nav className="site-footer-links" aria-label="Footer links">
        <button type="button" onClick={() => setActiveInfoDialog("faq")}>FAQ</button>
        <button type="button" onClick={() => setActiveInfoDialog("terms")}>Terms &amp; Services</button>
        <a href="#contact">Contact</a>
      </nav>
    </footer>
    {activeInfoDialog && (
      <div className="info-dialog-backdrop" onClick={() => setActiveInfoDialog(null)}>
        <section
          className="info-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-dialog-heading"
          onClick={event => event.stopPropagation()}
        >
          <button className="info-dialog-close" type="button" aria-label="Close dialog" onClick={() => setActiveInfoDialog(null)}>×</button>
          {activeInfoDialog === "faq" ? (
            <>
              <p className="info-dialog-eyebrow">A FEW QUICK ANSWERS</p>
              <h2 id="info-dialog-heading">Frequently Asked Questions</h2>
              <div className="info-dialog-faqs">
                <details>
                  <summary>What kind of projects do you work on?</summary>
                  <p>I build responsive websites and full-stack web experiences, and enjoy working on data-focused projects too.</p>
                </details>
                <details>
                  <summary>Are you open to opportunities?</summary>
                  <p>Yes. Use the contact form, phone shortcut, or email link to get in touch about an opportunity.</p>
                </details>
                <details>
                  <summary>How can I ask about a project or collaboration?</summary>
                  <p>Send a short message through the contact form with a few details. I’ll follow up using the email address you provide.</p>
                </details>
              </div>
            </>
          ) : (
            <>
              <p className="info-dialog-eyebrow">PLEASE NOTE</p>
              <h2 id="info-dialog-heading">Terms &amp; Services</h2>
              <p>This portfolio is provided to present personal projects, skills, and professional information. Project details are shared for demonstration and may change over time.</p>
              <p>Project links may lead to third-party websites, which have their own terms and privacy practices. Please contact me before reusing portfolio content or requesting project work.</p>
              <p>For service or collaboration enquiries, use the contact form or email above. Any project scope, timeline, and terms will be discussed and agreed separately.</p>
            </>
          )}
        </section>
      </div>
    )}
    <Chatbot/>
    </div>
  )
}