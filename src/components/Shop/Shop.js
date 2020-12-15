import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../Utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 =fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

//ata use kroa hoise akadik same product ar count dhekanor jonno
   useEffect(()=>{
       const saveCart = getDatabaseCart(); //database thkeke data load kore object akare saveCart a rakse click kra jinish
       const productKeys = Object.keys(saveCart) // object.keys method saveCart namok obejct ar upor applay kora hoise.ay method ta saveCart theke saveCart ar key ghuloke array banie productKeys a assign korbe ..
       console.log(saveCart);// akhane obejct hisabe database ar key,count ar jonno 2ta product key ar count dhekeayse..
       const previousCart = productKeys.map(existingKey => {
        const  product = fakeData.find(pd => pd.key === existingKey);//productKyes mani product ar kay ghulo array hisebe store kora ase.map use kore ekta ekta key fake datar kayes ar sathe match korabo..je product ta ar key er sathe match hobe oi producta product const a assign hobe..find single value assign korbe..
        product.quantity = saveCart[existingKey] //saveCart ar modde click krito existingkey ta rekhe dibo.existingkey mani alrady added key...
          console.log(product);
           return product;
           
           
       })
       setCart(previousCart); 
   },[])

  


    const handleAddProduct =(product) =>{
        // console.log('Product added', product);
        const toBeAddedKey = product.key; //je product take add korte click korsilam setar key ta toBeAddedKey te raksi.
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey) //key mile gele product r value ta sameproduct e add hbe..na mille undefined hbe.
         
        let count = 1; //same product na thkle count 1
        let newCart;
        if(sameProduct){//product ta jdi thke thake thle body te dhkbe
            count = product.quantity + 1;//product same find kre pele quantity 1 add hbe
            sameProduct.quantity = count;//new count amra quantity r value hisebe product r feature e add kore dilam
            const others = cart.filter(pd => pd.key !== toBeAddedKey);//cart e already thaka product gulor sathe je product gulor key ekbarer beshi milbe na ,like egulo single e ache
            newCart = [...others, sameProduct]
        }

        else{ //jdi if false hy ,like same product na thake
            product.quantity = 1; //same product na thkle prretktir quantity 1
            newCart = [...cart, product] //then cart r sathe shudhu product ta add kre daw..jhtu same nai
        }
        setCart(newCart);  //setcart diye noya product add hye jcche cart e     
       addToDatabaseCart(product.key,count); //ekhane key gulor sthe ekta quantity achee
    }
     
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        handleAddProduct = {handleAddProduct}
                        showAddToCart={true} 
                        product={pd}
                        key={pd.key}
                        ></Product>)
                }
             
            </div>
            <div className="cart-container">

                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review your order</button></Link> {/*ata shudhu shop.js dhekabe cart.js a props.childern daoate ager btn ta shoraya*/}
                </Cart>

            </div>
            
        </div>
    );
};

export default Shop;