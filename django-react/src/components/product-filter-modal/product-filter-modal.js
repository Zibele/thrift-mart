import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button
 
  } from '@chakra-ui/react';

 import {React} from "react";
 import ProductFilter from "components/product-filter/product-filter";

const ProductFilterModal = (props) =>{

    const {isOpen,onOpen,onClose} = useDisclosure();

    return (
        <>

          <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-1 px-2 " onClick = {onOpen}>Filter</button>
          
    
          <Modal isOpen={isOpen} size="sm" onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter Products ({props.productQty}) found</ModalHeader>
              
              <ModalBody>

                <ProductFilter productQty={props.productQty} filterProductList={props.filterProductList} updateProductFilters={props.updateProductFilters} productFilters={props.productFilters} orderFilters={props.orderFilters} orderSelectChange={props.orderSelectChange} inModal={true}/>

              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )





}



export default ProductFilterModal;