import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    ModalCloseButton
  } from '@chakra-ui/react';

 import {React,useState,useEffect,useCallback} from "react";

 import ProductItem from "components/product-item/product-item";
 
 import { useDispatch,useSelector } from 'react-redux';


const ShoppingCart = (props) =>{

    const {isOpen,onOpen,onClose} = useDisclosure();
  
    const [products,setProducts] = useState([]);

    const cart = useSelector(state=>state.shoppingCart.cart);
    const totalPrice = useSelector(state=>state.shoppingCart.totalPrice);

    
   
    useEffect(() => {

      
      let products = cart.map(product=>{

        let brandName = product.brand != null ? product.brand['brand'] : "None"; 
        
        return  <ProductItem 
                    key = {product.id}
                    id  = {product.id}
                    title = {product.title}
                    price = {product.price}
                    primaryImage = {product.primary_image}
                    secondaryImage = {product.secondary_image}
                    brand = {brandName}
                    inModal = {true}
                    quantityInStock = {product.quantity_in_stock}
                    removeFromCart= {props.removeFromCart}
                />             

    });

      setProducts(products)
    }, [cart.length]);

    const checkOut = useCallback((onClose)=> {

      console.log("Checking out")
      onClose();


    },[]);


    return (
        <>

          <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-1 px-2 " onClick = {onOpen}>Cart</button>
          
    
          <Modal isOpen={isOpen} size="lg" onClose={onClose} scrollBehavior='inside'>

            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Shopping cart</ModalHeader>
              <ModalCloseButton />
              
              <ModalBody>

                <div class="flex flex-col space-y-2 p-2">
                  {products}
                </div>  

              </ModalBody>
    
              <ModalFooter>
                <div className="flex justify-center w-full">
                  <Button colorScheme='blue'  size="lg"  onClick={()=>checkOut(onClose)}>
                    Check out (R{totalPrice})
                  </Button>
                </div>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </>
      )

}




export default ShoppingCart;