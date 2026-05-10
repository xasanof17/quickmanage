"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Search, Bell, ChevronDown, Wrench, ShieldCheck, AlertTriangle,
  Truck, Package, Archive, List, Menu, Sun, Moon, X,
  PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type Category = { label: string; icon: LucideIcon };

const categories: Category[] = [
  { label: "All",         icon: List },
  { label: "Maintenance", icon: Wrench },
  { label: "Inspections", icon: ShieldCheck },
  { label: "Collisions",  icon: AlertTriangle },
  { label: "Trucks",      icon: Truck },
  { label: "Trailers",    icon: Package },
  { label: "Inventory",   icon: Archive },
];

interface TopbarProps {
  company?: string;
  onMenuClick?: () => void;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}

export default function Topbar({ company = "DELTA PRIME LLC C/O TRIUMPH", onMenuClick, onSidebarToggle, sidebarCollapsed }: TopbarProps) {
  const [catOpen, setCatOpen]       = useState(false);
  const [selected, setSelected]     = useState(categories[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const catRef    = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (catRef.current    && !catRef.current.contains(e.target as Node))    setCatOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") { setCatOpen(false); setSearchOpen(false); } };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  return (
    <header role="banner" className="h-16 bg-topbar border-b border-topbar-border flex items-center px-3 gap-2 shrink-0 relative">

      {/* Sidebar toggle */}
      <button
        onClick={() => { onMenuClick?.(); onSidebarToggle?.(); }}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="p-2 rounded-lg text-topbar-muted hover:bg-sidebar-hover hover:text-topbar-foreground transition-colors shrink-0"
      >
        <Menu size={18} className="lg:hidden" aria-hidden="true" />
        {sidebarCollapsed
          ? <PanelLeftOpen  size={18} className="hidden lg:block" aria-hidden="true" />
          : <PanelLeftClose size={18} className="hidden lg:block" aria-hidden="true" />
        }
      </button>

      {/* Desktop search */}
      <div className="relative hidden md:flex items-center flex-1 max-w-lg" ref={catRef}>
        <div className="flex w-full rounded-lg border border-topbar-border bg-sidebar-hover">
          <button
            onClick={() => setCatOpen(p => !p)}
            aria-haspopup="listbox" aria-expanded={catOpen} aria-label={`Category: ${selected.label}`}
            className="flex items-center gap-1.5 px-3 h-10 text-xs font-semibold text-topbar-foreground border-r border-topbar-border hover:bg-sidebar-active transition-colors rounded-l-lg shrink-0"
          >
            {selected.label} <ChevronDown size={12} className={catOpen ? "rotate-180" : ""} />
          </button>
          <input type="search" placeholder="Search Anything..." aria-label="Search"
            className="flex-1 h-10 px-3 bg-transparent text-sm text-topbar-foreground placeholder:text-topbar-muted outline-none min-w-0"
          />
          <button aria-label="Submit search"
            className="px-3 h-10 text-topbar-muted border-l border-topbar-border hover:bg-sidebar-active hover:text-topbar-foreground transition-colors rounded-r-lg"
          >
            <Search size={15} />
          </button>
        </div>
        {catOpen && <CategoryDropdown categories={categories} selected={selected} onSelect={(c) => { setSelected(c); setCatOpen(false); }} />}
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div ref={searchRef} className="absolute inset-x-0 top-0 h-16 bg-topbar z-10 flex items-center px-3 gap-2 md:hidden">
          <div className="flex flex-1 rounded-lg border border-topbar-border bg-sidebar-hover">
            <button onClick={() => setCatOpen(p => !p)} aria-haspopup="listbox" aria-expanded={catOpen}
              aria-label={`Category: ${selected.label}`}
              className="flex items-center gap-1 px-2.5 h-10 text-xs font-semibold text-topbar-foreground border-r border-topbar-border hover:bg-sidebar-active transition-colors rounded-l-lg shrink-0"
            >
              {selected.label} <ChevronDown size={11} className={catOpen ? "rotate-180" : ""} />
            </button>
            <input type="search" placeholder="Search..." aria-label="Search" autoFocus
              className="flex-1 h-10 px-2 bg-transparent text-sm text-topbar-foreground placeholder:text-topbar-muted outline-none min-w-0"
            />
          </div>
          <button onClick={() => { setSearchOpen(false); setCatOpen(false); }} aria-label="Close search"
            className="p-2 rounded-lg text-topbar-muted hover:bg-sidebar-hover hover:text-topbar-foreground transition-colors shrink-0"
          >
            <X size={18} />
          </button>
          {catOpen && (
            <div className="absolute top-full left-3 right-3">
              <CategoryDropdown categories={categories} selected={selected} onSelect={(c) => { setSelected(c); setCatOpen(false); }} />
            </div>
          )}
        </div>
      )}

      <div className="flex-1" />

      <span className="text-xs font-semibold text-topbar-muted hidden xl:block truncate max-w-[200px]">{company}</span>

      {/* Mobile search icon */}
      <button onClick={() => setSearchOpen(true)} aria-label="Open search"
        className="md:hidden p-2 rounded-lg text-topbar-muted hover:bg-sidebar-hover hover:text-topbar-foreground transition-colors"
      >
        <Search size={17} />
      </button>

      {/* Status pill */}
      <div className="hidden sm:flex items-center gap-1.5 bg-sidebar-hover border border-topbar-border rounded-full px-3 py-1.5 text-xs font-medium text-topbar-muted">
        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" aria-hidden="true" />
        Inactive <ChevronDown size={11} />
      </div>

      <ThemeToggle />

      <button aria-label="Notifications" className="relative p-2 rounded-lg text-topbar-muted hover:bg-sidebar-hover hover:text-topbar-foreground transition-colors">
        <Bell size={17} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
      </button>

      <button className="flex items-center gap-2 pl-2 border-l border-topbar-border" aria-label="User menu">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">SS</div>
        <div className="hidden lg:block text-left">
          <p className="text-xs font-semibold text-topbar-foreground leading-tight">Sodik Shadiev</p>
          <p className="text-[10px] text-topbar-muted">Fleet</p>
        </div>
      </button>
    </header>
  );
}

function CategoryDropdown({ categories, selected, onSelect }: {
  categories: Category[];
  selected: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <ul role="listbox" aria-label="Search categories"
      className="absolute top-full left-0 mt-1.5 z-50 py-1 min-w-[180px] bg-card rounded-xl shadow-xl border border-border"
    >
      {categories.map((cat) => (
        <li key={cat.label}>
          <button role="option" aria-selected={selected.label === cat.label}
            onClick={() => onSelect(cat)}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left aria-selected:text-primary aria-selected:font-semibold"
          >
            <cat.icon size={14} /> {cat.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-lg text-topbar-muted hover:bg-sidebar-hover hover:text-topbar-foreground transition-colors"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
