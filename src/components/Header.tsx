import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">InboxUnsub AI</span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <NavLink 
              to="/" 
              end
              activeClassName="bg-muted"
            >
              Home
            </NavLink>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <NavLink 
              to="/import"
              activeClassName="bg-muted"
            >
              Import
            </NavLink>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <NavLink 
              to="/dashboard"
              activeClassName="bg-muted"
            >
              Dashboard
            </NavLink>
          </Button>
          <Button asChild variant="default" size="sm" className="bg-gradient-primary hover:opacity-90 transition-smooth">
            <NavLink to="/import">
              Get Started
            </NavLink>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
