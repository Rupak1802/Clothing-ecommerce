import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PRODUCTS } from "../../data/products";
import { Plus, Edit2, Trash2, X, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductManagement() {
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "Outerwear",
      collection: "tailoring",
      badge: "",
      description: "",
      sizes: "XS,S,M,L,XL",
      colors: "Oatmeal:#DCD7C9, Obsidian Black:#111111"
    }
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
    setAllProducts([...PRODUCTS, ...adminProducts]);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    reset({
      name: "",
      price: "",
      category: "Outerwear",
      collection: "tailoring",
      badge: "",
      description: "",
      sizes: "XS,S,M,L,XL",
      colors: "Oatmeal:#DCD7C9, Obsidian Black:#111111"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    // If static product from products.js, allow mock edit but show a message that it edits a copy
    setEditingProduct(product);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category);
    setValue("collection", product.collection);
    setValue("badge", product.badge || "");
    setValue("description", product.description);
    setValue("sizes", product.sizes.join(","));
    setValue(
      "colors",
      product.colors.map((c) => `${c.name}:${c.hex}`).join(", ")
    );
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Check if deleting a static product
    const isStatic = PRODUCTS.some((p) => p.id === id);
    if (isStatic) {
      toast.error("Static demo products cannot be deleted.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
      const filtered = adminProducts.filter((p) => p.id !== id);
      localStorage.setItem("aura_admin_products", JSON.stringify(filtered));
      loadProducts();
      toast.success("Product deleted successfully.");
    }
  };

  const onSubmit = (data) => {
    const sizesArray = data.sizes.split(",").map((s) => s.trim());
    const colorsArray = data.colors.split(",").map((c) => {
      const parts = c.split(":");
      return {
        name: parts[0]?.trim() || "Default",
        hex: parts[1]?.trim() || "#111111"
      };
    });

    const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");

    if (editingProduct) {
      // Check if trying to edit a static product
      const isStatic = PRODUCTS.some((p) => p.id === editingProduct.id);
      if (isStatic) {
        toast.info("Mocking edit for static demo product. Details simulated!");
        setIsModalOpen(false);
        return;
      }

      // Edit local storage product
      const updatedList = adminProducts.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: data.name,
            price: Number(data.price),
            category: data.category,
            collection: data.collection,
            badge: data.badge || null,
            description: data.description,
            sizes: sizesArray,
            colors: colorsArray
          };
        }
        return p;
      });
      localStorage.setItem("aura_admin_products", JSON.stringify(updatedList));
      toast.success("Product updated successfully.");
    } else {
      // Add new product
      const newProduct = {
        id: `prod-${Date.now()}`,
        name: data.name,
        price: Number(data.price),
        oldPrice: null,
        category: data.category,
        collection: data.collection,
        badge: data.badge || null,
        images: ["/trench_front.png"], // Default image fallback
        description: data.description,
        sizes: sizesArray,
        colors: colorsArray,
        rating: 5.0,
        reviewsCount: 0,
        tags: ["New In"]
      };

      localStorage.setItem("aura_admin_products", JSON.stringify([...adminProducts, newProduct]));
      toast.success("Product added successfully!");
    }

    setIsModalOpen(false);
    loadProducts();
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm">
        <div>
          <h2 className="font-display text-xl font-light uppercase tracking-wider text-[#4B352A]">
            Product Management
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            Total active catalog inventory: {allProducts.length} items
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#556B2F] hover:bg-[#7A8F52] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Create New Product
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-[#6D6D6D] border-b border-black/5">
                <th className="py-3 font-semibold">Image</th>
                <th className="py-3 font-semibold">Name</th>
                <th className="py-3 font-semibold">Category</th>
                <th className="py-3 font-semibold">Collection</th>
                <th className="py-3 font-semibold">Price</th>
                <th className="py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-[#F5F1E8]/20">
                  <td className="py-3">
                    <div className="h-10 w-8 bg-[#f5efe4] rounded overflow-hidden flex items-center justify-center">
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 font-semibold text-[#4B352A]">{p.name}</td>
                  <td className="py-3 font-light text-[#6D6D6D]">{p.category}</td>
                  <td className="py-3 font-light text-[#6D6D6D] uppercase tracking-wider">{p.collection}</td>
                  <td className="py-3 font-semibold text-[#111111]">${p.price}</td>
                  <td className="py-3 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg text-[#556B2F] hover:bg-[#556B2F]/10 inline-flex items-center cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 inline-flex items-center cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-[#6F4E37]/15 p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative text-[#111111]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#6D6D6D] hover:opacity-85"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-lg font-light uppercase tracking-wider text-[#4B352A] mb-6 border-b border-black/5 pb-2">
              {editingProduct ? "Edit Product Details" : "Create Catalog Product"}
            </h3>

            {editingProduct && PRODUCTS.some((p) => p.id === editingProduct.id) && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[10px] uppercase font-bold tracking-wider leading-relaxed">
                <AlertCircle size={14} />
                Demo product is write-protected. Submission is simulated.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              {/* Product name */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="AURA Silk Shirt"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 mt-0.5">{errors.name.message}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="180"
                  {...register("price", { required: "Price is required", min: 1 })}
                />
                {errors.price && <p className="text-red-500 mt-0.5">{errors.price.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none bg-white"
                    {...register("category")}
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Pants">Pants</option>
                  </select>
                </div>

                {/* Collection */}
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                    Collection Group
                  </label>
                  <select
                    className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none bg-white"
                    {...register("collection")}
                  >
                    <option value="tailoring">Minimalist Tailoring</option>
                    <option value="lounge">Knitwear & Lounge</option>
                    <option value="summer">Summer Editorial</option>
                  </select>
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Banner Badge (Optional)
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="SALE or NEW DROP"
                  {...register("badge")}
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="XS,S,M,L,XL"
                  {...register("sizes", { required: "Sizes list is required" })}
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Colors (Format name:hex, name:hex)
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="Cream:#E3DCC9, Taupe:#7D6B5D"
                  {...register("colors", { required: "Colors are required" })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none resize-none font-light leading-relaxed"
                  placeholder="Product descriptive narrative..."
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                  <p className="text-red-500 mt-0.5">{errors.description.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-[#4B352A] hover:bg-[#6F4E37] text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {editingProduct ? "Save Updates" : "Create Catalog Entry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
