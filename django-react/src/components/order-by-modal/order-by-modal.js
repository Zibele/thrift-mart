
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    RadioGroup,
    Stack,
    Radio,
    Button
 
  } from '@chakra-ui/react';

 import {React,useEffect,useState} from "react";

const OrderByModal = (props) =>{

    const {isOpen,onOpen,onClose} = useDisclosure();
    const [orderOptions,setOrderOptions] = useState([])


    useEffect(()=>{

    
      const options = props.orderFilters.map(item=>(<Radio value={item.value}>{item.label}</Radio>));

      setOrderOptions(options);

    },[])

    return (
        <>

          <button className="bg-gray-200 text-base font-medium text-gray-600 rounded w-32 py-1 px-2" onClick={onOpen}> Sort </button>
          
    
          <Modal isOpen={isOpen} size="sm" onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order by</ModalHeader>
              
              <ModalBody>

                <RadioGroup onChange={props.orderSelectChange} value={props.productFilters.ordering.value}>

                    <Stack direction="column">  
                        {orderOptions}
                    </Stack>

                </RadioGroup>

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



export default OrderByModal;