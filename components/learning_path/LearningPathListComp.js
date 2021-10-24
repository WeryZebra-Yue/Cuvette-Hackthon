import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Updates } from "../../action";
import deleteButton from "../../assets/paths/delete.svg";
import leaveButton from "../../assets/paths/leave.svg";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, CardHeader, Modal } from "reactstrap";
import LearningPathListCompStyles from "./LearningPathListComp.module.css";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../firebases";

function LearningPathListComp({ title, pathsData, isOwner, onButtonClick }) {
  const dispatch = useDispatch();
  const [DeletePath,setDeletePath] = useState(null);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = React.useState(false);

  return (
    <div className={LearningPathListCompStyles.l_l_primary_wrapper}>
      
      <h4 className={LearningPathListCompStyles.l_l_title}>{title}</h4>
      <div className={LearningPathListCompStyles.l_l_list_wrapper}>
        {pathsData?.map((path, index) => {
          return (
            <div
              className={LearningPathListCompStyles.l_l_list_item}
              key={index}
              style={{
                borderBottom:
                  index === pathsData.length - 1 ? "none" : "1px solid #e6e6e6",
              }}
            >
              <Link href={`/p/${path.email}-${path.Title}`}>
                <div className={LearningPathListCompStyles.l_l_list_item_title}>
                  {path.Title}
                </div>
              </Link>
              {isOwner ? (
                <div
                  className={
                    LearningPathListCompStyles.l_l_list_item_delete_button
                  }
                  onClick={() => {
                  
                  }}
                >
                  <Image src={deleteButton} fill="responsive" onClick={()=>{
                      //
                      setDeletePath(`${path.email}-${path.Title}`)
                      setIsDeletePopUpOpen(true)
                      console.log("Suuu?")
                
                  }}/>
                </div>
              ) : (
                <div
                  className={
                    LearningPathListCompStyles.l_l_list_item_leave_button
                  }
                  onClick={() => {
                    onButtonClick(`${path.email}-${path.Title}`);
                  }}
                >
                  <Image src={leaveButton} fill="responsive" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal isOpen={isDeletePopUpOpen} toggle={() =>{
          setIsDeletePopUpOpen(!isDeletePopUpOpen)
      }}>
      <div className=" modal-body p-0">
        <Card className=" bg-secondary shadow border-0">
          <CardHeader className=" bg-white pb-5">
            <div className=" text-muted text-center mb-3">
              
                <small>Are you sure about that ?</small>
                <br/  >
                <button 
                onClick={()=>{
                
                    deleteDoc(doc(db,"path",DeletePath));
                    setDeletePath(null)
                    dispatch(Updates())
                  
                 
                  setIsDeletePopUpOpen(false)
                }
                }>Yes</button>
                <br/>
                <button onClick={()=>{
                  setDeletePath(null)
               
                  setIsDeletePopUpOpen(false)
                }
                }>No</button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </Modal>
    </div>
  );
}

export default LearningPathListComp;
