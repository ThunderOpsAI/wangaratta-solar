"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  quantity: string; // e.g. "1kg", "500g", "1 each", "1 pack"
  count: number; // item multiplier
  notes?: string;
}

export interface SavedOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  fulfillment: {
    type: "pickup" | "delivery";
    address?: string;
    pickupSlot?: string;
    deliveryDay?: string;
    fee: number;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    notes?: string;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "Confirmed" | "Preparing" | "In Van" | "Ready for Pickup" | "Delivered";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "count"> & { count?: number }) => void;
  removeItem: (id: string) => void;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  updateQuantity: (id: string, newQty: string) => void;
  clearCart: () => void;
  totalEstimated: number;
  itemsCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount (SSR safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("everyday_gourmet_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Normalize items with count
          const normalized = parsed.map((item: any) => ({
            ...item,
            count: typeof item.count === "number" && item.count > 0 ? item.count : 1,
          }));
          setItems(normalized);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem("everyday_gourmet_cart", JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, "id" | "count"> & { count?: number }) => {
    const addCount = newItem.count && newItem.count > 0 ? newItem.count : 1;

    setItems((prev) => {
      // Check if matching item and quantity already exists in cart
      const existingIndex = prev.findIndex(
        (it) => it.name === newItem.name && it.quantity === newItem.quantity
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + addCount,
        };
        return updated;
      }

      const id = Math.random().toString(36).substring(2, 9);
      return [...prev, { ...newItem, id, count: addCount }];
    });

    setToastMessage(`Added "${newItem.name}" to your order`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementCount = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
    );
  };

  const decrementCount = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        })
        .filter((item) => item.count > 0)
    );
  };

  const updateQuantity = (id: string, newQty: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Estimate total based on portion multiplier and item count
  const totalEstimated = items.reduce((sum, item) => {
    let multiplier = 1;
    const lower = item.quantity.toLowerCase();
    if (lower.includes("250g")) multiplier = 0.25;
    else if (lower.includes("300g")) multiplier = 0.3;
    else if (lower.includes("500g") || lower.includes("600g")) multiplier = 0.5;
    else if (lower.includes("1.5kg")) multiplier = 1.5;
    else if (lower.includes("2kg")) multiplier = 2;
    else if (lower.includes("3kg")) multiplier = 3;
    else if (lower.includes("4kg")) multiplier = 4;
    else if (lower.includes("5kg")) multiplier = 5;
    else if (lower.includes("2 for") || lower.includes("2 pie")) multiplier = 1.5;

    const count = item.count || 1;
    return sum + item.price * multiplier * count;
  }, 0);

  const itemsCount = items.reduce((sum, item) => sum + (item.count || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        incrementCount,
        decrementCount,
        updateQuantity,
        clearCart,
        totalEstimated,
        itemsCount,
        isOpen,
        setIsOpen,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
