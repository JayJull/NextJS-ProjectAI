'use client'
import { Layout } from '@/app/components/Dashboard/Layout';
import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Start with 5 entries per page
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data - nanti bisa diganti dengan data dari API/database
  const initialData = [
    { id: 1, nama: 'Vocera AI', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 2, nama: 'Adot', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Foto' },
    { id: 3, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 4, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 5, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 6, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 7, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 8, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 9, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
    { id: 10, nama: 'Aimee', Deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem culpa officia excepturi. Suscipit eos voluptate facere exercitationem eligendi adipisci totam?', Kategori: 'Ai Video' },
  ];

  // Filter data berdasarkan search term
  const filteredData = initialData.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered data
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage, 
    currentPage * entriesPerPage
  );

  const handleEdit = (id: number) => {
    console.log('Edit item with id:', id);
    // Implement edit logic
  };

  const handleDelete = (id: number) => {
    console.log('Delete item with id:', id);
    // Implement delete logic
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        {/* Add Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus className="text-sm" />
          Tambah
        </button>

        {/* Entries & Search */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300">Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <span className="text-gray-600 dark:text-gray-300">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              placeholder="Cari..."
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-200">No</th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-200">Nama</th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-200">Deskripsi</th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-200">Kategori</th>
              <th className="px-6 py-3 text-gray-600 dark:text-gray-200">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{item.nama}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{item.Deskripsi}</td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{item.Kategori}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaEdit className="text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash className="text-sm" />
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600 dark:text-gray-300">
          Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePreviousPage}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentPage}
          </button>
          <button 
            onClick={handleNextPage}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProductTable;
