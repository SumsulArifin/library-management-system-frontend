import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { LibraryBig, PlusCircle, ListChecks, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const links = [
    {
      to: "/books",
      label: "All Books",
      icon: <LibraryBig size={20} className="text-cyan-400" />,
    },
    {
      to: "/create-book",
      label: "Add Book",
      icon: <PlusCircle size={20} className="text-emerald-400" />,
    },
    {
      to: "/borrow-summary",
      label: "Borrow Summary",
      icon: <ListChecks size={20} className="text-teal-400" />,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-teal-900 via-emerald-900 to-cyan-900 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white font-bold text-2xl md:text-3xl hover:text-cyan-300 transition-colors duration-300"
        >
          <LibraryBig size={28} className="text-cyan-400" />
          <span className="flex items-center">Library Management</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-700/50 to-cyan-700/50 text-cyan-300 font-semibold shadow-lg shadow-cyan-500/20"
                    : "text-white hover:text-emerald-300 hover:bg-emerald-800/40"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={toggleMobile}
            className="text-white p-2 rounded hover:bg-emerald-700/40 transition-colors duration-300"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-emerald-950/95 rounded-b-lg shadow-inner flex flex-col gap-2 px-4 py-3 animate-slide-down">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleMobile}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 text-cyan-300 font-semibold shadow-md"
                    : "text-white hover:text-emerald-300 hover:bg-emerald-800/40"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
