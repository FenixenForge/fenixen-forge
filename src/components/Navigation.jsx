"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import img from "../lib/img";

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const navMenuRef = useRef(null);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio", icon: "material-symbols:home" },
    { href: "/bots", label: "Bots", icon: "fluent:bot-16-filled" },
    { href: "/plugins", label: "Plugins", icon: "mynaui:tool-solid" },
    { href: "/mods", label: "Mods", icon: "bi:nut-fill" },
    { href: "/setups", label: "Setups", icon: "material-symbols:computer" },
    { href: "/resources", label: "Resources", icon: "material-symbols:folder" },
  ];

  const handleScroll = () => {
    if (navMenuRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = navMenuRef.current;
      setShowScrollIndicator(
        scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight
      );
    }
  };

  useEffect(() => {
    const navMenu = navMenuRef.current;

    if (navMenu) {
      handleScroll();
      navMenu.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      if (navMenu) {
        navMenu.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      }
    };
  }, []);

  const handleLogoClick = () => {
    if (!menuClicked) {
      setIsCollapsed((prev) => !prev);
    }
  };

  const handleLinkClick = () => {
    setMenuClicked(true);
    setTimeout(() => {
      setMenuClicked(false);
    }, 500);
  };

  return (
    <nav className={isCollapsed ? "collapsed" : ""}>
      <div className="logo-nav" onClick={handleLogoClick}>
        <img src={img.logo} alt="Logo" />
        <h1>Fenixen Forge</h1>
      </div>
      <div className="nav-container">
        <div className="nav-menu">
          <ul ref={navMenuRef}>
            {navLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    // Activa "Inicio" cuando estés en cualquier subruta de /bots
                    (pathname === "/" && href === "/") ||
                    (href === "/bots" && pathname.includes("/bots")) ||
                    (href === "/plugins" && pathname.includes("/plugins"))
                      ? "active"
                      : ""
                  }
                  onClick={handleLinkClick}
                >
                  <span className="nav-btn-icon">
                    <Icon icon={icon} />
                  </span>
                  <span className="nav-btn-text">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`nav-redes ${isCollapsed ? "vertical" : ""}`}>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/Fenixen_Forge"
              >
                <Icon icon="prime:twitter" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/bMXjeJQppj"
              >
                <Icon icon="ic:baseline-discord" />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/@Fenixen_Forge"
              >
                <Icon icon="mdi:youtube" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@fenixen_forge"
              >
                <Icon icon="ic:baseline-tiktok" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.twitch.tv/fenixen_forge"
              >
                <Icon icon="mdi:twitch" />
              </a>
            </li>
          </ul>
        </div>

        <footer className={`footer ${isCollapsed ? "vertical" : ""}`}>
          <Link href="/terms/terminos">Terminos</Link>
          <Link href="/terms/politicas">Politicas Privacidad</Link>
          <Link href="/terms/contacto">Contacto</Link>
        </footer>
      </div>
    </nav>
  );
}
