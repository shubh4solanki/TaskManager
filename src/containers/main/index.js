import { connect } from 'react-redux';
import Main from '../../components/main';
import { addNewTask, setTaskCompleted, startTask, editTask } from '../../actions';

const mapStateToProps = (state) => {
    return ({
        tasks: state.tasks,
    })
};

const mapDispatchToProps = (dispatch) => {
    return ({
        addNewTask: (title, notes) => dispatch(addNewTask(title, notes)),
        editTask: (id, title, notes) => dispatch(editTask(id, title, notes)),
        setTaskCompleted: (id) => dispatch(setTaskCompleted(id)),
        startTask: (id) => dispatch(startTask(id)),
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
