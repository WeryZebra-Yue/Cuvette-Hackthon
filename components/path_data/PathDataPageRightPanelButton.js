import React from "react";

import PathDataPageRightPanelButtonStyles from "./PathDataPageRightPanelButton.module.css";

function PathDataPageRightPanelButton({ name, onClickFun, color }) {
  return (
    <div
      className={PathDataPageRightPanelButtonStyles.p_p_r_b_primary_wrapper}
      onClick={onClickFun}
      style={{
        borderColor: color,
        color: color,
      }}
    >
      {name}
    </div>
  );
}

export default PathDataPageRightPanelButton;
