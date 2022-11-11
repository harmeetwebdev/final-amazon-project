import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
// import data from "../data"
import axios from 'axios'

function HomeScreen() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // dispatch({ type: 'FETCH_REQUEST' });
            // try {
            const result = await axios.get('/api/products');
            //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            // } catch (err) {
            //     dispatch({ type: 'FETCH_FAIL', payload: err.message })
            // }

            setProducts(result.data)
        };
        fetchData();
    }, []);

    return <div>
        <h1>Featured product</h1>
        <div className='products'>
            {products.map(product => (
                < div className='product' key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                        <img src={product.image} alt={product.name} />
                    </Link>
                    <div className='product-info'>
                        <Link to={`/product/${product.slug}`}>
                            <p>{product.name}</p>
                        </Link>
                        <p><strong>${product.price}</strong></p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
export default HomeScreen