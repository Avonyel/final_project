import { connect } from "react-redux";
import TeacherNavbar from "../components/TeacherNavbar";

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		displayName: state.user.displayName
	};
};

const TeacherNavbarContainer = connect(mapStateToProps, null)(TeacherNavbar);

export default TeacherNavbarContainer;