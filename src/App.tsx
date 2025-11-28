import "./App.css";
import {
  PortfolioPage,
  PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";

const BEHANCE_URL = "https://www.behance.net/preethapriyath";

const customPortfolioData: PortfolioPageProps = {
  logo: {
    initials: "PP",
    name: "preetham",
  },
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
  ],
  resume: {
    label: "Resume",
    onClick: () => window.open("/resume/preetham fn.pdf", "_blank"),
  },
  hero: {
    titleLine1: "UI/UX Designer &",
    titleLine2Gradient: "Product Experience Creator",
    subtitle:
      "I design modern, intuitive and user-focused digital experiences — from mobile apps and dashboards to fully responsive websites.",
  },
  ctaButtons: {
    primary: {
      label: "View My Work",
      onClick: () => (window.location.href = BEHANCE_URL),
    },
    secondary: {
      label: "Get In Touch",
      onClick: () =>
        (window.location.href = "mailto:preethampriyatharson07@gmail.com"),
    },
  },
  projects: [
    {
      title: "PlayMate — Sports Meetup App",
      description:
        "A mobile app designed to help users join or create local sports events. Features include match creation, player joining, live activity tracking, and a clean user-first experience.",
      tags: ["Mobile App", "UI/UX", "Figma"],
      imageContent: (
        <img
          src="assets/01.png"
          alt="PlayMate App"
          className="w-full h-full object-cover rounded-lg"
        />
      ),
      onClick: () => window.open(BEHANCE_URL, "_blank"),
    },
    {
      title: "Wavacation — Resort & Hotel Booking Website",
      description:
        "A live production booking platform for hotels and resorts. Includes booking flows, room availability, property showcasing, and real-world user accessibility design.",
      tags: ["Web UI", "Booking System", "WordPress"],
      imageContent: (
        <img
          src="assets/02.png"
          alt="Hotel Booking Website"
          className="w-full h-full object-cover rounded-lg"
        />
      ),
      onClick: () => window.open("https://wavacation.com/", "_blank"),
    },
    {
      title: "Building / Apartment Management App",
      description:
        "A full building management solution including security login, resident login, visitor management, parcel tracking, event notices, and admin dashboards.",
      tags: ["Dashboard", "Mobile App", "System UI"],
      imageContent: (
        <img
          src="assets/03.png"
          alt="Apartment App"
          className="w-full h-full object-cover rounded-lg"
        />
      ),
      onClick: () => window.open(BEHANCE_URL, "_blank"),
    },
    {
      title: "Tyre Service & Offers App",
      description:
        "A modern tyre service booking experience with exchange offers, seasonal promotions, product catalog, tracking and vendor workflow screens.",
      tags: ["E-Commerce", "Mobile UI", "UX Flow"],
      imageContent: (
        <img
          src="assets/04.png"
          alt="Tyre App"
          className="w-full h-full object-cover rounded-lg"
        />
      ),
      onClick: () => window.open(BEHANCE_URL, "_blank"),
    },
  ],

  stats: [
    { value: "3+", label: "Client & Personal Projects" },
    { value: "2+", label: "Live Industry Projects" },
    { value: "0+", label: "Years Experience" },
  ],

  showAnimatedBackground: true,
};

function App() {
  return <PortfolioPage {...customPortfolioData} />;
}

export default App;
