import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface NavLink {
  label: string;
  href: string;
}
interface Project {
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  images: string[];
  behanceUrl: string;
  imageContent?: React.ReactNode;
  onClick?: () => void;
}
interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  logo?: { initials: React.ReactNode; name: React.ReactNode };
  navLinks?: NavLink[];
  resume?: { label: string; onClick?: () => void };
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
    tertiary?: { label: string; onClick?: () => void };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.display = "block";
    currentMount.appendChild(renderer.domElement);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
                uniform float iTime; uniform vec2 iResolution;
                #define NUM_OCTAVES 3
                float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
                float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
                float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
                void main() {
                    vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
                    for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
                    o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
                }`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", handleResize);
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement))
        currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);
  return <div ref={mountRef} />;
};

const defaultData: Required<PortfolioPageProps> = {
  logo: { initials: "MT", name: "Meng To" },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],
  resume: { label: "Resume", onClick: () => {} },
  hero: {
    titleLine1: "Creative Developer &",
    titleLine2Gradient: "Digital Designer",
    subtitle:
      "I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.",
  },
  ctaButtons: {
    primary: { label: "View My Work", onClick: () => {} },
    secondary: { label: "Get In Touch", onClick: () => {} },
    tertiary: {
      label: "View Design",
      onClick: () =>
        window.open(
          "https://www.figma.com/design/U8RHx87I6RFIWD5zBNCMmi/Untitled?node-id=1-3&p=f&t=UgONNzmnhi91UgWd-0",
          "_blank"
        ),
    },
  },
  projects: [
    {
      title: "FinTech Mobile App",
      description: "React Native app with AI-powered financial insights.",
      fullDescription:
        "This innovative FinTech mobile app leverages React Native and Node.js to provide users with AI-powered financial insights. It features real-time data analysis, personalized investment recommendations, and secure transaction processing. The app includes interactive charts, budget tracking, and seamless integration with banking APIs.",
      tags: ["React Native", "Node.js"],
      images: ["/assets/01.png", "/assets/02.png"],
      behanceUrl: "https://behance.net/fintech-app",
      imageContent: undefined,
    },
    {
      title: "Data Visualization Platform",
      description: "Interactive dashboard for complex data analysis.",
      fullDescription:
        "A comprehensive data visualization platform built with D3.js and Python. This tool allows users to create interactive dashboards for complex data analysis, featuring advanced charting capabilities, real-time data streaming, and customizable visualizations. It supports multiple data sources and provides export functionality for reports.",
      tags: ["D3.js", "Python"],
      images: ["/assets/03.png", "/assets/04.png"],
      behanceUrl: "https://behance.net/data-viz-platform",
      imageContent: undefined,
    },
    {
      title: "3D Portfolio Site",
      description: "Immersive WebGL experience with 3D elements.",
      fullDescription:
        "An immersive 3D portfolio website created using Three.js and WebGL. This project showcases interactive 3D models, particle systems, and smooth animations. It features a custom shader for realistic lighting effects and optimized performance for various devices, providing an engaging user experience.",
      tags: ["Three.js", "WebGL"],
      images: ["/assets/portfolio-3d/011.png"],
      behanceUrl: "https://behance.net/3d-portfolio",
      imageContent: undefined,
    },
  ],
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "5+", label: "Years Experience" },
    { value: "15+", label: "Happy Clients" },
  ],
  showAnimatedBackground: true,
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
}) => {
  const { primary, secondary, tertiary } = ctaButtons;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };
  return (
    <div className="bg-background text-foreground geist-font">
      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative">
        <nav className="w-full px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-border backdrop-blur-md border border-border flex items-center justify-center">
                <span className="geist-font text-sm font-bold text-foreground">
                  {logo.initials}
                </span>
              </div>
              <span className="geist-font text-lg font-medium text-foreground">
                {logo.name}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors inter-font text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button px-4 py-2 rounded-lg text-foreground text-sm font-medium inter-font"
            >
              {resume.label}
            </a>
          </div>
        </nav>
        <div className="divider" />
        <main
          id="about"
          className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 float-animation">
              <h1 className="md:text-6xl lg:text-7xl leading-[1.1] geist-font text-5xl font-light text-foreground tracking-tight mb-4">
                {hero.titleLine1}
                <span className="gradient-text block tracking-tight">
                  {hero.titleLine2Gradient}
                </span>
              </h1>
              <p className="md:text-xl max-w-3xl leading-relaxed inter-font text-lg font-light text-muted-foreground mx-auto">
                {hero.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={primary.onClick}
                className="primary-button px-6 py-3 text-foreground rounded-lg font-medium text-sm min-w-[160px]"
              >
                {primary.label}
              </button>
              <button
                onClick={secondary.onClick}
                className="glass-button min-w-[160px] inter-font text-sm font-medium text-foreground rounded-lg px-6 py-3"
              >
                {secondary.label}
              </button>
              {tertiary && (
                <button
                  onClick={tertiary.onClick}
                  className="glass-button min-w-[160px] inter-font text-sm font-medium text-foreground rounded-lg px-6 py-3"
                >
                  {tertiary.label}
                </button>
              )}
            </div>
            <div className="divider mb-16" />
            <div
              id="projects"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-left cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="project-image rounded-xl h-32 mb-4 flex items-center justify-center">
                    {project.imageContent}
                  </div>
                  <h3 className="text-lg font-medium text-card-foreground mb-2 geist-font">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm inter-font mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-badge px-2 py-1 rounded text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="divider mb-16" />
            <div
              id="skills"
              className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center"
            >
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div>
                    <div className="text-3xl md:text-4xl font-light text-foreground mb-1 geist-font tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm inter-font font-normal">
                      {stat.label}
                    </div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-input to-transparent" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedProject.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {selectedProject.fullDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-badge px-3 py-1 rounded-full text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        window.open(selectedProject.behanceUrl, "_blank")
                      }
                      className="glass-button px-4 py-2 rounded-lg text-foreground text-sm font-medium flex items-center gap-2"
                    >
                      <span>
                        {selectedProject.behanceUrl.includes("behance.net")
                          ? "Behance"
                          : "View Website"}
                      </span>
                      {selectedProject.behanceUrl.includes("behance.net") && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.441 5.563-5.441 3.072 0 4.995 1.462 5.436 3.635l-1.635.295c-.343-.964-1.231-1.58-3.8-1.58-2.313 0-3.666 1.034-3.666 3.639 0 2.337 1.261 3.689 3.979 3.689 2.668 0 3.544-1.376 3.851-2.662l1.611.305zm-7.072-6.294c-1.711 0-2.949 1.029-2.949 2.748 0 1.675 1.264 2.737 2.949 2.737 1.711 0 2.949-1.029 2.949-2.748 0-1.675-1.264-2.737-2.949-2.737z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export { PortfolioPage };
