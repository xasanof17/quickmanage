import { Truck, DollarSign, Route, TrendingUp, ArrowRight, Flame, X } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Loads",     value: "48",       delta: "+4 today",           icon: Route,      color: "text-blue-500",    bg: "bg-blue-500/10"    },
  { label: "Active Equipment", value: "371",      delta: "+2 this week",       icon: Truck,      color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Revenue (MTD)",    value: "$124,800", delta: "+12% vs last month", icon: DollarSign, color: "text-violet-500",  bg: "bg-violet-500/10"  },
  { label: "Avg. Rate/Mile",   value: "$3.42",    delta: "-0.08 vs last week", icon: TrendingUp, color: "text-amber-500",   bg: "bg-amber-500/10"   },
];

const loads = [
  { id: "LD-9821", rate: "$900.00",   rpm: "$16.07/mi", hot: true,  origin: "Gary, IN",      originDate: "May 7, 00:00 CDT",  broker: "King Country Trailer & Service",   dest: "Amarillo, TX",         destDate: "May 14, 00:00 CDT", miles: 56,  accountant: "Sara Smith"       },
  { id: "LD-9822", rate: "$4,000.00", rpm: "$8.16/mi",  hot: true,  origin: "Torrance, CA",  originDate: "May 8, 21:00 PDT",  broker: "KUEHNE + NAGEL - TORRANCE",        dest: "Sparks, NV",           destDate: "May 9, 08:00 PDT",  miles: 490, accountant: "Ozodbek Razzogov" },
  { id: "LD-9823", rate: "$2,500.00", rpm: "$6.56/mi",  hot: true,  origin: "Tracy, CA",     originDate: "May 4, 00:00 PDT",  broker: "CROWLEY CONSOLIDATION - TRACY",    dest: "Twentynine Palms, CA", destDate: "May 5, 00:00 PDT",  miles: 381, accountant: "Sara Smith"       },
  { id: "LD-9824", rate: "$1,750.00", rpm: "$4.22/mi",  hot: false, origin: "Dallas, TX",    originDate: "May 9, 06:00 CDT",  broker: "XPO Logistics - Dallas",           dest: "Memphis, TN",          destDate: "May 10, 14:00 CDT", miles: 415, accountant: "Sara Smith"       },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5 max-w-screen-xl mx-auto">

      {/* Welcome banner — always dark, intentional */}
      <div className="relative bg-sidebar rounded-2xl p-5 md:p-6 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-16 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-1">Welcome back</p>
            <h1 className="text-sidebar-active-fg text-lg md:text-xl font-bold mb-2 leading-snug">
              Thanks for using QuickManage™ TMS,{" "}
              <span className="text-primary">DELTA PRIME LLC C/O TRIUMPH</span>
            </h1>
            <p className="text-sidebar-foreground text-sm leading-relaxed max-w-xl">
              Your QM Dashboard is your strategic command center, designed to empower you with
              laser-focused insights into every crucial aspect of your business.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 border border-white/10 shrink-0">
            <span className="text-white font-black text-xl">DP</span>
          </div>
        </div>
        <button aria-label="Dismiss banner" className="absolute top-3 right-3 text-sidebar-muted hover:text-sidebar-foreground transition-colors p-1">
          <X size={15} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              <div className={`${s.bg} ${s.color} p-1.5 rounded-lg`}>
                <s.icon size={14} aria-hidden="true" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.delta}</p>
          </div>
        ))}
      </div>

      {/* Booked Loads */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Booked Loads</h2>
            <p className="text-xs text-muted-foreground mt-0.5">May 03, 2026 – May 10, 2026</p>
          </div>
          <Link href="/loads" className="flex items-center gap-1 text-xs text-primary font-medium hover:opacity-80 transition-opacity">
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-5 overflow-x-auto">
          {["Business Overview", "Market Statistics", "Fleet"].map((tab, i) => (
            <button key={tab}
              className={`text-sm py-3 px-1 mr-6 border-b-2 whitespace-nowrap transition-colors font-medium ${
                i === 0
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Load rows */}
        <div className="divide-y divide-border">
          {loads.map((load) => (
            <div key={load.id} className="flex items-start gap-3 md:gap-5 px-5 py-4 hover:bg-muted transition-colors">
              {/* Rate */}
              <div className="w-24 md:w-28 shrink-0">
                <p className="text-sm font-bold text-primary">{load.rate}</p>
                <p className="text-xs text-muted-foreground">{load.rpm}</p>
                {load.hot && (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold bg-orange-500/15 text-orange-500 px-1.5 py-0.5 rounded">
                    <Flame size={9} aria-hidden="true" /> Hot Load
                  </span>
                )}
              </div>

              {/* Route */}
              <div className="flex-1 min-w-0 flex items-start gap-2">
                <div className="flex flex-col items-center mt-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <div className="w-px h-7 bg-border my-0.5" />
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{load.origin}</p>
                  <p className="text-xs text-muted-foreground mb-1.5">{load.originDate}</p>
                  <p className="text-xs text-muted-foreground truncate">{load.broker}</p>
                  <p className="text-sm font-semibold text-foreground truncate">{load.dest}</p>
                  <p className="text-xs text-muted-foreground">{load.destDate}</p>
                </div>
              </div>

              {/* Miles + accountant */}
              <div className="text-right shrink-0 hidden sm:block">
                <p className="text-sm font-semibold text-foreground">{load.miles} mi</p>
                <p className="text-xs text-muted-foreground mt-3">{load.accountant}</p>
                <p className="text-[10px] text-muted-foreground/50">Accountant</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Equipment */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Active Equipments</h2>
          <Link href="/resources/equipment" className="flex items-center gap-1 text-xs text-primary font-medium hover:opacity-80 transition-opacity">
            View <ArrowRight size={13} />
          </Link>
        </div>
        <p className="text-4xl font-black text-foreground">371</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Trucks",   value: "214", dot: "bg-blue-500"    },
            { label: "Trailers", value: "112", dot: "bg-primary"     },
            { label: "Other",    value: "45",  dot: "bg-amber-500"   },
          ].map((eq) => (
            <div key={eq.label} className="bg-muted rounded-lg p-3">
              <div className={`w-2 h-2 rounded-full ${eq.dot} mb-2`} aria-hidden="true" />
              <p className="text-lg font-bold text-foreground">{eq.value}</p>
              <p className="text-xs text-muted-foreground">{eq.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
