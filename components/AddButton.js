import {rdb,db} from '../firebases'
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, setDoc } from "firebase/firestore"; 
import React, { useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import { useSession } from 'next-auth/react';
import { addDoc, collection } from '@firebase/firestore/lite';
import { useDispatch } from 'react-redux';

import { Updates } from '../action';
function AddButton({Session}) {
    const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);
    const [modalNotificationOpen, setModalNotificationOpen] = React.useState(
      false
    );
   
    const [modalFormOpen, setModalFormOpen] = React.useState(false);
    const Textref = useRef(null);
    const dispatch = useDispatch();
    const  AddDataToFirebase = (e) =>{
        e.preventDefault();
        setModalFormOpen(false)
        setDoc(doc(db, "path" , `${Session.user.email.split('@')[0]}-${Textref.current.value}`), {
          name: Session.user.name,
          email :Session.user.email.split('@')[0],
          image : Session.user.image,
          Title : Textref.current.value
        }).then(()=>{
          dispatch(Updates())
        });
    }
    return (
        <div>
               
         <>
    <Row>
     <Col >
        <Button
          block
          color="default"
          onClick={() => setModalFormOpen(true)}
          type="button"
        >
         Add a New Path
        </Button>
        <Modal isOpen={modalFormOpen} toggle={() => setModalFormOpen(false)}>
          <div className=" modal-body p-0">
            <Card className=" bg-secondary shadow border-0">
              <CardHeader className=" bg-white pb-5">
                <div className=" text-muted text-center mb-3">
                  <small>Add a New Name : </small>
                </div>
                <div className=" btn-wrapper text-center">
              <div>
                  <form onSubmit={(e)=>AddDataToFirebase(e)}>  
                  <input type="text" ref={Textref}/>
                  <button type="submit">Add</button>
                  </form>
              </div>
                
                 
                </div>
              </CardHeader>
         
            </Card>
          </div>
        </Modal>
      </Col>
    </Row>
  </>
        </div>
    )
}

export default AddButton
