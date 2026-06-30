import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Home,
  Image as ImageIcon,
  AtSign,
  MapPin,
  Menu,
  MessageSquareText,
  ParkingCircle,
  Phone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";

type Route = "/" | "/about" | "/facilities" | "/gallery" | "/transformations" | "/contact";

type NavItem = {
  label: string;
  path: Route;
};

type Fact = {
  label: string;
  value: string;
  status?: "verified" | "not-found" | "action";
};

type GalleryImage = {
  title: string;
  description: string;
  src: string;
  alt: string;
  credit: string;
};

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Facilities", path: "/facilities" },
  { label: "Gallery", path: "/gallery" },
  { label: "Transformations", path: "/transformations" },
  { label: "Contact Us", path: "/contact" },
];

const business = {
  name: "Interior Path Modular Kitchen",
  displayName: "Interior Path",
  category: "Interior design studio and modular kitchen showroom",
  address:
    "5th Floor, Vijay Vihar, Gudi Malkapur Rd, opposite Reliance Fresh, Viswash Nagar, Mehdipatnam, Hyderabad, Telangana 500028",
  landmark: "Opposite Reliance Fresh on Gudi Malkapur Road",
  neighborhood: "Viswash Nagar, Mehdipatnam",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  postalCode: "500028",
  mapQuery:
    "Interior Path Modular Kitchen, 5th Floor, Vijay Vihar, Gudi Malkapur Rd, opposite Reliance Fresh, Viswash Nagar, Mehdipatnam, Hyderabad, Telangana 500028",
};

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`;

const images = {
  hero:
    "https://images.pexels.com/photos/8082300/pexels-photo-8082300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1250&w=2200",
  kitchen:
    "https://images.pexels.com/photos/35021550/pexels-photo-35021550.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dining:
    "https://images.pexels.com/photos/7148841/pexels-photo-7148841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  wardrobe:
    "https://images.pexels.com/photos/7533928/pexels-photo-7533928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  living:
    "https://images.pexels.com/photos/6489095/pexels-photo-6489095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  island:
    "https://images.pexels.com/photos/7031211/pexels-photo-7031211.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  cabinetry:
    "https://images.pexels.com/photos/6782576/pexels-photo-6782576.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

const verifiedFacts: Fact[] = [
  { label: "Name", value: business.name, status: "verified" },
  { label: "Category", value: business.category, status: "verified" },
  { label: "Complete address", value: business.address, status: "verified" },
  { label: "Nearby landmark", value: business.landmark, status: "verified" },
  { label: "City", value: business.city, status: "verified" },
  { label: "State", value: business.state, status: "verified" },
  { label: "Country", value: business.country, status: "verified" },
  {
    label: "Owner / founder details",
    value: "Not found in accessible Google-indexed results during research.",
    status: "not-found",
  },
  {
    label: "Phone / email",
    value: "No verified public phone number or email was found in accessible results.",
    status: "not-found",
  },
  {
    label: "Business hours",
    value: "Not publicly available from accessible search results.",
    status: "not-found",
  },
  {
    label: "Google rating",
    value: "No verified rating was available from accessible search results.",
    status: "not-found",
  },
  {
    label: "Google reviews count",
    value: "No verified reviews count was available from accessible search results.",
    status: "not-found",
  },
  {
    label: "Instagram handle",
    value: "No handle was provided, and exact searches did not identify a verified brand account.",
    status: "not-found",
  },
];

const researchLog = [
  "Exact Google searches for Interior Path Modular Kitchen, Interior Path Hyderabad, and the supplied Mehdipatnam address did not return a verified public business profile in the accessible results.",
  "Instagram searches for Interior Path, interiorpath, and Interior Path Modular did not reveal a verified matching Instagram account.",
  "The supplied address and landmark are used as the verified location details, with Google Maps opened through a direct address query.",
  "No public owner details, business hours, Google rating, review count, famous associations, or verified project testimonials were found in the accessible indexed results.",
];

const facilityItems = [
  {
    icon: Home,
    title: "Studio Location",
    status: "Verified address",
    text: "The business address is listed at the 5th Floor, Vijay Vihar, opposite Reliance Fresh in Mehdipatnam.",
  },
  {
    icon: ParkingCircle,
    title: "Parking Facilities",
    status: "Public confirmation not found",
    text: "Parking availability was not found in accessible public results. Visitors should confirm parking before travelling.",
  },
  {
    icon: Sparkles,
    title: "Demo Rooms",
    status: "Public confirmation not found",
    text: "A public confirmation of demo rooms or showroom displays was not found. The registration form lets visitors request a studio tour.",
  },
  {
    icon: Compass,
    title: "Google Maps Access",
    status: "Available by address query",
    text: "The site integrates Google Maps with the complete address so visitors can open directions directly.",
  },
];

const serviceEnquiries = [
  "Modular kitchen consultation",
  "Wardrobe and storage planning",
  "Material and finish selection",
  "Site measurement request",
  "Studio visit scheduling",
  "Renovation enquiry",
];

const galleryImages: GalleryImage[] = [
  {
    title: "Warm Wood Kitchen",
    description: "A premium modular kitchen inspiration reference for finish, storage, and lighting discussions.",
    src: images.kitchen,
    alt: "Modern kitchen with wood paneling and black marble counters",
    credit: "Pexels, Ajit Singh",
  },
  {
    title: "Open Dining Flow",
    description: "An open kitchen and dining reference for layout planning in contemporary homes.",
    src: images.dining,
    alt: "Elegant modern kitchen with dining table and chairs",
    credit: "Pexels, Souranshi Fashion and Lifestyle Magazine",
  },
  {
    title: "Glass Wardrobe System",
    description: "A wardrobe reference for sliding shutters, glass panels, and integrated lighting.",
    src: images.wardrobe,
    alt: "Modern apartment wardrobe with glass doors",
    credit: "Pexels, Max Vakhtbovych",
  },
  {
    title: "Minimal Living Storage",
    description: "A clean interior reference for concealed storage, wall cabinetry, and warm lighting.",
    src: images.living,
    alt: "Spacious room with modern furniture and wardrobe",
    credit: "Pexels, Max Vakhtbovych",
  },
  {
    title: "Island Kitchen Planning",
    description: "A kitchen island reference for counter movement, task lighting, and surface zoning.",
    src: images.island,
    alt: "Modern island kitchen with hood and pendant lamps",
    credit: "Pexels, Max Vakhtbovych",
  },
  {
    title: "Bright Cabinet Layout",
    description: "A cabinetry reference for upper shelves, lower modules, and cooking zone alignment.",
    src: images.cabinetry,
    alt: "Bright modern kitchen with cabinets and counter seating",
    credit: "Pexels, Max Vakhtbovych",
  },
];

const transformationNotes = [
  {
    title: "Verified public before-after posts",
    text: "No verified public before-after posts were found for Interior Path Modular Kitchen in accessible Google or Instagram results.",
  },
  {
    title: "Famous persons associated",
    text: "No verified public record of famous clients, members, or public figures associated with the business was found.",
  },
  {
    title: "Success stories",
    text: "No verified client success stories or review snippets were found. The website avoids fabricated testimonials.",
  },
];

const pageMeta: Record<Route, { title: string; description: string }> = {
  "/": {
    title: "Interior Path Modular Kitchen | Interior Design Studio in Mehdipatnam, Hyderabad",
    description:
      "Premium responsive website for Interior Path Modular Kitchen at Vijay Vihar, Gudi Malkapur Road, opposite Reliance Fresh, Mehdipatnam, Hyderabad.",
  },
  "/about": {
    title: "About Interior Path Modular Kitchen | Verified Business Information",
    description:
      "Verified information, address details, public research notes, and local profile for Interior Path Modular Kitchen in Mehdipatnam, Hyderabad.",
  },
  "/facilities": {
    title: "Facilities | Interior Path Modular Kitchen Hyderabad",
    description:
      "Facilities, parking verification status, demo room verification status, and visit enquiry options for Interior Path Modular Kitchen.",
  },
  "/gallery": {
    title: "Gallery | Modular Kitchen and Interior Inspiration",
    description:
      "Premium interior inspiration gallery with clearly labelled public stock imagery for modular kitchen and wardrobe planning.",
  },
  "/transformations": {
    title: "Transformations | Interior Path Modular Kitchen",
    description:
      "Verified status for public transformations, famous associations, success stories, and before-after content for Interior Path Modular Kitchen.",
  },
  "/contact": {
    title: "Contact Interior Path Modular Kitchen | Register a Design Enquiry",
    description:
      "Register a modular kitchen or interior design enquiry and get Google Maps directions to Interior Path Modular Kitchen in Mehdipatnam, Hyderabad.",
  },
};

const routeSet = new Set<Route>(navItems.map((item) => item.path));

function getInitialRoute(): Route {
  const hash = window.location.hash.replace("#", "") as Route;
  return routeSet.has(hash) ? hash : "/";
}

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-10 xl:px-20", className)}>{children}</div>;
}

function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-[100px]", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn("mb-8 max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-amber-500">{eyebrow}</p>
      ) : null}
      <h2 className={cn("text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl", tone === "dark" ? "text-white" : "text-[#111827]")}>{title}</h2>
      {text ? <p className={cn("mt-4 text-base leading-7 sm:text-lg", tone === "dark" ? "text-white/70" : "text-[#4B5563]")}>{text}</p> : null}
    </motion.div>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-full border text-sm font-black tracking-tight",
          light ? "border-white/20 bg-white text-[#111827]" : "border-[#111827]/10 bg-[#111827] text-white",
        )}
        aria-hidden="true"
      >
        IP
      </div>
      <div className="leading-none">
        <p className={cn("text-sm font-black uppercase tracking-[0.18em]", light ? "text-white" : "text-[#111827]")}>Interior Path</p>
        <p className={cn("mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]", light ? "text-white/60" : "text-[#6B7280]")}>Modular Kitchen</p>
      </div>
    </div>
  );
}

function Header({ route, navigate }: { route: Route; navigate: (path: Route) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#111827]/10 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <button type="button" className="text-left" onClick={() => navigate("/")} aria-label="Go to home page">
          <BrandMark />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-[#111827] hover:text-white",
                route === item.path ? "bg-[#111827] text-white" : "text-[#1F2937]",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#111827]/15 px-4 py-2 text-sm font-bold text-[#111827] transition hover:border-[#F59E0B] hover:text-[#F59E0B]"
          >
            <MapPin className="h-4 w-4" />
            Directions
          </a>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-5 py-2.5 text-sm font-black text-[#111827] transition hover:bg-[#EF4444] hover:text-white"
          >
            Register
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#111827]/10 text-[#111827] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle mobile navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#111827]/10 bg-white lg:hidden"
          >
            <Container className="py-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-bold",
                      route === item.path ? "bg-[#111827] text-white" : "bg-[#F9FAFB] text-[#111827]",
                    )}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function StatusTag({ status }: { status?: Fact["status"] }) {
  if (status === "verified") {
    return <span className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">Verified</span>;
  }

  if (status === "action") {
    return <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-600">Action needed</span>;
  }

  return <span className="text-xs font-black uppercase tracking-[0.16em] text-[#EF4444]">Not publicly found</span>;
}

function FactList({ facts }: { facts: Fact[] }) {
  return (
    <div className="divide-y divide-[#111827]/10 border-y border-[#111827]/10">
      {facts.map((fact, index) => (
        <motion.div
          key={fact.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.25) }}
          className="grid gap-3 py-5 sm:grid-cols-[260px_1fr] sm:gap-8"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#111827]">{fact.label}</p>
            <div className="mt-2">
              <StatusTag status={fact.status} />
            </div>
          </div>
          <p className="text-base leading-7 text-[#374151]">{fact.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ButtonLink({
  children,
  onClick,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-amber-300",
    variant === "primary" && "bg-[#F59E0B] text-[#111827] hover:bg-[#EF4444] hover:text-white",
    variant === "secondary" && "border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-[#111827]",
    variant === "dark" && "bg-[#111827] text-white hover:bg-[#EF4444]",
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

function Hero({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111827] pt-20 text-white">
      <motion.img
        src={images.hero}
        alt="Luxury modular kitchen with wood cabinets and warm lighting"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,24,39,0.92)_0%,rgba(17,24,39,0.72)_42%,rgba(17,24,39,0.28)_100%)]" />
      <Container className="relative z-10 flex min-h-[calc(100vh-80px)] items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-5 text-sm font-black uppercase tracking-[0.32em] text-[#F59E0B]">Hyderabad Interior Design Studio</p>
          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.07em] sm:text-6xl lg:text-8xl">Interior Path Modular Kitchen</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
            Premium modular kitchen and interior design enquiries for the Mehdipatnam address at Vijay Vihar, opposite Reliance Fresh.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink onClick={() => navigate("/contact")}>Register a design enquiry</ButtonLink>
            <ButtonLink href={mapUrl} variant="secondary">
              Open Google Maps
              <MapPin className="h-4 w-4" />
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function Introduction({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <Section className="bg-white">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow="Introduction"
            title="A premium local profile built only from verified or transparently unavailable public information."
            text={`${business.name} is presented as an interior design and modular kitchen destination at ${business.neighborhood}, ${business.city}. Where public data was not available, the website says so clearly instead of inventing details.`}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink onClick={() => navigate("/about")} variant="dark">
              View verified profile
              <SearchCheck className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={mapUrl} variant="primary">
              Get directions
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-y border-[#111827]/10 py-2"
        >
          {verifiedFacts.slice(0, 7).map((fact) => (
            <div key={fact.label} className="grid grid-cols-[130px_1fr] gap-5 border-b border-[#111827]/10 py-4 last:border-b-0">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6B7280]">{fact.label}</p>
              <p className="text-sm font-semibold leading-6 text-[#111827]">{fact.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function FacilitiesShowcase({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <Section className="bg-[#F9FAFB]">
      <SectionHeader
        eyebrow="Facilities"
        title="Visit planning with clear verification status."
        text="Parking and demo room details were not publicly confirmed in accessible results, so visitors can request confirmation before scheduling a visit."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {facilityItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="grid gap-5 border-t border-[#111827]/10 py-8 sm:grid-cols-[56px_1fr]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#111827] text-white">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#F59E0B]">{item.status}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#111827]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#4B5563]">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6">
        <ButtonLink onClick={() => navigate("/facilities")} variant="dark">
          Review all facilities
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

function ProofSection({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <Section className="bg-white">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden"
        >
          <img src={images.wardrobe} alt="Modern wardrobe inspiration" className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]" />
        </motion.div>
        <div>
          <SectionHeader
            eyebrow="Success Stories and Testimonials"
            title="No fabricated reviews, no invented transformations."
            text="Accessible public research did not reveal verified Google review counts, testimonials, famous clients, or Instagram transformation posts for this business. This website keeps those proof points transparent and lets real customers register an enquiry."
          />
          <div className="divide-y divide-[#111827]/10 border-y border-[#111827]/10">
            {transformationNotes.map((item) => (
              <div key={item.title} className="py-5">
                <h3 className="text-lg font-black tracking-[-0.02em] text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#4B5563]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink onClick={() => navigate("/transformations")} variant="dark">
              View proof status
              <ShieldCheck className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink onClick={() => navigate("/contact")} variant="primary">
              Start your project
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactPreview({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <Section className="bg-[#111827] text-white">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Contact Information"
            title="Find the Mehdipatnam studio address and register online."
            text="The verified public contact points available for this build are the supplied address, landmark, and Google Maps directions. Phone, email, and hours were not found in accessible public results."
            tone="dark"
          />
          <div className="mt-8 grid gap-5 text-white/82">
            <p className="flex gap-3 leading-7">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <span>
                {business.address}, {business.country}
              </span>
            </p>
            <p className="flex gap-3 leading-7">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <span>Business hours were not publicly available in accessible search results.</span>
            </p>
            <p className="flex gap-3 leading-7">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <span>No verified public phone number or email was found during research.</span>
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink onClick={() => navigate("/contact")}>Register now</ButtonLink>
            <ButtonLink href={mapUrl} variant="secondary">
              Directions
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        <MapFrame />
      </div>
    </Section>
  );
}

function MapFrame() {
  return (
    <div className="overflow-hidden border border-white/15 bg-white/5">
      <iframe
        title="Google Maps location for Interior Path Modular Kitchen"
        src={mapEmbedUrl}
        className="h-[430px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function HomePage({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <>
      <Hero navigate={navigate} />
      <Introduction navigate={navigate} />
      <FacilitiesShowcase navigate={navigate} />
      <ProofSection navigate={navigate} />
      <GalleryPreview navigate={navigate} />
      <ContactPreview navigate={navigate} />
    </>
  );
}

function GalleryPreview({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <Section className="bg-white">
      <SectionHeader
        eyebrow="Gallery"
        title="Public inspiration imagery for design conversations."
        text="No verified Instagram posts or project photos were found. These Pexels images are labelled as inspiration only and are not presented as Interior Path project work."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {galleryImages.slice(0, 3).map((image, index) => (
          <motion.figure
            key={image.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group overflow-hidden"
          >
            <div className="overflow-hidden bg-[#111827]">
              <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <figcaption className="border-b border-[#111827]/10 py-5">
              <p className="text-xl font-semibold tracking-[-0.03em] text-[#111827]">{image.title}</p>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">{image.description}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="mt-6">
        <ButtonLink onClick={() => navigate("/gallery")} variant="dark">
          Open full gallery
          <ImageIcon className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#111827] pt-20 text-white">
      {image ? <img src={image} alt="Interior design background" className="absolute inset-0 h-full w-full object-cover opacity-35" /> : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.22),transparent_30%),linear-gradient(90deg,rgba(17,24,39,0.96),rgba(17,24,39,0.78))]" />
      <Container className="relative z-10 py-[100px]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-[#F59E0B]">{eyebrow}</p>
          <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{text}</p>
        </motion.div>
      </Container>
    </section>
  );
}

function AboutPage({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Verified public profile for Interior Path Modular Kitchen."
        text="A local SEO-ready business profile for the Mehdipatnam address, with unavailable public data clearly marked."
        image={images.dining}
      />
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Business Information"
              title="What could be verified."
              text="The official public logo, owner details, phone number, hours, reviews, and Instagram account were not found in accessible indexed results."
            />
            <div className="mt-6 border-y border-[#111827]/10 py-6">
              <BrandMark />
              <p className="mt-5 text-sm leading-6 text-[#4B5563]">
                The website uses a custom text mark because an official public logo image was not found during research.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink onClick={() => navigate("/contact")} variant="dark">
                Register an enquiry
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={mapUrl} variant="primary">
                Open location
                <MapPin className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
          <FactList facts={verifiedFacts} />
        </div>
      </Section>
      <Section className="bg-[#F9FAFB]">
        <SectionHeader
          eyebrow="Research Summary"
          title="Public-data transparency."
          text="The site intentionally avoids fake ratings, fake reviews, fake owner details, fake Instagram posts, or invented client stories."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {researchLog.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-t border-[#111827]/10 pt-6"
            >
              <p className="mb-3 text-3xl font-black text-[#F59E0B]">0{index + 1}</p>
              <p className="text-base leading-7 text-[#374151]">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      <LocationSection />
    </>
  );
}

function FacilitiesPage({ navigate }: { navigate: (path: Route) => void }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="Plan a studio visit with clear expectations."
        text="Parking and demo-room availability were not publicly confirmed, so the page is designed around visit enquiries and verified directions."
        image={images.kitchen}
      />
      <Section className="bg-white">
        <SectionHeader
          eyebrow="Facility Showcase"
          title="Verified, unavailable, and request-before-visit details."
          text="Each facility item is labelled by public verification status so visitors are not misled."
        />
        <div className="divide-y divide-[#111827]/10 border-y border-[#111827]/10">
          {facilityItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = active === index;
            return (
              <div key={item.title} className="py-5">
                <button type="button" className="flex w-full items-center justify-between gap-6 text-left" onClick={() => setActive(index)}>
                  <span className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#111827] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xl font-black tracking-[-0.02em] text-[#111827]">{item.title}</span>
                      <span className="mt-1 block text-xs font-black uppercase tracking-[0.18em] text-[#F59E0B]">{item.status}</span>
                    </span>
                  </span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-[#111827] transition", isActive && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-2 pl-16 pt-4 text-base leading-7 text-[#4B5563]">{item.text}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
      <Section className="bg-[#F9FAFB]">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Enquiry Options"
              title="Choose the support you want to request."
              text="These are website enquiry options aligned to modular kitchen and interior design needs; exact service scope should be confirmed with the business."
            />
            <ButtonLink onClick={() => navigate("/contact")} variant="dark">
              Request a visit
              <CalendarCheck className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceEnquiries.map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-[#111827]/10 py-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                <p className="font-bold text-[#111827]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <LocationSection />
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Interior inspiration, clearly labelled."
        text="No verified project gallery or Instagram feed was found for the brand. The images below are public stock references, not business project claims."
        image={images.living}
      />
      <Section className="bg-white">
        <SectionHeader
          eyebrow="Image Collection"
          title="Premium modular kitchen and interior references."
          text="Use this gallery to discuss mood, material direction, and spatial priorities when registering an enquiry."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.figure
              key={image.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
              className="group overflow-hidden"
            >
              <div className="overflow-hidden bg-[#111827]">
                <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <figcaption className="border-b border-[#111827]/10 py-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#111827]">{image.title}</h3>
                  <span className="shrink-0 text-xs font-black uppercase tracking-[0.16em] text-[#F59E0B]">Inspiration</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#4B5563]">{image.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">Source: {image.credit}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>
      <SocialSection />
    </>
  );
}

function TransformationsPage({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title="Proof points are shown only when verified."
        text="The research found no verified public transformations, success stories, famous associations, or Google review snippets for the brand."
        image={images.island}
      />
      <Section className="bg-white">
        <SectionHeader
          eyebrow="Public Proof Status"
          title="No fake before-after stories."
          text="This page satisfies the transformation requirement without creating invented project outcomes."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {transformationNotes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="border-t border-[#111827]/10 pt-6"
            >
              <p className="mb-4 text-5xl font-black tracking-[-0.06em] text-[#F59E0B]">0{index + 1}</p>
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#111827]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#4B5563]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      <Section className="bg-[#F9FAFB]">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Customer Journey"
              title="Register your project so the next story can be real."
              text="The website supports direct enquiry registration for homeowners who want modular kitchen, wardrobe, or interior planning assistance."
            />
            <ButtonLink onClick={() => navigate("/contact")} variant="dark">
              Register a transformation enquiry
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <div className="divide-y divide-[#111827]/10 border-y border-[#111827]/10">
            {[
              "Submit your room type, location, and preferred service.",
              "Request confirmation for parking, demo-room access, and visit timing.",
              "Use Google Maps directions for the Vijay Vihar, Mehdipatnam address.",
              "Keep project photos and review content attached only after customer permission.",
            ].map((item, index) => (
              <div key={item} className="grid grid-cols-[52px_1fr] gap-5 py-5">
                <span className="text-2xl font-black text-[#F59E0B]">{index + 1}</span>
                <p className="text-base font-semibold leading-7 text-[#111827]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Register a design enquiry for the Mehdipatnam address."
        text="Use the form to create an on-site enquiry record, then open directions to the Vijay Vihar studio location."
        image={images.hero}
      />
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Direct Registration"
              title="Tell Interior Path what you want to plan."
              text="Because no verified public phone or email was found, this static website stores registrations in the visitor browser and gives a reference ID."
            />
            <div className="space-y-5 border-y border-[#111827]/10 py-6">
              <p className="flex gap-3 text-base leading-7 text-[#374151]">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                {business.address}, {business.country}
              </p>
              <p className="flex gap-3 text-base leading-7 text-[#374151]">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                Business hours not publicly available.
              </p>
              <p className="flex gap-3 text-base leading-7 text-[#374151]">
                <Star className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                Google rating and reviews count not verified from accessible results.
              </p>
            </div>
          </div>
          <RegistrationForm />
        </div>
      </Section>
      <LocationSection />
    </>
  );
}

function RegistrationForm() {
  const [confirmation, setConfirmation] = useState<{ id: string; name: string } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "Visitor").trim();
    const id = `IP-${Date.now().toString().slice(-6)}`;
    const record = {
      id,
      createdAt: new Date().toISOString(),
      name,
      phone: String(formData.get("phone") || ""),
      area: String(formData.get("area") || ""),
      service: String(formData.get("service") || ""),
      visitDate: String(formData.get("visitDate") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("interior-path-registrations") || "[]") as typeof record[];
      localStorage.setItem("interior-path-registrations", JSON.stringify([record, ...existing]));
      setConfirmation({ id, name });
      form.reset();
    } catch {
      setConfirmation({ id, name });
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="bg-[#111827] p-6 text-white sm:p-8"
    >
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F59E0B]">Registration Form</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">Start your design enquiry</h3>
        </div>
        <MessageSquareText className="h-8 w-8 shrink-0 text-[#F59E0B]" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" required />
        <FormField label="Phone number" name="phone" inputMode="tel" required />
        <FormField label="Project area" name="area" placeholder="Example: Mehdipatnam" />
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Service interest</span>
          <select name="service" required className="h-12 border border-white/15 bg-white px-4 text-sm font-semibold text-[#111827] outline-none focus:border-[#F59E0B]">
            <option value="">Select a service</option>
            {serviceEnquiries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <FormField label="Preferred visit date" name="visitDate" type="date" />
      </div>

      <label className="mt-5 grid gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Project brief</span>
        <textarea
          name="message"
          rows={5}
          className="resize-none border border-white/15 bg-white px-4 py-3 text-sm font-semibold text-[#111827] outline-none focus:border-[#F59E0B]"
          placeholder="Share room type, approximate size, preferred finish, or visit question."
        />
      </label>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-white/70">
        <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#F59E0B]" />
        <span>I understand this static website stores the enquiry in this browser unless a backend is connected.</span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-black text-[#111827] transition hover:bg-[#EF4444] hover:text-white">
          Submit registration
          <ArrowRight className="h-4 w-4" />
        </button>
        <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#111827]">
          Open maps
          <MapPin className="h-4 w-4" />
        </a>
      </div>

      <AnimatePresence>
        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-6 border border-[#F59E0B]/50 bg-[#F59E0B]/10 p-4"
          >
            <p className="font-black text-[#F59E0B]">Registration created: {confirmation.id}</p>
            <p className="mt-1 text-sm leading-6 text-white/78">Thank you, {confirmation.name}. Save this reference ID before leaving the page.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.form>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "email" | "numeric";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-white/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        placeholder={placeholder}
        className="h-12 border border-white/15 bg-white px-4 text-sm font-semibold text-[#111827] outline-none focus:border-[#F59E0B]"
      />
    </label>
  );
}

function LocationSection() {
  return (
    <Section className="bg-[#111827] text-white">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Location Details"
            title="Vijay Vihar, Mehdipatnam, Hyderabad."
            text="The map is generated from the supplied complete address and landmark, opposite Reliance Fresh on Gudi Malkapur Road."
            tone="dark"
          />
          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              ["Address", `${business.address}, ${business.country}`],
              ["Nearby landmark", business.landmark],
              ["Locality", business.neighborhood],
              ["City", business.city],
              ["State", business.state],
              ["Country", business.country],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-2 py-4 sm:grid-cols-[170px_1fr]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">{label}</p>
                <p className="text-sm font-semibold leading-6 text-white/86">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink href={mapUrl} variant="primary">
              Open Google Maps
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        <MapFrame />
      </div>
    </Section>
  );
}

function SocialSection() {
  return (
    <Section className="bg-[#F9FAFB]">
      <SectionHeader
        eyebrow="Social Media"
        title="Instagram and social links."
        text="No Instagram handle was supplied, and exact public searches did not identify a verified Interior Path Modular Kitchen account. Featured Instagram posts are therefore not embedded."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: AtSign,
            title: "Instagram Handle",
            text: "No verified handle found from supplied details or exact public searches.",
          },
          {
            icon: ImageIcon,
            title: "Featured Instagram Posts",
            text: "No verified posts are displayed because no matching brand account was found.",
          },
          {
            icon: MapPin,
            title: "Verified Public Link",
            text: "Google Maps directions are available by complete address query.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="border-t border-[#111827]/10 pt-6">
              <Icon className="h-7 w-7 text-[#F59E0B]" />
              <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#111827]">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#4B5563]">{item.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Footer({ navigate }: { navigate: (path: Route) => void }) {
  return (
    <footer className="bg-[#0B1220] text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr]">
          <div>
            <BrandMark light />
            <p className="mt-6 max-w-xl text-base leading-7 text-white/66">
              Premium local website for {business.name}, using the supplied Mehdipatnam address and transparent public research notes.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/50">
              Official phone, email, business hours, Google rating, reviews count, owner details, and Instagram posts were not found in accessible indexed results during this build.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-[#F59E0B]">Pages</h3>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <button key={item.path} type="button" onClick={() => navigate(item.path)} className="w-fit text-left text-sm font-semibold text-white/70 transition hover:text-white">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-[#F59E0B]">Location</h3>
            <p className="mt-5 text-sm leading-6 text-white/70">
              {business.address}, {business.country}
            </p>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#F59E0B] transition hover:text-white">
              Open Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}</p>
          <p>LocalBusiness schema, robots.txt, and sitemap.xml included</p>
        </div>
      </Container>
    </footer>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(getInitialRoute);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      name: business.name,
      description:
        "Interior design and modular kitchen business profile for the Mehdipatnam, Hyderabad address supplied for Interior Path Modular Kitchen.",
      image: images.hero,
      address: {
        "@type": "PostalAddress",
        streetAddress: "5th Floor, Vijay Vihar, Gudi Malkapur Rd, opposite Reliance Fresh, Viswash Nagar, Mehdipatnam",
        addressLocality: business.city,
        addressRegion: business.state,
        postalCode: business.postalCode,
        addressCountry: "IN",
      },
      areaServed: [business.city, business.state],
      hasMap: mapUrl,
      url: window.location.origin,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Public data note",
          value:
            "Owner, phone, email, business hours, Google rating, Google reviews count, and Instagram handle were not found in accessible indexed search results during this build.",
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    const handleHashChange = () => setRoute(getInitialRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const meta = pageMeta[route];
    document.title = meta.title;
    setMetaTag("description", meta.description);
    setMetaProperty("og:title", meta.title);
    setMetaProperty("og:description", meta.description);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:image", images.hero);
    setMetaProperty("og:locale", "en_IN");

    let script = document.getElementById("local-business-schema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "local-business-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [route, schema]);

  function navigate(path: Route) {
    if (path !== route) {
      window.location.hash = path;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#1F2937] antialiased">
      <Header route={route} navigate={navigate} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {route === "/" ? <HomePage navigate={navigate} /> : null}
            {route === "/about" ? <AboutPage navigate={navigate} /> : null}
            {route === "/facilities" ? <FacilitiesPage navigate={navigate} /> : null}
            {route === "/gallery" ? <GalleryPage /> : null}
            {route === "/transformations" ? <TransformationsPage navigate={navigate} /> : null}
            {route === "/contact" ? <ContactPage /> : null}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setMetaProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default App;