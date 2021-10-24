import React, { useEffect, useRef } from "react";
import reactDom from "react-dom";

import TimelineObjCompStyles from "./TimelineObjComp.module.css";

import updatedTextareaHeight from "./helpers/text_area_height_updater";

function TimelineObjComp({
  title,
  description,
  isEditable,
  keyindex,
  dataChangeFun,
}) {
  const titleRef = useRef(258);
  const descriptionRef = useRef(258);

  useEffect(() => {
    updatedTextareaHeight(reactDom.findDOMNode(titleRef.current));
    updatedTextareaHeight(reactDom.findDOMNode(descriptionRef.current));
  }, []);

  useEffect(() => {
    console.log(title);
    reactDom.findDOMNode(titleRef.current).value = title;
      updatedTextareaHeight(reactDom.findDOMNode(titleRef.current));
  }, [title]);

  useEffect(() => {
    reactDom.findDOMNode(descriptionRef.current).value = description;
    updatedTextareaHeight(reactDom.findDOMNode(descriptionRef.current));
  }, [description]);

  function handleDataChange() {
    dataChangeFun(keyindex, {
      title: reactDom.findDOMNode(titleRef.current).value,
      description: reactDom.findDOMNode(descriptionRef.current).value,
    });
  }

  return (
    <div className={TimelineObjCompStyles.t_o_primary_wrapper}>
      <div className={TimelineObjCompStyles.t_o_line_wrapper}>
        <div className={TimelineObjCompStyles.t_o_line}></div>
        <div className={TimelineObjCompStyles.t_o_dot}></div>
      </div>
      <div className={TimelineObjCompStyles.t_o_content_wrapper}>
        <textarea
          onChange={(e) => {
            updatedTextareaHeight(e.target);
            handleDataChange();
          }}
          className={TimelineObjCompStyles.t_o_title}
          disabled={!isEditable}
          ref={titleRef}
          defaultValue={title}
        />
        <textarea
          onChange={(e) => {
            updatedTextareaHeight(e.target);
            handleDataChange();
          }}
          className={TimelineObjCompStyles.t_o_description}
          disabled={!isEditable}
          ref={descriptionRef}
          defaultValue={description}
        />
      </div>
    </div>
  );
}

export default TimelineObjComp;
