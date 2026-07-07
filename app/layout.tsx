import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liquid Glass Demo',
  description: 'Efecto de cristal líquido con filtros SVG - Demo interactiva',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: '#0f0c29' }}>
        {children}
      </body>
    </html>
  );
}
