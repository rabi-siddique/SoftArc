import React from "react";
import "./SidebarOption.css";

function SidebarOption(props) {
  return (
    <div className="sidebarOption">
      <props.Icon />
      <h2 className={props.sidebar? `showtext` : `text-remove`}>{props.text}</h2>
    </div>
  );
}

export default SidebarOption;