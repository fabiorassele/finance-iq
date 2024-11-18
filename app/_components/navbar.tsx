"use client";

import { UserButton } from "@clerk/nextjs";
import { PanelBottomClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/transactions", label: "Transações" },
    { href: "/subscription", label: "Assinatura" },
  ];

  const renderLinks = (mobile = false) =>
    links.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={`${
          pathname === href
            ? "font-bold text-primary"
            : "text-muted-foreground hover:text-primary"
        } ${mobile ? "block rounded px-4 py-2" : ""}`}
        aria-current={pathname === href ? "page" : undefined}
        onClick={mobile ? () => setIsOpen(false) : undefined}
      >
        {label}
      </Link>
    ));

  return (
    <div className="flex items-center justify-between border-b border-solid px-8 py-4 lg:px-4 lg:pr-8">
      {/* Mobile: Menu Hambúrguer */}
      <button
        onClick={toggleMenu}
        type="button"
        className="text-muted-foreground focus:outline-none lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <PanelBottomClose className="h-6 w-6" />
        ) : (
          <PanelLeftOpen className="h-6 w-6" />
        )}
      </button>

      {/* Logo: Centralizada no Mobile, à Esquerda no Desktop */}
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center gap-12 lg:static lg:translate-x-0">
        <Link href={process.env.APP_URL || "/"}>
          <Image
            src="/logotipo-branco-185X47.svg"
            alt="Logo Fintrack.AI"
            width={173}
            height={39}
          />
        </Link>
        <div className="hidden items-center gap-12 lg:flex">
          {renderLinks()}
        </div>
      </div>

      {/* UserButton */}
      <div className="flex items-center md:hidden">
        <UserButton />
      </div>
      <div className="hidden items-center md:flex">
        <UserButton showName />
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-16 z-50 w-full bg-background p-4 shadow-lg"
        >
          {renderLinks(true)}
        </div>
      )}
    </div>
  );
};

export default Navbar;
