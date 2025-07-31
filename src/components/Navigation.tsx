import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Target, User, LogOut, Menu, X } from "lucide-react";

interface NavigationProps {
  isAuthenticated?: boolean;
  prepsRemaining?: number;
  userName?: string;
}

export function Navigation({ isAuthenticated, prepsRemaining, userName }: NavigationProps = {}) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();
  
  // Use auth context values if no props provided
  const finalIsAuthenticated = isAuthenticated ?? !!user;
  const finalPrepsRemaining = prepsRemaining ?? profile?.prep_count ?? 0;
  const finalUserName = userName ?? profile?.name ?? "User";

  const isActive = (path: string) => location.pathname === path;

  const commonLinks = [
    { path: "/", label: "Homepage" },
    { path: "/demo", label: "Demo" },
    { path: "/contact", label: "Contact" },
  ];

  const publicLinks = [...commonLinks];
  const authenticatedLinks = [
    { path: "/profile", label: "Profile" },
    ...commonLinks,
    ...(isAdmin ? [{ path: "/admin", label: "Admin" }] : []),
  ];

  const links = finalIsAuthenticated ? authenticatedLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Hirescout
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Prep Counter (when authenticated) */}
            {finalIsAuthenticated && (
              <Badge variant="secondary" className="hidden md:flex items-center space-x-1 bg-primary-light text-primary">
                <Target className="w-3 h-3" />
                <span>Preps: {finalPrepsRemaining}</span>
              </Badge>
            )}

            {/* Authentication Section */}
            {finalIsAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {finalUserName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary-light text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {finalIsAuthenticated && (
                <div className="px-3 py-2">
                  <Badge variant="secondary" className="bg-primary-light text-primary">
                    <Target className="w-3 h-3 mr-1" />
                    Preps: {finalPrepsRemaining}
                  </Badge>
                </div>
              )}

              {!finalIsAuthenticated && (
                <div className="px-3 py-2 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button variant="hero" className="w-full justify-start" asChild>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}