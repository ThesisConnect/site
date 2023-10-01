import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Provider from './Provider';

export const metadata: Metadata = {
  title: 'ThesisConnect',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <div className="relative">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
