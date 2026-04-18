"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function initLucideIcons() {
  if (typeof window === "undefined") return false;
  const lucide = window.lucide;
  if (!lucide || typeof lucide.createIcons !== "function") return false;
  lucide.createIcons();
  return true;
}

function attachLegacyGlobals() {
  if (typeof window === "undefined") return () => {};

  window.scrollToSection = function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });

    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu && mobileMenu.style.display === "flex") {
      mobileMenu.style.display = "none";
    }
  };

  window.toggleMobileMenu = function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;

    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
    }
  };

  return () => {
    try {
      delete window.scrollToSection;
      delete window.toggleMobileMenu;
    } catch {
      // no-op
    }
  };
}

function maybeEnableNavbarScrollEffect(pathname) {
  // The legacy `index.html` adds a scroll effect that shrinks the navbar.
  // The legacy `syllabus.html` intentionally does NOT, so keep its UI unchanged.
  const isSyllabus = pathname.includes("syllabus");
  if (isSyllabus) return () => {};

  const onScroll = () => {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  return () => window.removeEventListener("scroll", onScroll);
}

export function useLegacyDom() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const detachGlobals = attachLegacyGlobals();
    return () => { detachGlobals(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    return maybeEnableNavbarScrollEffect(pathname);
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const tryInit = () => {
      if (cancelled) return;
      if (initLucideIcons()) return;
      if (attempts++ > 80) return;
      window.setTimeout(tryInit, 100);
    };
    tryInit();
    return () => { cancelled = true; };
  }, [pathname]);

  // ── Scroll Progress Bar ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create bar if it doesn't exist
    let bar = document.getElementById("scroll-progress-bar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "scroll-progress-bar";
      bar.className = "scroll-progress";
      bar.style.width = "0%";
      document.body.prepend(bar);
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, [pathname]);

  // ── Scroll Reveal (data-reveal elements) ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);
}

