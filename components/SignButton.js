import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import  {signIn} from 'next-auth/react'
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
function SignButton() {
     
 
  const [modalFormOpen, setModalFormOpen] = React.useState(false);
    return (
   <>
    <Row>

      <Col >
        <Button
          block
          color="default"
          onClick={() => setModalFormOpen(true)}
          type="button"
        >
          Sign In
        </Button>
        <Modal isOpen={modalFormOpen} toggle={() => setModalFormOpen(false)}>
          <div className=" modal-body p-0">
            <Card className=" bg-secondary shadow border-0">
              <CardHeader className=" bg-white pb-5">
                <div className=" text-muted text-center mb-3">
                  <small>Sign in with</small>
                </div>
                <div className=" btn-wrapper text-center">
              
                
                  <Button
                    className=" btn-neutral btn-icon"
                    color="default"
                    
                    onClick={()=> signIn("google",{callbackUrl:"/"})}
                  >
                    <span className=" btn-inner--icon">
                   
                    </span>
                    <span className=" btn-inner--text">Google</span>
                  </Button>
            
                </div>
              </CardHeader>
         
            </Card>
          </div>
        </Modal>
      </Col>
    </Row>
  </>

    )
}

export default SignButton
