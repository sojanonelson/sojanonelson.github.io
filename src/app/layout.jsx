import "./globals.css";
import "../App.css";

export const metadata = {
  title: "Sojan | Software engineer",
  description: "Portfolio of Sojan O Nelson, a Software Developer and Web Developer skilled in React, Node.js, and modern web technologies. Discover projects and connect with Sojan.",
  keywords: "Sojan, Sojan O Nelson, Software Developer, Web Developer, React, JavaScript, Portfolio",
  robots: "index, follow",
  openGraph: {
    title: "Sojan O Nelson - Software Developer Portfolio",
    description: "Explore the portfolio of Sojan O Nelson, a skilled Software Developer with expertise in modern web development.",
    images: [
      {
        url: "https://i.ibb.co/dQCwWr0/sqqure.jpg",
      }
    ],
    url: "https://sojanonelson.github.io",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sojan O Nelson",
    "jobTitle": "Software Developer",
    "url": "https://sojanonelson.github.io",
    "sameAs": [
      "https://github.com/sojanonelson",
      "https://linkedin.com/in/sojanonelson"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
