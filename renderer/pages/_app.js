import "../styles/globals.css";

import React from "react";
import Layout from "../components/Layout";

import { Inter } from "next/font/google";
import { SoundsContextProvider, useSounds } from "../contexts/SoundsContext";

const inter = Inter({
  subsets: ["latin"],
});

const App = ({ Component, pageProps }) => {
  // Fetch new Sounds
  useSounds();

  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};

const AppWrapper = ({ Component, pageProps }) => {
  return (
    <SoundsContextProvider>
      <App Component={Component} pageProps={pageProps} />
    </SoundsContextProvider>
  );
};

export default AppWrapper;
