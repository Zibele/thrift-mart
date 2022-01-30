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

 import {React} from "react";
 import ProductItem from "components/product-item/product-item";


const ShoppingCart = (props) =>{

    const {isOpen,onOpen,onClose} = useDisclosure();

    console.log(`Quantity of shopping cart: ${props.shoppingCart.length}`);

    let products = props.shoppingCart.map(product=>{

        let brandName = product.brand != null ? product.brand['brand'] : "None"; 

        return  <ProductItem 
                    key = {product.id}
                    title = {product.title}
                    price = {product.price}
                    primaryImage = {product.primary_image}
                    secondaryImage = {product.secondary_image}
                    brand = {brandName}
                    inModal = {true}
                />             

    });

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
                <Button colorScheme='blue' mr={16} size="lg" width="200px" onClick={onClose}>
                  Check out
                </Button>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </>
      )

}



export default ShoppingCart;