import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import IndividualPathPageStyles from "./IndividualPathPage.module.css";

import deleteButton from "../../assets/paths/delete.svg";
import plusButton from "../../assets/paths/plus_t.svg";

import Navbar from "../navbar";
import TimelineObjComp from "./TimelineObjComp";
import PathDataPageRightPanelButton from "./PathDataPageRightPanelButton";

import updatedTextareaHeight from "./helpers/text_area_height_updater";
import reactDom from "react-dom";

function IndividualPathPage({
  Session,
  isOwner = true,
  pathData = {
    Title:
      "Web dev learning learning Web dev learning Web dev learning Web dev learning ( FrontEnd )",
    timeline: Array(10).fill({
      title:
        "Lorem Lorem ipsum sit amet, consectetur adipiscing utipsum sit amet, consectetur adipiscing elit. In mauris elementum ut",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris elementum ut parturient. Fringilla vulputate dui at ut sed. Vivamus sollicitudin leo bibendum dolor nunc risus, venenatis id. Imperdiet nibh habitasse nunc tortor consequat bibendum duis eget. \nAmet molestie odio tortor facilisi pellentesque in eget lobortis. Sed malesuada sed sed mauris proin sed purus nascetur ut. Lectus interdum tellus urna aliquam facilisi. Et egestas cursus vel pellentesque. Congue amet consectetur integer sed pulvinar in sollicitudin senectus et.",
    }),
    people: Array(10).fill({
      name: "Abc Xyz",
      image: Session.user.image,
      id: "",
    }),
  },
}) {
  const titleRef = React.useRef(123456);

  const [isInEditMode, setIsInEditMode] = React.useState(false);
  const [isDataChanged, setIsDataChanged] = React.useState(false);
  const [currentTimelineData, setCurrentTimelineData] = React.useState(
    pathData.timeline
  );
  const [currentTitle, setCurrentTitle] = React.useState(pathData.Title);

  useEffect(() => {
    reactDom.findDOMNode(titleRef.current).value = currentTitle;
    updatedTextareaHeight(reactDom.findDOMNode(titleRef.current));
  }, [currentTitle]);

  useEffect(() => {
    setIsDataChanged(
      !(
        currentTimelineData === pathData.timeline ||
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
          {currentTimelineData.map((item, index) => {
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
        <div
          className={IndividualPathPageStyles.i_p_p_add_button}
          onClick={() => {
            addNewTimelineObj();
          }}
        >
          <Image src={plusButton} layout="responsive" />
        </div>
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
                    name="delete"
                    onClickFun={() => {
                      console.log("delete");
                    }}
                    color="#FF5D5D"
                  />
                  <PathDataPageRightPanelButton
                    name="share"
                    onClickFun={() => {
                      console.log("share");
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
              {pathData.people.map((item, index) => {
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
                        className={IndividualPathPageStyles.i_p_p_person_image}
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
                        {item.name}
                      </div>
                    </div>
                    {isOwner ? (
                      <div
                        className={
                          IndividualPathPageStyles.i_p_p_person_removed_button
                        }
                      >
                        <Image
                          src={deleteButton}
                          width={"100%"}
                          height={"100%"}
                          layout="responsive"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Navbar userDetails={Session.user} />
    </div>
  );
}

export default IndividualPathPage;
