import './PlansScreen.css'
import { React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js'

function PlansScreen() {
    const [products, setProducts] = useState([]);
    //gets user from redux store
    const user = useSelector(selectUser);

    useEffect(() =>{
        //fetching products from firebase where active is true
        db.collection('products')
        .where('active', '==', true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ('prices').get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    }
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db
        .collection('customers')
        .doc(user.uId)
        .collection('checkout_sessions')
        .add({
            price:priceId,
            success_url:window.location.origin,
            cancel_url: window.location.origin
        });
        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();

            if(error){
                //show an error to customer 
                //inspect cloud function data logs 
                alert(`An error has occured: ${error.message}`);
            }

            if(sessionId){
                //We have a session, lets redirect to checkout
                //init storage

                const stripe = await loadStripe('pk_test_51MOnvXCwKnoqlIdVXATICE9vUclojLtCa6RZlNkwpB2brp34BYr0ePqYRPioq6YfgYfC9sQ2mGbliZZVTBpnjWDr00eZUlHrEs');
                stripe.redirectToCheckout({ sessionId });   

            }
        })
    };

  return (
    <div className='plansScreen'>
        {/* Cant map over objects, so this is how we do it */}
        {Object.entries(products).map(([productId, productData]) => {
            //Logic to check if the users subscription is active

            return (
                <div className='plansScreen__plan'>
                    <div className='plansScreen__info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    <button onClick={() => loadCheckout(productData.prices.priceId)}>
                        Subscribe
                    </button>
                </div>
            );
        })}
    </div>
  )
}

export default PlansScreen