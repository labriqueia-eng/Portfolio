import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "La Brique",
    category: "SaaS · Healthtech",
    tools: "Bubble, N8N, Make, AI",
    image: "/images/labrique.png",
    description:
      "Medical knowledge management SaaS for complex devices — 0% hallucination. Deployed in 2 months at a national distributor, 100+ users. Turned support into a sales driver.",
  },
  {
    num: "02",
    name: "Ancrage",
    category: "AI · Elderly Care · Hackathon",
    tools: "Next.js, FastAPI, Whisper, ElevenLabs, Gemini",
    image: "/images/ancrage.png",
    description:
      "Voice-first companion for seniors at home. Caregivers schedule reminders; the AI calls, listens for confirmation, retries and escalates via WhatsApp. Built at HackEurope.",
  },
  {
    num: "03",
    name: "Inovac — Audio City Guide",
    category: "AI · Geolocation · Hackathon",
    tools: "Lovable, OpenAI, Geolocation API",
    image: "/images/walkin.png",
    description:
      "AI-powered audio guide that detects monuments around you in real time and narrates their story — like a museum guide for the whole of Paris. Built in 48h.",
  },
  {
    num: "04",
    name: "4L Trophy",
    category: "Humanitarian · Project Management",
    tools: "Fundraising, Budget management, Team leadership, Content creation",
    image: "/images/4ltrophy.png",
    description:
      "Student humanitarian raid across Morocco. Led sponsorship outreach, raised €12,000, managed team logistics and content creation.",
  },
  {
    num: "05",
    name: "Eloquence Contest",
    category: "Public Speaking · Award",
    tools: "Rhetoric, Storytelling, Persuasion",
    image: "/images/eloquence.png",
    description:
      "Winner of a competitive eloquence contest. Strong public speaking and persuasion skills — now a key asset when pitching to investors and clients.",
  },
];

const Work = () => {
  useGSAP(() => {
    const triggerEl = document.querySelector(".work-section");
    const scrollerEl = document.querySelector("#smooth-wrapper");
    if (!triggerEl || !scrollerEl) return;

    let translateX = 0;
    let timeline: gsap.core.Timeline | null = null;

    function buildTrigger() {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return;
      const container = document.querySelector(".work-container");
      if (!container) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = Math.max(
        0,
        rect.width * box.length - (rectLeft + parentWidth) + padding
      );

      ScrollTrigger.getById("work")?.kill();

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
          scroller: "#smooth-wrapper",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    }

    // Run after layout is ready so work-box dimensions are correct
    let rafId = requestAnimationFrame(() => {
      buildTrigger();
      // Refresh after layout/images settle so pin range is correct
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });

    return () => {
      cancelAnimationFrame(rafId);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.description && (
                  <p className="work-description">{project.description}</p>
                )}
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
