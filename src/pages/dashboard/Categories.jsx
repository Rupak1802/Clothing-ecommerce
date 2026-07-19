import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Outerwear", slug: "outerwear", count: 8 },
  { id: "cat-2", name: "Knitwear", slug: "knitwear", count: 12 },
  { id: "cat-3", name: "Dresses", slug: "dresses", count: 6 },
  { id: "cat-4", name: "Pants", slug: "pants", count: 10 }
];

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { name: "", slug: "" }
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const saved = localStorage.getItem("aura_categories");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      localStorage.setItem("aura_categories", JSON.stringify(DEFAULT_CATEGORIES));
      setCategories(DEFAULT_CATEGORIES);
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    reset({ name: "", slug: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("slug", category.slug);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updated = categories.filter((c) => c.id !== id);
      localStorage.setItem("aura_categories", JSON.stringify(updated));
      setCategories(updated);
      toast.success("Category deleted successfully.");
    }
  };

  const onSubmit = (data) => {
    const updatedCategories = [...categories];

    if (editingCategory) {
      const idx = updatedCategories.findIndex((c) => c.id === editingCategory.id);
      if (idx > -1) {
        updatedCategories[idx] = {
          ...updatedCategories[idx],
          name: data.name,
          slug: data.slug.toLowerCase().replace(/\s+/g, "-")
        };
      }
      toast.success("Category updated successfully.");
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: data.name,
        slug: data.slug.toLowerCase().replace(/\s+/g, "-"),
        count: 0
      };
      updatedCategories.push(newCat);
      toast.success("Category created successfully.");
    }

    localStorage.setItem("aura_categories", JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm">
        <div>
          <h2 className="font-display text-xl font-light uppercase tracking-wider text-[#4B352A]">
            Category Management
          </h2>
          <p className="text-xs text-[#6D6D6D] font-light mt-0.5">
            Manage system classification groups
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#556B2F] hover:bg-[#7A8F52] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white p-6 rounded-2xl border border-[#6F4E37]/10 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#6D6D6D]">
                Slug: {c.slug}
              </span>
              <h3 className="font-display text-lg font-medium text-[#4B352A] mt-1">
                {c.name}
              </h3>
              <p className="text-xs font-light text-[#6D6D6D] mt-2">
                Items categorised: {c.count} pieces
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-black/5 pt-3">
              <button
                onClick={() => handleOpenEdit(c)}
                className="p-1.5 rounded-lg text-[#556B2F] hover:bg-[#556B2F]/10 flex items-center cursor-pointer"
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 flex items-center cursor-pointer"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-sm border border-[#6F4E37]/15 p-6 shadow-2xl relative text-[#111111]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#6D6D6D] hover:opacity-85"
            >
              <X size={20} />
            </button>

            <h3 className="font-display text-lg font-light uppercase tracking-wider text-[#4B352A] mb-6 border-b border-black/5 pb-2">
              {editingCategory ? "Update Category" : "Add E-commerce Category"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="Knitwear"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 mt-0.5">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[#4B352A] mb-1">
                  Category Slug
                </label>
                <input
                  type="text"
                  className="w-full border border-[#6F4E37]/20 focus:border-[#4B352A] rounded-xl px-3 py-2 outline-none"
                  placeholder="knitwear"
                  {...register("slug", { required: "Slug is required" })}
                />
                {errors.slug && <p className="text-red-500 mt-0.5">{errors.slug.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#4B352A] hover:bg-[#6F4E37] text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {editingCategory ? "Save Updates" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
