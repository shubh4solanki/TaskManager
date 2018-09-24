import React, { Component } from 'react';
import { Panel, PanelGroup, Button, Glyphicon } from 'react-bootstrap';
import './taskList.css';

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: new Date(),
        }
    };

    componentDidMount() {
        setInterval( () => {
            this.setState({
                curTime : new Date()
            })
        },1000)
    }

    onTaskComplete = (taskId) => {
        let { setTaskCompleted } = this.props;
        setTaskCompleted && setTaskCompleted(taskId);
    };

    renderButtons = (task) => {
        if(task.completed)  return null;

        if(task.startTime) {
            let { curTime } = this.state;
            return (
                <Button className={"btn_time"} disabled>{this.getTimeDuration(task.startTime, curTime)}</Button>
            )
        } else {
            let { startTask } = this.props;
            return <Button className={"btn_teb"} onClick={() => startTask(task.id)}>Start Task</Button>;
        }
    };

    getTimeDuration(startTime, endTime) {
        const difference = endTime - startTime;

        const hour = parseInt(difference / 1000 / 60 / 60);
        const minutes = parseInt(difference / 1000 / 60);
        const secconds = parseInt(difference / 1000);
        return `${hour} : ${minutes} : ${secconds}`;
    }

    renderTasks = () => {
        let { tasks, onEditTask } = this.props;

        return tasks.map(task => {
            const bsStyle = task.completed ? 'success'
                : task.startTime ? 'primary' : 'info';
            return (
                <div className='task-container' key={task.id}>
                    <Panel bsStyle={bsStyle} eventKey={task.id}>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3" toggle>{task.title}</Panel.Title>

                            {this.renderButtons(task)}

                            <Button
                                className={"btn_teb"}
                                disabled={task.completed}
                                onClick={() => this.onTaskComplete(task.id)}>
                                {task.completed ? <Glyphicon glyph="ok" /> : null}
                                {task.completed ? 'Completed' : 'Complete'}
                            </Button>
                            {!task.completed && <Button className={"btn_teb"} onClick={() => onEditTask(task)}>
                                <Glyphicon glyph="pencil"/>
                            </Button>
                            || null
                            }

                        </Panel.Heading>
                        <Panel.Body collapsible className='data'>
                            <span>
                                Notes:
                                <plaintext className="notes">{task.notes}</plaintext>
                            </span>
                            <p>
                                {task.startTime
                                    ? `Task Start Time: ${task.startTime.toLocaleString()}`
                                    : null}
                            </p>
                            <p>
                                {task.endTime
                                    ? `Task End Time: ${task.endTime.toLocaleString()}`
                                    : null}
                            </p>
                            <p>
                                {task.startTime && task.endTime
                                    ? `Time Duration for task: ${this.getTimeDuration(task.startTime, task.endTime)}`
                                    : null}
                            </p>
                        </Panel.Body>
                    </Panel>
                </div>
            )
        })
    };

    render() {
        return (
            <div>
                <PanelGroup
                    accordion
                    id="accordion-uncontrolled-example">
                {this.renderTasks()}
                </PanelGroup>
            </div>
        );
    }
}