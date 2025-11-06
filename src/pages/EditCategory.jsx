// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/axios";


// const EditCategory = () => {
//     const { id } = useParams();
//     console.log(id);
//     const navigate = useNavigate();
  
//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         image: ""
//     });

//     useEffect(() => {
//         async function getter() {
//             try {
//                 const detail = await api.get(`/admin/categories/${id}`)
//                 console.log(detail);



//                 setForm(detail.data)

//             } catch (error) {
//                 console.error(error)
//             }


//         }
//         getter();
//     }, [id])

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleData = async (e) => {
//         e.preventDefault();
//         try {
//             const responce = await api.put(`/admin/categories/${id}`, form)
//             console.log(responce);

//             if (responce.data.success) {

//                 alert(responce.data.message)
//             } else {
//                 if (!responce.data.success) {
//                     alert(responce.data.message)
//                 }
//             }

//             navigate('/admin/category')

//         } catch (error) {
//             console.error("Error adding category:", error);
//             alert(" Failed to update category.");
//         }
//     }









//     return (
//         <div className="w-full h-screen flex justify-center items-center bg-gray-700">

//             <form
//                 onSubmit={handleData}
//                 method="POST" action="/api/categories"
//                 className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg space-y-6"
//             >
//                 <h2 className="text-white text-3xl font-bold text-center mb-6">Edit Category</h2>

//                 <div>
//                     <label htmlFor="categoryName" className="block text-white text-lg font-medium mb-2">
//                         Category Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         id="categoryName"
//                         className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                         placeholder="category name"
//                     />
//                 </div>


//                 <div>
//                     <label htmlFor="description" className="block text-white text-lg font-medium mb-2">
//                         Description
//                     </label>
//                     <textarea
//                         name="description"
//                         id="description"
//                         onChange={handleChange}
//                         value={form.description}
//                         rows="4"
//                         className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
//                         placeholder="A brief description of this category..."
//                     ></textarea>
//                 </div>

//                 <div>
//                     <label htmlFor="imageUpload" className="block text-white text-lg font-medium mb-2">
//                         Category Image
//                     </label>
//                     <input
//                         type="file"
//                         id="imageUpload"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleChange}
//                         // value={form.image}
//                         src={form.image}
//                         alt= {form.name}

//                         className="block w-full text-sm text-white
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-green-500 file:text-white
//                     hover:file:bg-green-600 cursor-pointer"
//                     />
//                 </div>


//                 <div className="flex justify-end gap-4 pt-4">

//                     <button
//                         type="button"
//                         className="px-6 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300"
//                     >
//                         Cancel
//                     </button>

//                     <button

//                         type="submit"
//                         className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300"
//                     >
//                         Submit Category
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )

// }

// export default EditCategory


import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/axios";


const CreateCategory = () => {
     
    const { id } = useParams();

    const [name,SetName]=useState('')
    const [description,Setdescription]=useState('')
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); 
    };
    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!name.trim()){
            alert("Category name is required")
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description); 
        formData.append('image', image); 
        
       
      try{
       const data = await api.put(`/admin/categories/${id}`, formData,{
        headers:{"Content-Type":"multipart/form-data"},

      });
      console.log(formData);
      
      alert("category added successfully");
      navigate("/admin/category");
   
      }catch(err){

        console.log(err)
        alert("something error")

      }
    }


    
    
   
   return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-700">

    <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg space-y-6"
    >
        <h2 className="text-white text-3xl font-bold text-center mb-6">Add New Category</h2>

        <div>
            <label htmlFor="categoryName" className="block text-white text-lg font-medium mb-2">
                Category Name
            </label>
            <input
                type="text"
                value={name}
                onChange={(e)=>SetName(e.target.value)}
                id="categoryName"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="category name"
            />
        </div>

     
        <div>
            <label htmlFor="description" className="block text-white text-lg font-medium mb-2">
                Description
            </label>
            <textarea
                value={description}
                onChange={(e)=>Setdescription(e.target.value)}
                id="description"
                rows="4"
                className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                placeholder="A brief description of this category..."
            ></textarea>
        </div>

        <div>
            <label htmlFor="imageUpload" className="block text-white text-lg font-medium mb-2">
                Category Image
            </label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-500 file:text-white
                    hover:file:bg-green-600 cursor-pointer"
            />
        </div>

    
        <div className="flex justify-end gap-4 pt-4">
           
            <button
                type="button"
                className="px-6 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300"
            >
                Cancel
            </button>
           
            <button
                
                type="submit" 
                className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300"
            >   
                Submit Category
            </button>
        </div>
    </form>
    </div>
   )
};

export default CreateCategory




