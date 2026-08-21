import "./globals.css";

export const metadata = {
  title: "SM Solution Technology | Soluções de TI para empresas e condomínios",
  description:
    "Infraestrutura de TI, plataformas digitais para condomínios e automação de processos. Construímos soluções para sua empresa, seu condomínio e para sua vida.",
  keywords: [
    "TI para empresas",
    "plataforma para condomínios",
    "automação de processos",
    "portaria digital",
    "suporte de TI",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "SM Solution Technology",
    description:
      "Soluções de TI, plataformas para condomínios e automação de processos.",
    images: ["/logo.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
