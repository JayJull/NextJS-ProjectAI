// import { useState, useEffect } from "react";
// import { getKategori, updateAi } from "@/lib/data";

// interface Kategori {
//   id: number;
//   nama: string;
// }

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (updatedProduct: any) => void;
//   currentData: {
//     id: number;
//     name: string;
//     deskripsi: string;
//     url: string;
//     gambar: string;
//     kategori: {
//       id: number;
//       name: string;
//     };
//   } | null;
// }

// const EditDataModal: React.FC<EditModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   currentData,
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     deskripsi: "",
//     url: "",
//     gambar: "",
//     kategoriId: 0,
//   });
//   const [categories, setCategories] = useState<Kategori[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (currentData) {
//       setFormData({
//         name: currentData.name,
//         deskripsi: currentData.deskripsi,
//         url: currentData.url,
//         gambar: currentData.gambar,
//         kategoriId: currentData.kategori.id,
//       });
//     }
//   }, [currentData]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getKategori();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setError("Failed to load categories");
//       }
//     };

//     if (isOpen) {
//       fetchCategories();
//     }
//   }, [isOpen]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       if (!currentData) return;

//       const updatedData = await updateAi({
//         id: currentData.id,
//         ...formData,
//       });

//       onSubmit(updatedData);
//       onClose();
//     } catch (error) {
//       setError("Failed to update data");
//       console.error("Error updating data:", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//           Edit Data
//         </h2>
//         {error && (
//           <div className="mb-4 text-red-500 text-sm">{error}</div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Nama
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Deskripsi
//               </label>
//               <textarea
//                 value={formData.deskripsi}
//                 onChange={(e) =>
//                   setFormData({ ...formData, deskripsi: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 URL
//               </label>
//               <input
//                 type="text"
//                 value={formData.url}
//                 onChange={(e) =>
//                   setFormData({ ...formData, url: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Gambar URL
//               </label>
//               <input
//                 type="text"
//                 value={formData.gambar}
//                 onChange={(e) =>
//                   setFormData({ ...formData, gambar: e.target.value })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Kategori
//               </label>
//               <select
//                 value={formData.kategoriId}
//                 onChange={(e) =>
//                   setFormData({ ...formData, kategoriId: Number(e.target.value) })
//                 }
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                 required
//               >
//                 <option value="">Pilih Kategori</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.nama}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditDataModal;