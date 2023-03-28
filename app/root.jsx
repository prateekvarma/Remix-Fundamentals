import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import MainNavigation from './components/MainNavigation';

import styles from './styles/main.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  <html lang='en'>
    <head>
      <Meta />
      <Links />
      <title>An error occurred</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className='error'>
        <h1>An error occurred</h1>
        <p>{error.message}</p>
        <p>
          back to <Link to='/'>home</Link>
        </p>
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
