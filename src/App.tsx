import "./App.css";
import {
  PortfolioPage,
  PortfolioPageProps,
} from "@/components/ui/starfall-portfolio-landing";

const BEHANCE_URL = "https://www.behance.net/preethapriyath1";

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
    onClick: () => window.open("/resume.pdf", "_blank"),
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
      title: "PlayMate — Sports Meetup App",
      description:
        "A mobile app designed to help users join or create local sports events. Features include match creation, player joining, live activity tracking, and a clean user-first experience.",
      fullDescription:
        "PlayMate is a comprehensive sports meetup app that connects athletes and enthusiasts. Users can create or join local sports events, track live activities, and enjoy a seamless user-first experience. The app features intuitive match creation, player management, real-time notifications, and social integration for building sports communities.",
      tags: ["Mobile App", "UI/UX", "Figma"],
      images: ["/assets/011.png"],
      behanceUrl: BEHANCE_URL,
      imageContent: (
        <img
          src="/assets/011.png"
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
      fullDescription:
        "Wavacation is a live production website for hotel and resort bookings. It offers comprehensive booking flows, real-time room availability, stunning property showcases, and accessibility-focused design. The platform includes user reviews, photo galleries, booking management, and integration with payment systems for a complete booking experience.",
      tags: ["Web UI", "Booking System", "WordPress"],
      images: ["/assets/02.png"],
      behanceUrl: "https://wavacation.com/",
      imageContent: (
        <img
          src="/assets/02.png"
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
      fullDescription:
        "A comprehensive building and apartment management app designed for modern residential complexes. Features include secure multi-role login (security, residents, admin), visitor management system, parcel tracking, event notifications, maintenance requests, and detailed admin dashboards with analytics and reporting capabilities.",
      tags: ["Dashboard", "Mobile App", "System UI"],
      images: ["/assets/03.png"],
      behanceUrl: BEHANCE_URL,
      imageContent: (
        <img
          src="/assets/03.png"
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
      fullDescription:
        "A modern e-commerce app for tyre services featuring booking experiences, exchange offers, seasonal promotions, and comprehensive product catalogs. Includes real-time tracking, vendor workflow management, service history, and integrated payment systems. The app provides a seamless experience for tyre purchases, services, and maintenance scheduling.",
      tags: ["E-Commerce", "Mobile UI", "UX Flow"],
      images: ["/assets/04.png"],
      behanceUrl: BEHANCE_URL,
      imageContent: (
        <img
          src="/assets/04.png"
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
