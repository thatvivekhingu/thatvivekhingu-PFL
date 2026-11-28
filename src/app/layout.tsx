import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, Pacifico, Noto_Sans_Gujarati, Anek_Gujarati, Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { data } from "@/data/data";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { getAllPosts } from "@/lib/blog";
import { ViewTransitions } from "next-view-transitions";
import { VianAssistant } from "@/components/vian/VianAssistant";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CanvasCursorTrail } from "@/components/ui/canvas-cursor-trail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const notoSansGujarati = Noto_Sans_Gujarati({
  variable: "--font-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const anekGujarati = Anek_Gujarati({
  variable: "--font-anek-gujarati",
  subsets: ["gujarati"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thatvivekhingu.github.io/portfolio-website"),
  title: "Vivek Hingu - AI/ML Engineer",
  description: "Personal portfolio of Vivek Hingu, AI/ML Engineer specializing in machine learning, voice systems, and modern AI applications.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-196.png", sizes: "196x196", type: "image/png" },
      { url: "/avatars/pixel-avatar.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://thatvivekhingu.github.io/portfolio-website",
    title: "Vivek Hingu — AI/ML Engineer",
    description: "AI/ML Engineer building intelligent systems and autonomous agents.",
    siteName: "Vivek Hingu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Hingu — AI/ML Engineer",
    description: "AI/ML Engineer building intelligent systems and autonomous agents.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const palettePosts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
  }));

  return (
    <ViewTransitions>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${notoSansGujarati.variable} ${anekGujarati.variable} ${anton.variable} antialiased relative bg-black text-white selection:bg-blue-500/30 selection:text-white`}
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(sessionStorage.getItem('hasSeenIntro')==='true'){document.documentElement.classList.add('has-seen-intro');}}catch(e){}})();`,
            }}
          />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar navItems={data.nav} />
            <CommandPalette posts={palettePosts} />
            
            {/* Responsive Minecraft Atmosphere Background (Desktop & Mobile) */}
            <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
              {/* Desktop View */}
              <Image
                src="/images/minecraft-desktop.jpg"
                alt="Minecraft Atmosphere Desktop"
                fill
                priority
                className="hidden md:block object-cover object-center opacity-85 sm:opacity-90 scale-100"
              />
              {/* Mobile View */}
              <Image
                src="/images/minecraft-mobile.jpg"
                alt="Minecraft Atmosphere Mobile"
                fill
                priority
                className="block md:hidden object-cover object-top opacity-85 scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/50 pointer-events-none" />
            </div>

            <Image
              src="/layout/background-ellipse3.svg"
              alt=""
              fill={false}
              width={0}
              height={0}
              className="z-1 blur-3xl opacity-[0.08] dark:opacity-[0.08] absolute max-w-5xl top-0 left-1/2 transform -translate-x-1/2 -translate-y-5/9 w-full pointer-events-none select-none"
              aria-hidden="true"
              priority
            />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Footer />
            <VianAssistant />
            <CanvasCursorTrail />
          </ThemeProvider>

          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}


