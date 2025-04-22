
function SearchProductsPage(){
    return(
        <div className='searchBlock'>
            <input type="text" value={txt} onChange={hello}/>
            <ul>
              {filteredProducts.map((el)=>(
                <li key={el.id}>
                  <h3>{el.title}</h3>
                  <p>${el.price}</p>
                  <button onClick={()=> addTocard(el)}>Купить</button>
                </li>
              ))}
            </ul>
      </div>
    )
}
export default SearchProductsPage