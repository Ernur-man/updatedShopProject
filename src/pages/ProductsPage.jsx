
function ProductsPage(){
    return(
        <div className='productBlock'>
            <div className='allProducts'>
            {
                products.map((el)=>(
                <nav key={el.id}>
                    <h1>{el.title}</h1>
                    <p>Price: ${el.price}</p>
                </nav>
                ))
            }
            </div>
        </div>
    )
}

export default ProductsPage