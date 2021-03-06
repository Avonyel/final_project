import React from "react";

//components
import Editable from "../../GlobalComponents/Editable";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class TEditRewardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      valid: true,
      description: this.props.reward.description,
      kind: this.props.reward.kind,
      cost: this.props.reward.cost,
      value: this.props.reward.value
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { description, kind, cost, value } = this.state;
    if (this.state.valid)
      this.props.onSubmit({
        description: description.trim(),
        kind,
        cost,
        value
      });

    this.setState({
      open: false
    });
  };
  handleChange = (e, index, value) => {
    this.setState({ kind: value });
  };
  validate = () => {
    if (this.state.description.length > 0) {
      this.setState({ valid: true });
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validate());
  };

  handleCancel = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const actions = [
      <RaisedButton
        label="Save"
        disabled={!this.state.valid}
        onClick={this.handleClose}
        backgroundColor={"#96CD28"}
        icon={<i style={{ color: "black" }} className="fa fa-save" />}
      />,
      <RaisedButton
        label="Cancel"
        backgroundColor={"#960D0D"}
        labelColor="#FCFCFC"
        icon={<i style={{ color: "white" }} className="fa fa-times" />}
        onClick={this.handleCancel}
      />
    ];
    let costOrValue;
    if (this.props.reward.kind === "LootReward") {
      costOrValue = (
        <TextField
          floatingLabelStyle={{ color: "grey" }}
          underlineFocusStyle={{ borderColor: "#96CD28" }}
          onChange={this.onChange}
          value={this.state.value}
          floatingLabelText="Value"
          name="value"
        />
      );
    } else {
      costOrValue = (
        <TextField
          floatingLabelStyle={{ color: "grey" }}
          underlineFocusStyle={{ borderColor: "#96CD28" }}
          onChange={this.onChange}
          value={this.state.cost}
          floatingLabelText="Cost"
          name="cost"
        />
      );
    }

    return (
      <div>
        <RaisedButton
          label="Edit"
          backgroundColor={"#96CD28"}
          labelColor={"black"}
          icon={<i style={{ color: "black" }} className="fa fa-edit" />}
          onClick={this.handleOpen}
        />
        <Dialog
          title="Edit your reward"
          actions={actions}
          actionsContainerStyle={{
            display: "flex",
            flexDirection: "row",
            margin: "10px",
            justifyContent: "space-evenly"
          }}
          modal={true}
          open={this.state.open}
          style={{ color: "#97cb39" }}
        >
          <Paper style={{ padding: "20px", border: "3px solid #97cb39" }}>
            <TextField
              onChange={this.onChange}
              value={this.state.description}
              floatingLabelStyle={{ color: "grey" }}
              underlineFocusStyle={{ borderColor: "#96CD28" }}
              floatingLabelText="Description"
              fullWidth={true}
              multiLine={true}
              name="description"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              {costOrValue}
              <SelectField
                floatingLabelText="Kind"
                value={this.state.kind}
                floatingLabelStyle={{ color: "grey" }}
                underlineFocusStyle={{ borderColor: "#97cb39" }}
                selectedMenuItemStyle={{ color: "#97cb39" }}
                onChange={this.handleChange}
              >
                <MenuItem value={"LootReward"} primaryText="Loot" />
                <MenuItem value={"PointReward"} primaryText="Point" />
              </SelectField>
            </div>
          </Paper>
        </Dialog>
      </div>
    );
  }
}
