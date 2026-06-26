"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

/** Datos que se guardan por cada ítem en el carrito. */
export type CartItem = {
  id: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  priceCop: number;
  imageUrl: string;
  originCity: string;   // Ciudad de origen del producto (para calcular envío)
  variantLabel?: string; // Ej: "Talla: M" o "Color: Verde"
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "CARGAR"; items: CartItem[] }
  | { type: "AGREGAR"; item: Omit<CartItem, "quantity"> }
  | { type: "QUITAR"; id: string; variantLabel?: string }
  | { type: "CAMBIAR_CANTIDAD"; id: string; variantLabel?: string; quantity: number }
  | { type: "VACIAR" };

// Clave única por ítem: combina producto + variante elegida.
function itemKey(id: string, variantLabel?: string) {
  return `${id}__${variantLabel ?? ""}`;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "CARGAR":
      return { items: action.items };

    case "AGREGAR": {
      const key = itemKey(action.item.id, action.item.variantLabel);
      const existe = state.items.find(
        (i) => itemKey(i.id, i.variantLabel) === key,
      );
      if (existe) {
        // Si el ítem ya existe, solo incrementa la cantidad.
        return {
          items: state.items.map((i) =>
            itemKey(i.id, i.variantLabel) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] };
    }

    case "QUITAR":
      return {
        items: state.items.filter(
          (i) =>
            itemKey(i.id, i.variantLabel) !==
            itemKey(action.id, action.variantLabel),
        ),
      };

    case "CAMBIAR_CANTIDAD":
      return {
        items: state.items
          .map((i) =>
            itemKey(i.id, i.variantLabel) ===
            itemKey(action.id, action.variantLabel)
              ? { ...i, quantity: action.quantity }
              : i,
          )
          .filter((i) => i.quantity > 0), // Cantidad 0 → quitar el ítem.
      };

    case "VACIAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  subtotalCop: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  agregar: (item: Omit<CartItem, "quantity">) => void;
  quitar: (id: string, variantLabel?: string) => void;
  cambiarCantidad: (
    id: string,
    variantLabel: string | undefined,
    quantity: number,
  ) => void;
  vaciar: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "bionexo_carrito";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  // Cargar el carrito guardado en localStorage al montar el proveedor.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "CARGAR", items: JSON.parse(raw) as CartItem[] });
      }
    } catch {
      // localStorage corrupto → iniciar con carrito vacío sin romper la app.
    }
  }, []);

  // Persistir el carrito cada vez que cambia.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Bloquear el scroll de fondo cuando el cajón está abierto.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotalCop = state.items.reduce(
    (s, i) => s + i.priceCop * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotalCop,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        agregar: (item) => dispatch({ type: "AGREGAR", item }),
        quitar: (id, variantLabel) =>
          dispatch({ type: "QUITAR", id, variantLabel }),
        cambiarCantidad: (id, variantLabel, quantity) =>
          dispatch({ type: "CAMBIAR_CANTIDAD", id, variantLabel, quantity }),
        vaciar: () => dispatch({ type: "VACIAR" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
