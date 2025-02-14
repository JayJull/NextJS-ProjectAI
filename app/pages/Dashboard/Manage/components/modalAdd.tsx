import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { createAi, getKategori } from '@/lib/data';

interface Kategori {
  id: number;
  nama: string;
}

interface AddDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newProduct: any) => void;
}

const AddDataModal: React.FC<AddDataModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [url, setUrl] = useState('');
  const [gambar, setGambar] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [categories, setCategories] = useState<Kategori[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getKategori();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Gagal mengambil data kategori');
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !deskripsi || !url || !gambar || !kategoriId) {
        throw new Error('Semua field harus diisi');
      }

      const newProduct = await createAi({
        name,
        deskripsi,
        url,
        gambar,
        kategoriId: parseInt(kategoriId)
      });

      onSubmit(newProduct);
      onClose();
      
      // Reset form
      setName('');
      setDeskripsi('');
      setUrl('');
      setGambar('');
      setKategoriId('');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tambah AI</h3>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600 dark:text-gray-300 hover:text-gray-800" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              placeholder="Nama AI"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              placeholder="Deskripsi AI"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              placeholder="URL AI"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Gambar</label>
            <input
              type="text"
              value={gambar}
              onChange={(e) => setGambar(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              placeholder="URL gambar"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Kategori</label>
            <select
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Menambahkan...' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDataModal;