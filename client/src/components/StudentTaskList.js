import React, { Component } from "react";
import StudentTaskListMenuCard from "./StudentTaskListMenuCard";
import "../styles/TaskList.css";

const TaskList = props => {
  const assignedTasks = props.tasks.filter(
    task => task.status === "AssignedTask"
  );
  const completedTasks = props.tasks.filter(
    task => task.status === "CompletedTask"
  );
  const rejectedTasks = props.tasks.filter(
    task => task.status === "RejectedTask"
  );

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <h3>
        This page is actually working but seeded data doesnt match real data
      </h3>
      {!assignedTasks.length ? null : (
        assignedTasks.map(task => (
          <StudentTaskListMenuCard
            markCompleted={props.markCompleted}
            task={task}
            user={props.user}
          />
        ))
      )}
      {!completedTasks.length ? null : (
        completedTasks.map(task => (
          <div>
            <h1>Completed Tasks</h1>
            <StudentTaskListMenuCard
              markCompleted={props.markCompleted}
              task={task}
              user={props.user}
            />
          </div>
        ))
      )}
      {!rejectedTasks.length ? null : (
        rejectedTasks.map(task => (
          <div>
            <h1>Rejected Tasks</h1>
            <StudentTaskListMenuCard
              markCompleted={props.markCompleted}
              task={task}
              user={props.user}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
