import React from "react";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import { red500, yellow500, blue500 } from "material-ui/styles/colors";
import "../../Styles/Notifications.css";
const iconStyles = { marginTop: "25px", color: "#507c0c" };

const getListItemStyle = n => ({
  paddingBottom: "20px",
  border: `2px solid ${n.task
    ? "rgba( 26,132,132,.9)"
    : "rgba(150,205, 40,.9)"}`,
  borderRadius: "20px"
});

const pendingListItemStyle = {
  borderRadius: "20px",
  paddingBottom: "20px"
};

const listItemButtonsStyle = {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center"
};

const notificationDivStyle = {
  margin: "0px 150px 0 200px"
};

const getIcon = n => {
  return (
    <i
      style={{
        ...iconStyles,
        color: n.task ? "#1A8484 " : "#96CD28"
      }}
      className={`${n.task ? "fa fa-tasks" : "fa fa-gift"} fa-2x`}
    />
  );
};

const getButton = (notification, userId, handler, action) => {
  const taskId = notification.task
    ? notification.task.id
    : notification.reward.id;
  const getBackgroundColor = () => {
    if (action === "Accept") {
      return notification.task ? "rgba( 26,132,132,1)" : "rgba(150,205, 40,1)";
    } else {
      return "rgba(220, 43, 43,1)";
    }
  };
  const kind = notification.task ? "task" : "reward";
  return (
    <div>
      <RaisedButton
        backgroundColor={getBackgroundColor()}
        style={{ margin: "5px 15px" }}
        labelColor={"rgb(255,255,255)"}
        label={`${action}`}
        onClick={handler(
          userId,
          notification.owner.id,
          taskId,
          notification._id,
          kind
        )}
      />
    </div>
  );
};

const getActionIcon = type => {
  return (
    <i
      style={{
        ...iconStyles,
        color: type === "confirmed" ? "#96CD28" : "rgba(220, 43, 43,.8)"
      }}
      className={`fa fa-${type === "confirmed"
        ? "check-square-o"
        : "times-rectangle-o"} fa-2x`}
    />
  );
};

const getPendingMainText = (pendingType, n, undo, timeLeft) => (
  <span>
    {`You ${pendingType} this ${n.task ? "task." : "reward."} `}
    <span
      onClick={undo(n._id)}
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Undo?
    </span>
    {`  (${timeLeft} seconds)`}
  </span>
);

const getMainText = n =>
  `${n.owner.profile.fname} ${n.owner.profile.lname} ${n.task
    ? `completed this task:`
    : `redeemed this reward:`}
    ${n.task ? n.task.title : n.reward.title}`;

const getSecondaryText = n =>
  n.task
    ? `Description: ${n.task.description}`
    : `Description: ${n.reward.description}`;

const getHoverColor = n =>
  n.task ? "rgba( 26,132,132,.3)" : "rgba(150,205, 40,.3)";

const isPending = (n, pendingIds) => pendingIds.includes(n._id);

const getPendingData = (n, pendings) => {
  let pendingObj = pendings.filter(p => p.id === n._id)[0];
  return [pendingObj.type, pendingObj.timeLeft];
};

const topMargin = {
  marginTop: "30px",
  position: "relative"
};

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const parseDate = date => {
  const dateArr = date.split("-");
  const dateHeader = months[dateArr[1]]
    .concat(` ${dateArr[2]},`)
    .concat(` ${dateArr[0]}`);
  return (
    <h2
      style={{
        margin: "50px 150px 20px 150px"
      }}
    >
      {dateHeader}
    </h2>
  );
};

const getDateHeader = (n, dates) => {
  let date = n.createdAt.split("T")[0];
  if (!dates.includes(date)) {
    dates.push(date);
    date = parseDate(date);
  } else {
    date = null;
  }
  return date;
};

const Notifications = ({
  notifications,
  takeToItem,
  user,
  acceptEvent,
  rejectEvent,
  pendings,
  undo
}) => {
  let dates = [];
  const pendingIds = pendings.map(p => p.id);

  return (
    <div className="notifications-container">
      <h1>Activity</h1>
      <Paper style={{ padding: "4px", borderRadius: "22px" }}>
        <div className="notifications-container-inner">
          {!notifications.length ? (
            <p className="notifications-none">You have no notifications</p>
          ) : (
            <List>
              {notifications.map(n => {
                let date = getDateHeader(n, dates);

                if (isPending(n, pendingIds)) {
                  const [pendingType, timeLeft] = getPendingData(n, pendings);

                  const pendingListItemProps = {
                    key: n._id,
                    primaryText: getPendingMainText(
                      pendingType,
                      n,
                      undo,
                      timeLeft
                    ),
                    secondaryText: `Leaving the page will make this permanent.`,
                    hoverColor: "lightgrey",
                    secondaryTextLines: 2,
                    leftIcon: getActionIcon(pendingType),
                    style: pendingListItemStyle
                  };

                  return (
                    <div style={topMargin}>
                      {date}
                      <div style={notificationDivStyle}>
                        <ListItem {...pendingListItemProps} />
                      </div>
                    </div>
                  );
                }

                const ListItemProps = {
                  key: n._id,
                  primaryText: getMainText(n),
                  secondaryText: getSecondaryText(n),
                  hoverColor: getHoverColor(n),
                  onClick: takeToItem(n.task, n._id),
                  secondaryTextLines: 2,
                  leftIcon: getIcon(n),
                  style: getListItemStyle(n)
                };

                return (
                  <div style={topMargin}>
                    {date}
                    <div style={notificationDivStyle}>
                      <ListItem {...ListItemProps} />
                      <div style={listItemButtonsStyle}>
                        {getButton(n, user.id, acceptEvent, "Accept")}
                        {getButton(n, user.id, rejectEvent, "Reject")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </List>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Notifications;
