import React, { useEffect } from "react";
import Image from "next/image";
import reactDom from "react-dom";
import Link from "next/link";

import IndividualPathPageStyles from "./IndividualPathPage.module.css";

import deleteButton from "../../assets/paths/delete.svg";
import plusButton from "../../assets/paths/plus_t.svg";

import Navbar from "../navbar";
import TimelineObjComp from "./TimelineObjComp";
import PathDataPageRightPanelButton from "./PathDataPageRightPanelButton";

import updatedTextareaHeight from "./helpers/text_area_height_updater";
import useMediaQuery from "./../helpers/useMediaQuery";

import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../../firebases";
import { useDispatch } from "react-redux";
import { Access } from "../../action";

function IndividualPathPage({
  Session,
  isOwner = true,
  isShared,
  Querye,
  people,
  pathDatax,
  pathData = {
    Title: pathDatax.CTitle ? pathDatax.CTitle : pathDatax.Title,
    timeline: pathDatax.currentTimelineData
      ? pathDatax.currentTimelineData
      : Array(1).fill({
          title: "",
          description: "",
        }),
  },
}) {
  const titleRef = React.useRef(123456);
  const dispatch = useDispatch();
  const [isInEditMode, setIsInEditMode] = React.useState(false);
  const [isDataChanged, setIsDataChanged] = React.useState(false);
  const [currentTimelineData, setCurrentTimelineData] = React.useState(
    pathData.timeline
  );
  const [currentTitle, setCurrentTitle] = React.useState(pathData.Title);

  const windowWidth = useMediaQuery();

  useEffect(() => {
    titleRef.current.value = currentTitle;
    updatedTextareaHeight(titleRef.current);
  }, [currentTitle]);

  useEffect(() => {
    updatedTextareaHeight(titleRef.current);
  }, [windowWidth]);

  useEffect(() => {
    setIsDataChanged(
      !(
        currentTimelineData === pathData.timeline &&
        currentTitle === pathData.Title
      )
    );
  }, [currentTimelineData, currentTitle]);

  const setToEditMode = () => {
    setIsInEditMode(true);
  };

  const resetFun = () => {
    setCurrentTitle(pathData.Title);
    setCurrentTimelineData(pathData.timeline);
    setIsInEditMode(false);
  };

  const saveDataChanges = () => {
    console.log("save");
    setDoc(
      doc(db, "path", Querye),
      { currentTimelineData, CTitle: currentTitle },
      {
        merge: true,
      }
    );
    console.log(currentTimelineData);
    setIsInEditMode(false);
  };

  const handleInputDataChange = (posIndex, updatedData) => {
    let tempData = currentTimelineData.slice();
    tempData[posIndex] = updatedData;
    setCurrentTimelineData(tempData);
  };

  const addNewTimelineObj = () => {
    setIsInEditMode(true);

    let tempData = currentTimelineData.slice();

    if (
      tempData[tempData.length - 1].title === "" ||
      tempData[tempData.length - 1].description === ""
    ) {
      return;
    }
    tempData.push({
      title: "",
      description: "",
    });
    setCurrentTimelineData(tempData);
  };

  return (
    <div className={IndividualPathPageStyles.i_p_p_primary_wrapper}>
      <div className={IndividualPathPageStyles.i_p_p_timeline_wrapper}>
        <textarea
          className={IndividualPathPageStyles.i_p_p_path_title}
          onChange={(e) => {
            updatedTextareaHeight(e.target);
            setCurrentTitle(e.target.value);
          }}
          disabled={!isInEditMode}
          ref={titleRef}
          defaultValue={currentTitle}
        />

        <div className={IndividualPathPageStyles.i_p_p_timeline_list_wrapper}>
          {(isOwner || isShared) &&
            currentTimelineData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={IndividualPathPageStyles.i_p_p_timeline_item}
                >
                  <TimelineObjComp
                    title={item.title}
                    description={item.description}
                    isEditable={isInEditMode}
                    dataChangeFun={handleInputDataChange}
                    keyindex={index}
                  />
                </div>
              );
            })}
        </div>
        {isOwner ? (
          <div
            className={IndividualPathPageStyles.i_p_p_add_button}
            onClick={() => {
              addNewTimelineObj();
            }}
          >
            <Image src={plusButton} layout="responsive" />
          </div>
        ) : null}
      </div>
      <div className={IndividualPathPageStyles.i_p_p_info_wrapper}>
        <div className={IndividualPathPageStyles.i_p_p_info_sub_wrapper}>
          <div className={IndividualPathPageStyles.i_p_p_buttons_wrapper}>
            {isOwner ? (
              !isInEditMode ? (
                <>
                  <PathDataPageRightPanelButton
                    name="edit"
                    onClickFun={setToEditMode}
                    color="#87F192"
                  />

                  <PathDataPageRightPanelButton
                    name="share"
                    
                    onClickFun={() => {
                      navigator.clipboard.writeText(
                        `https://cuvette-hackthon.vercel.app/p/${Querye}`
                      );
                      alert("Text copied !")
                      
                    }}
                    color="#c5c5c5"
                  />
                </>
              ) : (
                <>
                  <PathDataPageRightPanelButton
                    name="save changes"
                    onClickFun={saveDataChanges}
                    color={isDataChanged ? "#87F192" : "#c5c5c5"}
                  />
                  <PathDataPageRightPanelButton
                    name="reset"
                    onClickFun={resetFun}
                    color="#c5c5c5"
                  />
                </>
              )
            ) : !isShared ? (
              <button
              className={IndividualPathPageStyles.i_p_p_people_list_wrapper}
                onClick={() => {
                  let User = [];
                  getDoc(doc(db, "path", `${Querye}`))
                    .then((snapshot) => {
                      User = snapshot.data() ? snapshot.data()?.user : [];
                    })
                    .then(() => {
                      if(User!=undefined){
                       User.push(Session?.user.email.split("@")[0]);
                      }
                      else{
                        User = [Session?.user.email.split("@")[0]]
                      }
                      console.log(User)
                      setDoc(
                        doc(db, "path", `${Querye}`),
                        {
                          user: User,
                        },
                        { merge: true }
                      ).then(() => {
                        dispatch(Access());
                      });
                    });
                }}
              >
                Add to your paths
              </button>
            ) : null}
          </div>
          <div
            className={IndividualPathPageStyles.i_p_p_people_wrapper}
            style={
              isOwner
                ? {}
                : {
                    marginTop: "0px",
                  }
            }
          >
            <h4 className={IndividualPathPageStyles.i_p_p_people_title}>
              People with access
            </h4>
            <div className={IndividualPathPageStyles.i_p_p_people_list_wrapper}>
              {people &&
                people.map((item, index) => {
                  if(index==0){
                    return(
                      <div
                      key={index}
                      className={IndividualPathPageStyles.i_p_p_person_wrapper}
                    >
                      <div
                        className={
                          IndividualPathPageStyles.i_p_p_person_inner_wrapper
                        }
                      >
                        <div
                          className={
                            IndividualPathPageStyles.i_p_p_person_image
                          }
                        >
                          <Image
                            src={item.image}
                            width={"100%"}
                            height={"100%"}
                            layout="responsive"
                          />
                        </div>
                        <div
                          className={
                            IndividualPathPageStyles.i_p_p_person_name_wrapper
                          }
                          
                        >
                          {item.username} 👑
                        </div>
                      </div>
                    </div>
                    )
                  }
                  else{

                    return (
                      <div
                      key={index}
                      className={IndividualPathPageStyles.i_p_p_person_wrapper}
                    >
                      <div
                        className={
                          IndividualPathPageStyles.i_p_p_person_inner_wrapper
                        }
                      >
                        <div
                          className={
                            IndividualPathPageStyles.i_p_p_person_image
                          }
                        >
                          <Image
                            src={item.image}
                            width={"100%"}
                            height={"100%"}
                            layout="responsive"
                          />
                        </div>
                        <div
                          className={
                            IndividualPathPageStyles.i_p_p_person_name_wrapper
                          }
                        >
                          {item.username}
                        </div>
                      </div>
                    </div>
                  );
                }
                })}
                </div>
                </div>
        </div>
      </div>
      <Navbar userDetails={Session?.user} />
    </div>
  );
}

export default IndividualPathPage;
