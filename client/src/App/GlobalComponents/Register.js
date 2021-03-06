import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

const Register = ({
	onKeyDown,
	handleSubmit,
	handlePasswordChange,
	handleSelectChange,
	selectValue,
	validate,
	fnameError,
	lnameError,
	emailError,
	passwordError,
	passwordConfirmError,
	submitError
}) => {
	return (
		<div className="registration-container">
			<h2>Welcome to Bluejay! Glad to have you!</h2>
			{!submitError
				? null
				: <span>A user with that email already exists.</span>}
			<Paper
				style={{
					padding: "4px",

					borderRadius: "3em"
				}}
				zDepth={5}
				rounded={true}
			>
				<div
					style={{
						padding: "20px",
						border: "5px dashed #ccc",
						borderRadius: "3.1em"
					}}
				>
					<h2>Register:</h2>
					{!submitError
						? null
						: <span>A user with that email already exists.</span>}
					<form
						className="registration-form-container"
						onSubmit={handleSubmit}
						onKeyDown={onKeyDown}
					>
						<div>
							<fieldset>
								<legend>Personal Information</legend>
								<TextField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									floatingLabelText="First Name"
									errorText={fnameError}
									id="fname"
									onBlur={validate}
								/>
								<TextField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									floatingLabelText="Last Name"
									errorText={lnameError}
									id="lname"
									onBlur={validate}
								/>
								<SelectField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									floatingLabelText="Title"
									onChange={handleSelectChange}
									value={selectValue}
									id="title"
								>
									<MenuItem value={"Miss"} primaryText="Miss" />
									<MenuItem value={"Mr."} primaryText="Mr." />
									<MenuItem value={"Mrs."} primaryText="Mrs." />
									<MenuItem value={"Ms."} primaryText="Ms." />
								</SelectField>
								<TextField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									type="email"
									floatingLabelText="Email"
									errorText={emailError}
									id="email"
									onBlur={validate}
								/>
							</fieldset>
							<p>
								Already have an account? <Link to="/login">Login</Link>
							</p>
						</div>
						<div>
							<fieldset>
								<legend>Account Credentials</legend>
								<TextField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									type="password"
									floatingLabelText="Password"
									errorText={passwordError}
									id="password"
									onChange={handlePasswordChange}
									onBlur={validate}
								/>
								<TextField
									floatingLabelStyle={{ color: "grey" }}
									underlineFocusStyle={{ borderColor: "#1A8484" }}
									type="password"
									floatingLabelText="Confirm Password"
									errorText={passwordConfirmError}
									id="passwordConfirm"
									onBlur={validate}
								/>
							</fieldset>
							<RaisedButton
								backgroundColor={"#1A8484"}
								labelColor="#FCFCFC"
								style={{ margin: "20px 20px 20px 5px" }}
								label="Create Account"
								type="submit"
							/>
						</div>
					</form>
				</div>
			</Paper>
		</div>
	);
};

export default Register;
