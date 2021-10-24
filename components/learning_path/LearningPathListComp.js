import React from "react";
import Image from "next/image";
import Link from "next/link";

import deleteButton from "../../assets/paths/delete.svg";
import leaveButton from "../../assets/paths/leave.svg";

import LearningPathListCompStyles from "./LearningPathListComp.module.css";

function LearningPathListComp({ title, pathsData, isOwner, onButtonClick }) {
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
                    onButtonClick(`${path.email}-${path.Title}`);
                  }}
                >
                  <Image src={deleteButton} fill="responsive" />
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
    </div>
  );
}

export default LearningPathListComp;
