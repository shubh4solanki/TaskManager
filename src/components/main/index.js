import React, { Component } from 'react';
import './main.css';
import { Button } from 'react-bootstrap';
import AddTaskModal from '../addTaskModal';
import TaskList from '../taskList';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            editTask: null,
        }
    }

    addNewTask = (data) => {
        if(data.id) {
            this.props.editTask(data.id, data.title, data.notes);
            this.setState({ show: false, editTask: null });
        } else {
            this.props.addNewTask(data.title, data.notes);
            this.setState({ show: false, editTask: null });
        }
    };

    openAddNewTaskModal = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false, editTask: null });
    };

    setTaskCompleted = (id) => {
        this.props.setTaskCompleted(id);
    };

    startTask = (id) => {
        this.props.startTask(id);
    };

    onEditTask = (task) => {
        this.setState({ show: true, editTask: task })
    };

    render() {
        const { tasks: {taskList} } = this.props;
        const { editTask } = this.state;
        debugger
        return (
            <div className="title-btn">
                <AddTaskModal
                    show={this.state.show}
                    handleClose={this.handleClose}
                    onAddTask={this.addNewTask}
                    editTask={editTask}
                />
                <Button bsStyle="primary"  onClick={this.openAddNewTaskModal}>Add Task</Button>
                <TaskList
                    tasks={taskList}
                    setTaskCompleted={this.setTaskCompleted}
                    startTask={this.startTask}
                    onEditTask={this.onEditTask}
                />
            </div>
        );
    }
}

export default Main;
