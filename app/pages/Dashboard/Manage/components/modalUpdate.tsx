import React, { useState, useEffect } from "react";
import { X } from 'lucide-react';
import { getKategori, updateAi } from "@/lib/data";

interface Kategori {
  id: number;
  nama: string;
}

interface AI {
  id: number;
  name: string;
  shortDesc: string;
  longDesc: string;
  url: string;
  shortLink: string | null;
  click: number;
  gambar: string;
  kategori: Kategori;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedProduct: AI) => void;
  currentData: AI | null;
}

const EditDataModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    url: "",
    shortLink: "",
    click: 0,
    gambar: "",
    kategoriId: 0,
  });
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentData) {
      setFormData({
        name: currentData.name,
        shortDesc: currentData.shortDesc,
        longDesc: currentData.longDesc,
        url: currentData.url,
        shortLink: currentData.shortLink || "",
        click: currentData.click,
        gambar: currentData.gambar,
        kategoriId: currentData.kategori.id,
      });
    }
  }, [currentData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getKategori();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Gagal mengambil data kategori");
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'shortDesc' && value.length > 100) return;
    if (name === 'longDesc' && value.length > 1500) return;
    
    if (name === 'kategoriId' && value !== '') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!currentData) return;

      const updatedData = await updateAi({
        id: currentData.id,
        ...formData,
      });

      onSubmit( updatedData);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Gagal mengupdate data");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl shadow-2xl">
        <div className="p-6 border-b dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit AI</h3>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Nama AI"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Singkat ({formData.shortDesc.length}/100)
                </label>
                <input
                  type="text"
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  maxLength={100}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Deskripsi singkat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL Gambar
                </label>
                <input
                  type="url"
                  name="gambar"
                  value={formData.gambar}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi Lengkap ({formData.longDesc.length}/1500)
                </label>
                <textarea
                  name="longDesc"
                  value={formData.longDesc}
                  onChange={handleChange}
                  maxLength={1500}
                  rows={4}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Deskripsi lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Link
                </label>
                <input
                  type="text"
                  name="shortLink"
                  value={formData.shortLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Short link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  name="kategoriId"
                  value={formData.kategoriId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDataModal;