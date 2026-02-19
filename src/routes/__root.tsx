import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { navItems } from "@/data/content";
import { isStorageAvailable } from "@/lib/storage";

export function RootLayout() {
  const location = useLocation();
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    setStorageAvailable(isStorageAvailable());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="text-xl font-black tracking-tight text-teal-700">
            SwallowWell
          </Link>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-2 text-sm">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`rounded-full px-3 py-1.5 font-medium transition ${
                        active ? "bg-teal-600 text-white" : "text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {!storageAvailable ? (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-amber-900 md:px-6" role="status">
            Local browser storage is unavailable. Risk history and daily logs cannot be saved on this device.
          </div>
        </div>
      ) : null}

      <main>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 md:px-6">
          <p className="font-semibold text-slate-800">SwallowWell — Dysphagia Self-Help Companion</p>
          <p className="mt-1">
            Educational guidance only. This website does not diagnose disease. For persistent symptoms,
            consult a qualified speech-language pathologist or physician.
          </p>
        </div>
      </footer>
    </div>
  );
}
