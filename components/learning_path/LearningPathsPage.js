import React from "react";
import Image from "next/image";
import Link from "next/link";

import db from '../../firebases'
import learningPathsPageStyles from "./LearningPathsPage.module.css";
import { doc, deleteDoc ,getDocs} from "firebase/firestore";
import addIcon from "../../assets/paths/plus.svg";

import Navbar from "../navbar";
import LearningPathListComp from "./LearningPathListComp";
import CreatePathPopUp from "./CreatePathPopUp";
function LearningPathsPage({ Session, pathsData ,SharedPaths}) {
  
  

  const [isCreatePopUpOpen, setIsCreatePopUpOpen] = React.useState(false);


  return (
    <div className={learningPathsPageStyles.learning_path_page_primary_wrapper}>
      
      <div
        className={learningPathsPageStyles.learning_path_page_secondary_wrapper}
      >
        <div
          className={learningPathsPageStyles.learning_path_create_button}
          onClick={() => {
            setIsCreatePopUpOpen(true);
          }}
        >
          <div
            className={learningPathsPageStyles.learning_path_create_button_icon}
          >
            
            <Image src={addIcon} layout="responsive" />
          </div>
          Create New
        </div>
        <div
          className={
            learningPathsPageStyles.learning_paths_page_users_paths_wrapper
          }
        >
          <LearningPathListComp
            title={"Your paths"}
            isOwner={true}
            pathsData={pathsData}
            onButtonClick={() => {
              // deleteDoc(doc(db,"path",`${pathsData.email}-${pathsData.Title}`)).then(()=>{
              //   dispatch(Updates)
              // });
             
              
              //delete path
            }}
          />
        </div>
        <div
          className={
            learningPathsPageStyles.learning_paths_page_shared_paths_wrapper
          }
        >
          <LearningPathListComp
            title={"Shared paths"}
            isOwner={false}
            Session = {Session}
            pathsData={SharedPaths}
            onButtonClick={(pathID) => {
              console.log(pathID);
              //Leave path path
            }}
          />
        </div>
      </div>
      <CreatePathPopUp
        isOpen={isCreatePopUpOpen}
        toggleFun={() => {
          setIsCreatePopUpOpen(!isCreatePopUpOpen);
        }}
        Session={Session}
      />
      <Navbar userDetails={Session.user} />
    </div>
  );
}

export default LearningPathsPage;
