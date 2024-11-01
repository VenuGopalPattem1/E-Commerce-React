import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCURD = () => {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt")

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            title: '',
            unitsPrice: '',
            unitsStock: '',
            categoryName: '',
            imageFile: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('title', values.title);
            formData.append('unitsPrice', values.unitsPrice);
            formData.append('unitsStock', values.unitsStock);
            formData.append('categoryName', values.categoryName);

            // Append image file only if it exists
            if (values.imageFile) {
                formData.append('imageFile', values.imageFile);
            }

            try {
                const response = await axios.post('http://localhost:6060/api/saveProduct', formData,{
                    headers: {
                      'Authorization': `Bearer ${token}`, // Include the Bearer token
                      'Content-Type': 'multipart/form-data', // Set the content type
                    }
                });
                setAlert({ type: 'success', message: 'Product saved successfully!' });
                setTimeout(()=>navigate("/productList"),2000)
            } catch (error) {
                setAlert({ type: 'danger', message: `Error saving product: ${error.message}` });
            }
        }


    });

    return (
        <div className="container" style={{width:'500px'}}>
            <h2>Add Product</h2>
            {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="unitsPrice" className="form-label">Units Price</label>
                    <input
                        type="number"
                        id="unitsPrice"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.unitsPrice}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="unitsStock" className="form-label">Units Stock</label>
                    <input
                        type="number"
                        id="unitsStock"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.unitsStock}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                    <input
                        type="text"
                        id="categoryName"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.categoryName}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageFile" className="form-label">Image File</label>
                    <input
                        type="file"
                        id="imageFile"
                        className="form-control"
                        onChange={(event) => {
                            formik.setFieldValue('imageFile', event.currentTarget.files[0]);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Product</button>
            </form>
        </div>
    );
};

export default ProductCURD;
