import React from "react";
import Image from "next/image";
import Link from "next/link";

import learningPathsPageStyles from "./LearningPathsPage.module.css";

import addIcon from "../../assets/paths/plus.svg";

import Navbar from "../navbar";
import LearningPathListComp from "./LearningPathListComp";

function LearningPathsPage({ userData, pathsData }) {
  const tempPathData = Array(5).fill({
    pathID: 1,
    title: "Learning Path 1",
  });

  return (
    <div className={learningPathsPageStyles.learning_path_page_primary_wrapper}>
      <div
        className={learningPathsPageStyles.learning_path_page_secondary_wrapper}
      >
        <div className={learningPathsPageStyles.learning_path_create_button}>
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
            title={"Your Data"}
            isOwner={true}
            pathsData={tempPathData}
            onButtonClick={(pathID) => {
              console.log(pathID);
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
            title={"Your Data"}
            isOwner={false}
            pathsData={tempPathData}
            onButtonClick={(pathID) => {
              console.log(pathID);
              //delete path
            }}
          />
        </div>
      </div>
      <Navbar userDetails={userData} />
    </div>
  );
}

export default LearningPathsPage;
