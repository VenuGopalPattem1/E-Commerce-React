import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Container, Row, Col } from 'react-bootstrap';
import API from '../../const/Api';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = localStorage.getItem("jwt")

    useEffect(() => {
        axios.get(`${API}api/product`,{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the Bearer token
              'Content-Type': 'application/json', // Set the content type
            }
          })
            .then(response => {
                setProducts(response.data._embedded.products);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleDelete = (productId) => {
        axios.delete(`${API}api/product/${productId}`,{
            headers: {
              'Authorization': `Bearer ${token}`, // Include the Bearer token
              'Content-Type': 'application/json', // Set the content type
            }
          })
            .then(response => {
                setProducts(products.filter(product => product.product_id !== productId));
                alert("Product deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting product: ", error);
            });
    };

    const handleEdit = (productId) => {
        console.log("Edit product with ID:", productId);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h3 className="text-center mb-4">Product List</h3>
                    <Table striped bordered hover responsive="sm" className="shadow-sm">
                        <thead>
                            <tr className="table-primary text-center">
                                <th>Image</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.product_id} className="text-center align-middle">
                                    <td>
                                        <img 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                            style={{ height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.unitsPrice.toFixed(2)}</td>
                                    <td>{product.unitsStock}</td>
                                    <td>
                                        <Button 
                                            variant="outline-primary" 
                                            onClick={() => handleEdit(product.product_id)} 
                                            className="me-2 btn-sm"
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={() => handleDelete(product.product_id)} 
                                            className="btn-sm"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination */}
                    <Pagination className="justify-content-center mt-3">
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item 
                                key={index + 1} 
                                active={index + 1 === currentPage} 
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductTable;
