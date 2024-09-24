const NavIcon = (groupName, groupType) => {
    let srcIconPath = "";
    if (groupType === "status") {
      switch (groupName) {
        case "Todo":
          srcIconPath = "/assets/icons/To-do.svg";
          break;
        case "In Progress":
          srcIconPath = "/assets/icons/in-progress.svg";
          break;
        case "Backlog":
          srcIconPath = "/assets/icons/Backlog.svg";
          break;
        default:
          srcIconPath = "/assets/icons/default-priority.svg";
          break;
      }
    } else if (groupType === "priority") {
        switch (groupName) {
          case "4":
            srcIconPath = "/assets/icons/SVG - Urgent Priority colour.svg";
            break;
          case "3":
            srcIconPath = "/assets/icons/Img - High Priority.svg";
            break;
          case "2":
            srcIconPath = "/assets/icons/Img - Medium Priority.svg";
            break;
          case "1":
            srcIconPath = "/assets/icons/Img - Low Priority.svg";
            break;
          case "0":
            srcIconPath = "/assets/icons/No-Priority.svg";
            break;
          default:
            srcIconPath = "/assets/icons/default-priority.svg";
            break;
        }
    }
    else if (groupType === "userId") {
        srcIconPath = "/assets/icons/actor1.jpg"
    }
  console.log("Icon Path:", srcIconPath);

  return srcIconPath;
  
}

export default NavIcon;