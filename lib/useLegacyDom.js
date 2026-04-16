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

    return () => {
      detachGlobals();
    };
    // Run once; functions are stable and route-specific work is handled below.
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

    return () => {
      cancelled = true;
    };
  }, [pathname]);
}
