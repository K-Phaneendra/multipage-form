import React from "react";
import Header from "../components/header";
import LayoutContent from "../layout-content";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <LayoutContent />
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}
