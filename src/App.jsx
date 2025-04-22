import { useState, useEffect, use } from 'react'
import './App.less'
import Trash from './assets/Trash.svg'
import Plus from './assets/add.svg'
import Minus from './assets/remove.svg'

function App() {
  const [txt, setTxt] = useState('')
  const [cart, setcart] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])
  const [showSavedProducts, setShowSavedProducts] = useState(false)

  useEffect(()=>{
    fetch('/movies.json')
      .then((response)=>response.json())
      .then(data => {
        setProducts(data)
      })
  },[])

  const AddProducts = (e)=>{
    const value = e.target.value 
    setTxt(value)

    setfilteredProducts(products.filter((movie)=> movie.title.startsWith(value)))
    
  }

  const addTocart = (el) =>{
    // const checkcartTovalue = cart.some((item)=> item.id === el.id)
    // if(!checkcartTovalue){
    //   setcart((prevcart) => [...prevcart, {...el, count: 1}])  
    // }
    setcart((prevcart)=>{
      const existingItem = prevcart.find((item)=> item.id === el.id)
      if (existingItem){
        return prevcart.map((item)=>
          item.id === el.id ? {...item, count: item.count + 1} : item
        )
      } 
      else{
        return [...prevcart, {...el, count: 1}]
      }
      
    })
  }

  const increment = ((id)=>{
    setcart((prevcart)=>prevcart.map((item)=>
      item.id === id? {...item, count: item.count + 1} : item
    ))
  })
  const decrement = ((id)=>{
    setcart((prevcart)=>prevcart.map((item)=>
      item.id === id ? {...item, count: item.count - 1} : item 
    ).filter((item)=>item.count > 0))

  })


  const removeTocart = (index) =>{
    setcart((prevcart) => prevcart.filter((_, i)=> i !== index))
  }

  return (
    <main>
        <div className='searchBlock'>
            <input type="text" value={txt} onChange={AddProducts}/>
            
        </div>

        <div className='productBlock'>
          <div className='allProducts'>
            {
              (filteredProducts.length ? filteredProducts : products).map((el)=>(
                <nav key={el.id}>
                  <img src={el.imgSrc} alt="" />
                  <h1>{el.title}</h1>
                  <p>Price: ${el.price}</p>
                  <button onClick={()=>addTocart(el)}>Buy</button>
                </nav>
              ))
            }
          </div>
        </div>
        
        <div className='openCart'>
          <button className='openBasket' onClick={()=>setShowSavedProducts(!showSavedProducts)}>{showSavedProducts ? "Close Saved" : "Open Saved"}</button>
          <span>{}</span>
        </div>
        {
          showSavedProducts && (  
            <div className='modal_card'>
            <div className="container">
              <h4 onClick={()=>setShowSavedProducts(!showSavedProducts)}>Shopping continue</h4>
              <article>
                <aside>
                  
                    <ul className='products'>
                    {
                      cart.map((el, index)=>(
                        <li key={index}>
                          <h3>{el.title}</h3>
                          <h4>{el.count}</h4>
                          <nav>
                            <img src={Plus} onClick={()=>increment(el.id)}/>
                            <img src={Minus} onClick={()=>decrement(el.id)}/>
                          </nav>
                          <p>${el.price * el.count}</p>
                          <button onClick={()=> removeTocart(index)}><img src={Trash}/></button>
                        </li>
                      ))
                    }
                  </ul>
                  
                </aside>
                <aside className='Payment'>

                  <div>
                    <h2>Cart Details</h2>
                  </div>

                  <p>Cart type</p>
                  <nav>

                  </nav>
                  <form>
                    <p>Name on cart</p>
                    <input type="text" placeholder='name'/>
                    <p>Cart Number</p>
                    <input type="text" placeholder='1111 2222 3333 4444'/>
                    <div>
                      <nav>
                        <p>Expiration date</p>
                        <input type="text" placeholder='mm/yy'/>
                      </nav>
                      <nav>
                        <p>CVV</p>
                        <input type="text" placeholder='123' />
                      </nav>
                    </div>
                  </form>
                </aside>  
              </article>
        
          </div>
          </div>
          )
        }
    </main>
  )
}

export default App











