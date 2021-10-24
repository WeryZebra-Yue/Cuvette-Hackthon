import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Card, CardHeader, Modal } from "reactstrap";

import deleteButton from "../../assets/paths/delete.svg";
import leaveButton from "../../assets/paths/leave.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import LearningPathListCompStyles from "./LearningPathListComp.module.css";

import { Updates } from "../../action";

import { deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../../firebases";
import router from "next/router";

function LearningPathListComp({ title, pathsData, isOwner, onButtonClick ,Session}) {
  const dispatch = useDispatch();
  const [DeletePath, setDeletePath] = useState(null);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = React.useState(false);
const [data , setData] = useState(pathsData)
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
                  onClick={() => {}}
                >
                  <Image
                    src={deleteButton}
                    fill="responsive"
                    onClick={() => {
                      //
                      setDeletePath(`${path.email}-${path.Title}`);
                      setIsDeletePopUpOpen(true);
                      
                    }}
                  />
                </div>
              ) : (
                <div
                  className={
                    LearningPathListCompStyles.l_l_list_item_leave_button
                  }
                  onClick={() => {
                    let users = []
                   getDoc(doc(db,"path",`${path.email}-${path.Title}`)).then((snapshot)=>{
                      users = snapshot.data()?.user?snapshot.data()?.user:[];
                      console.log(`${path.email}-${path.Title}`)
                   })
                     console.log(users,Session.user.email.split('@')[0] )
                     
                     setDoc(doc(db,"path",`${path.email}-${path.Title}`),{
                       user : users
                     },{merge:true}).then(()=>{
                       router.reload()
                     })
                 


                  }}
                >
                  <Image src={leaveButton} fill="responsive" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isDeletePopUpOpen}
        toggle={() => {
          setIsDeletePopUpOpen(!isDeletePopUpOpen);
        }}
        centered={true}
        className={LearningPathListCompStyles.l_l_delete_popup_primary_wrapper}
      >
        <div
          className={
            LearningPathListCompStyles.l_l_delete_popup_secondary_wrapper
          }
        >
          <div className={LearningPathListCompStyles.l_l_delete_popup_title}>
            Are you sure you want to delete this path ?
            <div
              onClick={() => {
                deleteDoc(doc(db, "path", DeletePath));
                setDeletePath(null);
                dispatch(Updates());

                setIsDeletePopUpOpen(false);
              }}
              className={
                LearningPathListCompStyles.l_l_delete_popup_yes_button +
                " " +
                LearningPathListCompStyles.l_l_delete_popup_button
              }
            >
              Yes
            </div>
            <div
              onClick={() => {
                setDeletePath(null);

                setIsDeletePopUpOpen(false);
              }}
              className={
                LearningPathListCompStyles.l_l_delete_popup_no_button +
                " " +
                LearningPathListCompStyles.l_l_delete_popup_button
              }
            >
              No
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LearningPathListComp;
