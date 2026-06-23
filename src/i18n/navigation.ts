import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Helpers de navegación (Link, useRouter, etc.) que ya saben mantener
// el idioma actual en la URL cuando el usuario navega entre páginas.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
