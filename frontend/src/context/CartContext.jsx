import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("aura_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist = localStorage.getItem("aura_wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("aura_cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist changes to localStorage
  useEffect(() => {
    localStorage.setItem("aura_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1, size = "", color = null) => {
    const selectedSize = size || product.sizes[0] || "M";
    const selectedColor = color || product.colors[0] || { name: "Default", hex: "#111111" };

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingIdx > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIdx].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity, selectedSize, selectedColor }];
      }
    });

    setCartOpen(true);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    wishlist,
    cartOpen,
    setCartOpen,
    quickViewProduct,
    isQuickViewOpen,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    clearCart,
    openQuickView,
    closeQuickView,
    cartItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
