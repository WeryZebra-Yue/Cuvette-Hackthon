import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { db } from "../../firebases";
import { doc, setDoc } from "firebase/firestore";

import { Card, CardHeader, Modal } from "reactstrap";
import { useDispatch } from "react-redux";
import { Updates } from "../../action";


function CreatePathPopUp({ isOpen, toggleFun, Session }) {
  const Textref = useRef(null);
  const dispatch = useDispatch();
  const AddDataToFirebase = (e) => {
    e.preventDefault();
    toggleFun();
    setDoc(
      doc(
        db,
        "path",
        `${Session.user.email.split("@")[0]}-${Textref.current.value}`
      ),
      {
        name: Session.user.name,
        email: Session.user.email.split("@")[0],
        image: Session.user.image,
        Title: Textref.current.value,
      }
    ).then(() => {
      dispatch(Updates());
    });
  };
  return (
    <Modal isOpen={isOpen} toggle={toggleFun}>
      <div className=" modal-body p-0">
        <Card className=" bg-secondary shadow border-0">
          <CardHeader className=" bg-white pb-5">
            <div className=" text-muted text-center mb-3">
              <small>Add a New Name : </small>
            </div>
            <div className=" btn-wrapper text-center">
              <div>
                <form onSubmit={(e) => AddDataToFirebase(e)}>
                  <input type="text" ref={Textref} />
                  <button type="submit">Add</button>
                </form>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </Modal>
  );
}

export default CreatePathPopUp;
