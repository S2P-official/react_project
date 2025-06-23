// components/Layout.tsx
import Head from 'next/head';
import { ReactNode } from 'react';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title = 'Fictile Core', children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Fictile Core - Centralized Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
    </>
  );
}
