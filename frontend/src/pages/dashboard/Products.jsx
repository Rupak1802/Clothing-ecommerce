import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, X, Upload } from "lucide-react";
import { toast } from "react-toastify";
// removed duplicate import
import { PRODUCTS } from "../../data/products";

const colorMap = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Green', hex: '#00ff00' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Silver', hex: '#c0c0c0' },
  { name: 'Oatmeal', hex: '#dcd7c9' },
  { name: 'Taupe', hex: '#7d6b5d' },
  { name: 'Khaki', hex: '#f0e68c' },
  { name: 'Brown', hex: '#a52a2a' },
  { name: 'Pink', hex: '#ffc0cb' },
  { name: 'Orange', hex: '#ffa500' }
];

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getClosestColorName = (hex) => {
  const target = hexToRgb(hex);
  if (!target) return "Custom Color";

  let closestName = "Custom Color";
  let minDistance = Infinity;

  colorMap.forEach(color => {
    const rgb = hexToRgb(color.hex);
    if (rgb) {
      const distance = Math.pow(target.r - rgb.r, 2) + Math.pow(target.g - rgb.g, 2) + Math.pow(target.b - rgb.b, 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestName = color.name;
      }
    }
  });
  return closestName;
};

export default function ProductManagement() {
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Custom states for complex fields
  const [imagePreview, setImagePreview] = useState(null);
  const [colors, setColors] = useState([{ name: "Oatmeal", hex: "#DCD7C9" }]);
  const fileInputRef = useRef(null);

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
      countInStock: "",
      category: "Outerwear",
      collectionName: "tailoring",
      badge: "",
      description: "",
      sizes: "XS,S,M,L,XL"
    }
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
      setAllProducts([...PRODUCTS, ...adminProducts]);
    } catch (error) {
      toast.error('Failed to load products');
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setImagePreview(null);
    setColors([{ name: "Oatmeal", hex: "#DCD7C9" }]);
    reset({
      name: "",
      price: "",
      countInStock: "",
      category: "Outerwear",
      collectionName: "tailoring",
      badge: "",
      description: "",
      sizes: "XS,S,M,L,XL"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setImagePreview(product.image || product.images?.[0] || null);
    
    if (product.colors && product.colors.length > 0) {
      setColors(product.colors.map(c => ({ name: c.name, hex: c.hex })));
    } else {
      setColors([{ name: "Oatmeal", hex: "#DCD7C9" }]);
    }

    setValue("name", product.name);
    setValue("price", product.price);
    setValue("countInStock", product.countInStock || "");
    setValue("category", product.category);
    setValue("collectionName", product.collectionName || "");
    setValue("badge", product.badge || "");
    setValue("description", product.description);
    setValue("sizes", (product.sizes || []).join(","));
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        if (id.startsWith("prod-")) {
          return toast.error("Cannot delete default catalog products in mock mode.");
        }
        const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
        const updated = adminProducts.filter(p => p.id !== id);
        localStorage.setItem("aura_admin_products", JSON.stringify(updated));
        loadProducts();
        toast.success("Product deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addColor = () => {
    setColors([...colors, { name: "", hex: "#000000" }]);
  };

  const removeColor = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    
    // Automatically fill the name field if they pick a color hex
    if (field === 'hex') {
      const closestName = getClosestColorName(value);
      // Only overwrite if it's currently empty, "Custom Color", or already matches one of our auto-names
      if (!newColors[index].name || newColors[index].name === 'Custom Color' || colorMap.some(c => c.name === newColors[index].name)) {
        newColors[index].name = closestName;
      }
    }
    
    setColors(newColors);
  };

  const onSubmit = async (data) => {
    const sizesArray = data.sizes.split(",").map((s) => s.trim());
    
    // Format colors from custom state
    const colorsArray = colors.filter(c => c.name.trim() !== "").map(c => ({
      name: c.name.trim(),
      hex: c.hex
    }));

    if (colorsArray.length === 0) {
      toast.error("Please add at least one color with a valid name.");
      return;
    }

    const payload = {
      id: editingProduct ? editingProduct.id : `mock-${Date.now()}`,
      name: data.name,
      price: Number(data.price),
      countInStock: Number(data.countInStock || 0),
      category: data.category,
      collection: data.collectionName,
      badge: data.badge || null,
      description: data.description,
      sizes: sizesArray,
      colors: colorsArray,
      image: imagePreview || (editingProduct ? (editingProduct.image || editingProduct.images?.[0]) : '/trench_front.png'),
      images: editingProduct ? editingProduct.images : (imagePreview ? [imagePreview] : ['/trench_front.png'])
    };

    try {
      if (editingProduct && editingProduct.id.startsWith("prod-")) {
        return toast.error("Cannot edit default catalog products in mock mode.");
      }
      
      const adminProducts = JSON.parse(localStorage.getItem("aura_admin_products") || "[]");
      
      if (editingProduct) {
        const index = adminProducts.findIndex(p => p.id === editingProduct.id);
        if (index > -1) {
          adminProducts[index] = payload;
        }
        localStorage.setItem("aura_admin_products", JSON.stringify(adminProducts));
        toast.success("Product updated successfully.");
      } else {
        adminProducts.push(payload);
        localStorage.setItem("aura_admin_products", JSON.stringify(adminProducts));
        toast.success("Product added successfully!");
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (error) {
      toast.error("Failed to save product.");
    }
  };

  // Group products by collectionName
  const groupedProducts = allProducts.reduce((acc, product) => {
    const collection = product.collection || product.collectionName || 'Uncategorized';
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(product);
    return acc;
  }, {});

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

      {/* Inventory List Grouped by Category */}
      {Object.keys(groupedProducts).length > 0 ? (
        Object.keys(groupedProducts).map((collection) => (
          <div key={collection} className="bg-white rounded-2xl border border-[#6F4E37]/10 p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-[#4B352A] mb-4 pb-2 border-b border-[#6F4E37]/10">
              {collection}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-[#6D6D6D] border-b border-black/5">
                    <th className="py-3 font-semibold">Image</th>
                    <th className="py-3 font-semibold">Name</th>
                    <th className="py-3 font-semibold">Stock</th>
                    <th className="py-3 font-semibold">Collection</th>
                    <th className="py-3 font-semibold">Price</th>
                    <th className="py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedProducts[collection].map((p) => (
                    <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-[#F5F1E8]/20">
                      <td className="py-3">
                        <div className="h-10 w-8 bg-[#f5efe4] rounded overflow-hidden flex items-center justify-center">
                          <img src={p.image || p.images?.[0] || ""} alt="" className="h-full w-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-[#4B352A]">{p.name}</td>
                      <td className="py-3 font-light text-[#6D6D6D]">
                        {p.countInStock > 0 ? (
                          <span className="text-[#556B2F]">{p.countInStock} in stock</span>
                        ) : (
                          <span className="text-red-500 font-medium">Out of stock</span>
                        )}
                      </td>
                      <td className="py-3 font-light text-[#6D6D6D] uppercase tracking-wider">{p.collection || p.collectionName}</td>
                      <td className="py-3 font-semibold text-[#111111]">₹{p.price}</td>
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
        ))
      ) : (
        <div className="bg-white rounded-2xl border border-[#6F4E37]/10 p-12 text-center shadow-sm">
          <p className="text-[#6D6D6D] font-light">No products found. Create your first product.</p>
        </div>
      )}

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              
              {/* Image Upload Area */}
              <div className="mb-4">
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-2">
                  Product Image
                </label>
                <div 
                  className="w-full border-2 border-dashed border-[#6F4E37]/30 rounded-xl p-4 flex flex-col items-center justify-center bg-[#F5F1E8]/30 hover:bg-[#F5F1E8]/60 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative h-32 w-24 rounded overflow-hidden shadow-sm">
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-[10px] font-semibold">Change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4 text-[#6D6D6D]">
                      <Upload size={24} className="mb-2 text-[#4B352A]/50" />
                      <span className="font-semibold text-[#4B352A]">Click to upload photo</span>
                      <span className="text-[9px] mt-1">JPEG, PNG, WEBP</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden" 
                  />
                </div>
              </div>

              {/* Product name */}
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="THUKIL Silk Shirt"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 mt-0.5">{errors.name.message}</p>}
              </div>

              {/* Price & Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                    placeholder="180"
                    {...register("price", { required: "Price is required", min: 1 })}
                  />
                  {errors.price && <p className="text-red-500 mt-0.5">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                    Quantity In Stock
                  </label>
                  <input
                    type="number"
                    className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                    placeholder="10"
                    {...register("countInStock", { required: "Stock is required", min: 0 })}
                  />
                  {errors.countInStock && <p className="text-red-500 mt-0.5">{errors.countInStock.message}</p>}
                </div>
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
                    {...register("collectionName")}
                  >
                    <option value="tailoring">Minimalist Tailoring</option>
                    <option value="lounge">Knitwear & Lounge</option>
                    <option value="summer">Summer Editorial</option>
                    <option value="oversized">Oversized</option>
                    <option value="polos">Polos</option>
                    <option value="regulars">Regulars</option>
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

              {/* Colors Visual Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A]">
                    Colors
                  </label>
                  <button 
                    type="button" 
                    onClick={addColor}
                    className="text-[10px] text-[#556B2F] font-semibold hover:underline"
                  >
                    + Add Color
                  </button>
                </div>
                
                <div className="space-y-2">
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={color.name}
                          onChange={(e) => updateColor(index, 'name', e.target.value)}
                          placeholder="Color Name (e.g. Obsidian Black)"
                          className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-lg px-3 py-1.5 outline-none text-xs"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) => updateColor(index, 'hex', e.target.value)}
                          className="h-8 w-12 cursor-pointer border-0 p-0 rounded-lg overflow-hidden bg-transparent"
                        />
                      </div>
                      {colors.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeColor(index)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
