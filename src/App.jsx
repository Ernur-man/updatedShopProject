import { useState, useEffect, use } from 'react'
import './App.less'
import Trash from './assets/Trash.svg'
import Plus from './assets/add.svg'
import Minus from './assets/remove.svg'
import { InputMask } from "primereact/inputmask";



function App() {
  const [txt, setTxt] = useState('')
  const [cart, setcart] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])
  const [showSavedProducts, setShowSavedProducts] = useState(false)
  
  const [paymentData, setPaymentData] = useState({
    name: '',
    cartNumber: '',
    expiration: '',
    cvv: ''
  })


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
  const countCartItems = cart.reduce((sum, item)=> sum + item.count, 0)


  const addDataUser=()=>{
    console.log(paymentData)
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
          
          <button className='openBasket' onClick={() => setShowSavedProducts(!showSavedProducts)}>
            {showSavedProducts ? "Close Saved" : "Open Saved"}
            <span className="cartCount">{countCartItems}</span>
          </button>
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
                          {el.count > 0 && (
                            <span className="cartCount">{countCartItems}</span>
                          )}
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
                    {/* <input type="text" placeholder='name' value={paymentData.name} onChange={(e)=> setPaymentData({...paymentData, name: e.target.value})} required/> */}
                    <InputMask value={paymentData.name} onChange={(e)=> setPaymentData({...paymentData, name: e.target.value})} mask="user" placeholder="userName"/>
                    <p>Cart Number</p>
                    <InputMask value={paymentData.cartNumber} onChange={(e)=> setPaymentData({...paymentData, cartNumber: e.target.value})} mask="1111-2222-3333-4444" placeholder="1111-2222-3333-4444"/>
                    <div>
                      <nav>
                        <p>Expiration date</p>
                        <InputMask value={paymentData.expiration} onChange={(e)=> setPaymentData({...paymentData, expiration: e.target.value})} mask="01/25" placeholder="04/26"/>
                      </nav>
                      <nav>
                        <p>CVV</p>
                        <InputMask value={paymentData.cvv} onChange={(e)=> setPaymentData({...paymentData, cvv: e.target.value})} mask="111" placeholder="99-999999"/>
                      </nav>
                      <button>Buy</button>
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