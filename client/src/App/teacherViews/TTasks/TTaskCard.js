import React from "react";

//components
import Undoable from "../../GlobalComponents/Undoable";
import { Card, CardHeader, CardText } from "material-ui";
import Chip from "material-ui/Chip";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";
import Avatar from "material-ui/Avatar";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

import StudentModal from "./TStudentModal";
import TEditTaskModal from "./TEditTaskModal";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

const rewardsChip = {
  fontWeight: "bold"
};

const DropDownAddReward = ({ rewards, addReward }) => {
  const options = rewards.map(reward => (
    <MenuItem
      key={reward._id}
      onClick={() => addReward(reward._id)}
      primaryText={reward.title}
    />
  ));
  return (
    <IconMenu
      iconButtonElement={
        <i
          style={{ cursor: "pointer" }}
          className="fa fa-plus"
          aria-hidden="true"
        />
      }
    >
      {options}
    </IconMenu>
  );
};

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  //when the edit modal sends an edit add the task id
  onSubmit = taskUpdates =>
    this.props.editTask(this.props.task._id, taskUpdates);

  //what is this
  render() {
    const { _id, title, value, description, classroom } = this.props.task;
    const { students } = this.props;
    let rewards = this.props.task.rewards.map((reward, idx) => {
      return (
        <Chip
          key={idx}
          backgroundColor="#96CD28"
          style={{ margin: "5px" }}
          labelColor="#FFFFFF"
          labelStyle={rewardsChip}
          className="reward-chip"
          onRequestDelete={() => {
            this.props.onRemoveReward(reward._id);
          }}
        >
          <Avatar
            icon={<i class="fa fa-gift" aria-hidden="true" />}
            backgroundColor="#618C0C"
          />
          {reward.title}
        </Chip>
      );
    });

    return (
      <Card
        style={{
          marginBottom: "20px",
          marginLeft: "50px",
          marginRight: "50px"
        }}
        key={_id}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
          title={
            <div>
              <i className={"fa fa-tasks"} />
              {title}
            </div>
          }
          style={{
            backgroundColor: "#1a8484"
          }}
          iconStyle={{ color: "white" }}
          titleStyle={{ color: "white", fontWeight: "bold" }}
          onClick={this.hydrateList}
        />

        <CardText style={{ backgroundColor: "#85dcdc" }} expandable={true}>
          <Paper style={{ padding: "20px" }}>
            <div className="menu-card-container">
              <div>
                <h2>{title}</h2>
                <hr />
                <p>
                  <strong>Description: </strong>
                  <br />
                  <br />
                  {description}
                </p>
              </div>
              <div>
                <StudentModal
                  unAssignAll={this.props.unAssignAll}
                  unAssignOne={this.props.unAssignOne}
                  students={students}
                />

                <div className="menu-card-button-container">
                  <TEditTaskModal
                    open={true}
                    task={this.props.task}
                    onSubmit={this.onSubmit}
                  />
                  <Undoable
                    wait={3}
                    tickDown={true}
                    resolve={() => this.props.deleteTask()}
                  >
                    <RaisedButton
                      style={{ marginLeft: "20px" }}
                      backgroundColor={"#960D0D"}
                      hoverColor="#a71e1e"
                      labelColor="#FCFCFC"
                      label="Delete"
                      icon={
                        <i style={{ color: "white" }} className="fa fa-trash" />
                      }
                    />
                  </Undoable>
                </div>
              </div>
            </div>
          </Paper>
          <Divider />
          <Paper style={{ marginTop: "20px" }}>
            <div className="rewards-chip-container">
              <div className="rewards-chip-header">
                <h3>Rewards Given For Completing This Task</h3>
              </div>
              <div className="rewards-chip-list">
                <div
                  style={{
                    margin: "10px",
                    width: "100%",
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "center"
                  }}
                >
                  <DropDownAddReward
                    rewards={this.props.allRewards}
                    addReward={this.props.onAddReward}
                  />
                </div>
                {rewards}
              </div>
            </div>
          </Paper>
        </CardText>
      </Card>
    );
  }
}

export default TaskCard;
