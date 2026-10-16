import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import MobileMenu from "./MobileMenu";
import Container from "@/common/Container";
import HeaderSearch from "./HeaderSearch";
import { useState } from "react";

export default function Header() {
  // # Ghép toàn bộ header
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="relative z-40 border-b border-border bg-background">
      <Container className="flex items-center justify-between gap-4 py-4">
        <HeaderLogo />
        <HeaderNav />
        <div className="hidden lg:block">
          <HeaderActions
            searchOpen={searchOpen}
            onOpenSearch={() => setSearchOpen((previous) => !previous)}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <MobileMenu onOpenSearch={() => setSearchOpen(true)} />
        </div>
      </Container>
      <HeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
