"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard, Bell, BarChart2, Sparkles,
  CreditCard, ShieldCheck, AlertTriangle,
  FileWarning, Truck, Wrench,
  Building2, Package, Users, Plug, Archive, BookOpen,
  LogOut, Plus, Settings2, ChevronRight,
  DollarSign, RotateCcw, Wallet, Minus,
} from "lucide-react";
import { logoutAction } from "@/app/actions/logout";
import { cn } from "@/lib/utils";

type NavItem    = { label: string; href: string; icon: React.ElementType; badge?: string };
type NavSection = { title: string; items: NavItem[] };

const nav: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard",       href: "/dashboard",              icon: LayoutDashboard },
      { label: "Notifications",   href: "/notifications",          icon: Bell,    badge: "12" },
      { label: "Reporting",       href: "/reporting",              icon: BarChart2 },
      { label: "qm-PILOT",        href: "/qm-pilot",               icon: Sparkles, badge: "BETA" },
    ],
  },
  {
    title: "Accounting",
    items: [{ label: "Prepayments", href: "/accounting/prepayments", icon: CreditCard }],
  },
  {
    title: "Safety",
    items: [
      { label: "DOT Inspections",     href: "/safety/dot",    icon: ShieldCheck },
      { label: "Collisions & Claims", href: "/safety/claims", icon: AlertTriangle },
    ],
  },
  {
    title: "Fleet",
    items: [
      { label: "Fleet Compliance",      href: "/fleet/compliance",  icon: FileWarning },
      { label: "Fleet Overview",        href: "/fleet/overview",    icon: Truck },
      { label: "Maintenance & Repairs", href: "/fleet/maintenance", icon: Wrench },
    ],
  },
  {
    title: "Account Resources",
    items: [
      { label: "My Companies",   href: "/resources/companies",    icon: Building2 },
      { label: "Equipment",      href: "/resources/equipment",    icon: Package },
      { label: "Vendors",        href: "/resources/vendors",      icon: Users },
      { label: "Integrations",   href: "/resources/integrations", icon: Plug },
      { label: "Inventory",      href: "/resources/inventory",    icon: Archive },
      { label: "Addresses Book", href: "/resources/addresses",    icon: BookOpen },
    ],
  },
];

const quickAddItems = [
  { label: "Credit",          icon: DollarSign },
  { label: "Reimbursement",   icon: RotateCcw },
  { label: "Cash Advance",    icon: Wallet },
  { label: "Other Deduction", icon: Minus },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const [sectionsCollapsed, setSectionsCollapsed] = useState<Record<string, boolean>>({});
  const [qaOpen, setQaOpen] = useState(false);
  const qaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (qaRef.current && !qaRef.current.contains(e.target as Node)) setQaOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setQaOpen(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  return (
    <aside
      aria-label="Main navigation"
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden h-screen",
        "w-64 lg:w-auto",
        collapsed ? "lg:w-[60px]" : "lg:w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 gap-2 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
            <path d="M10 2L18 10L10 18L2 10Z" fill="white" opacity="0.85"/>
            <path d="M10 6L14 10L10 14L6 10Z" fill="white"/>
          </svg>
        </div>
        <span className={cn("text-foreground font-bold text-sm tracking-tight flex-1 truncate", collapsed && "lg:hidden")}>
          quickmanage
          <span className="text-primary text-[10px] align-super font-normal">.com</span>
        </span>
      </div>

      {/* Quick Add */}
      <div className="px-3 py-3 border-b border-sidebar-border shrink-0 relative" ref={qaRef}>
        {collapsed && (
          <button
            onClick={() => setQaOpen(p => !p)}
            aria-label="Quick Add" aria-expanded={qaOpen} aria-haspopup="menu"
            className="w-9 h-9 rounded-full bg-primary hover:opacity-90 text-primary-foreground items-center justify-center mx-auto transition-opacity hidden lg:flex"
          >
            <Plus size={18} />
          </button>
        )}

        <div className={cn("flex h-9 rounded-lg overflow-hidden border border-primary", collapsed ? "lg:hidden" : "")}>
          <button
            onClick={() => setQaOpen(p => !p)}
            aria-label="Quick Add" aria-expanded={qaOpen} aria-haspopup="menu"
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary hover:opacity-90 text-primary-foreground text-xs font-bold transition-opacity"
          >
            <Plus size={14} /> Quick Add
          </button>
          <div className="w-px bg-primary-foreground/20" aria-hidden="true" />
          <button aria-label="Quick Add settings" className="px-2.5 bg-primary hover:opacity-90 text-primary-foreground transition-opacity">
            <Settings2 size={14} />
          </button>
        </div>

        {qaOpen && (
          <div
            role="menu"
            aria-label="Quick Add options"
            className="fixed lg:absolute z-[60] mt-2 py-1 min-w-[180px] bg-card rounded-xl shadow-xl border border-border"
            style={{ top: "auto", left: "12px", right: "12px" }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
              <CreditCard size={13} className="text-primary" />
              <span className="text-xs font-semibold text-card-foreground">Prepayment</span>
            </div>
            {quickAddItems.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                onClick={() => setQaOpen(false)}
                className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
              >
                <item.icon size={13} className="text-muted-foreground" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav aria-label="Sidebar navigation" className="flex-1 overflow-y-auto py-2 px-2">
        {nav.map((section) => {
          const isSectionCollapsed = sectionsCollapsed[section.title];
          const toggleSection = () => setSectionsCollapsed(p => ({ ...p, [section.title]: !p[section.title] }));

          return (
            <div key={section.title} className="mb-1">
              {/* Section header */}
              {!collapsed && (
                <button
                  onClick={toggleSection}
                  aria-expanded={!isSectionCollapsed}
                  className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sidebar-muted hover:text-sidebar-foreground transition-colors"
                >
                  {section.title}
                  <ChevronRight size={11} className={cn("transition-transform duration-200", !isSectionCollapsed && "rotate-90")} />
                </button>
              )}
              {collapsed && (
                <button
                  onClick={toggleSection}
                  aria-expanded={!isSectionCollapsed}
                  className="lg:hidden flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sidebar-muted hover:text-sidebar-foreground transition-colors"
                >
                  {section.title}
                  <ChevronRight size={11} className={cn("transition-transform duration-200", !isSectionCollapsed && "rotate-90")} />
                </button>
              )}

              {(!isSectionCollapsed || collapsed) && (
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          title={item.label}
                          className={cn(
                            "relative flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
                            collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 lg:mx-0.5 px-3 py-2" : "px-2.5 py-2",
                            active
                              ? "bg-sidebar-active text-sidebar-active-fg shadow-sm"
                              : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-fg"
                          )}
                        >
                          <item.icon size={16} className="shrink-0" aria-hidden="true" />
                          <span className={cn("flex-1 truncate", collapsed && "lg:hidden")}>{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                              item.badge === "BETA" ? "bg-violet-500/20 text-violet-400" : "bg-rose-500 text-white min-w-[18px] text-center",
                              collapsed && "lg:hidden"
                            )}>
                              {item.badge}
                            </span>
                          )}
                          {collapsed && item.badge && item.badge !== "BETA" && (
                            <span className="hidden lg:block absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {collapsed && <div className="my-1 mx-2 border-t border-sidebar-border" aria-hidden="true" />}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-sidebar-border shrink-0">
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Log out"
            className="flex items-center gap-3 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active-fg transition-colors w-full px-3 py-2"
          >
            <LogOut size={16} aria-hidden="true" />
            <span className={cn(collapsed && "lg:hidden")}>Log Out</span>
          </button>
        </form>
        <p className={cn("text-[10px] text-sidebar-muted text-center mt-2", collapsed && "lg:hidden")}>
          © 2026 QuickManage Inc.
        </p>
      </div>
    </aside>
  );
}
