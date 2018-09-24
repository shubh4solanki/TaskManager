import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AddTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            notes: '',
            id: null,
            validationState: null
        };
    }

    componentWillReceiveProps(nextProps) {
        const { editTask } = nextProps;
        if(editTask) {
            debugger
            this.setState({
                title: editTask.title || '',
                notes: editTask.notes || '',
                id: editTask.id || null,
                validationState: null
            })
        }
    }

    handleChange(field, value) {
        const {validationState} = this.state;

        if (field === 'title' && value.length > 0 && validationState !== 'success') {
            this.setState({ validationState: 'success' });
        } else if (field === 'title' && value.length === 0 && validationState === 'success') {
            this.setState({ validationState: 'error' });
        }
        this.setState({ [field]: value });
    }

    onAddTask = () => {
        const {onAddTask, handleClose} = this.props;
        const {title, notes, id} = this.state;

        const length = title.length;
        if (length <= 0) {
            this.setState({ validationState: 'error' });
            return null;
        }
        onAddTask && onAddTask({title, notes, id});
        this.setState({title: '', notes: '', id: null });
        handleClose();
    };

    handleClose = () => {
        const {handleClose} = this.props;
        this.setState({title: '', notes: '', id: null });
        handleClose && handleClose();
    };

    render() {
        const {show} = this.props;
        const {validationState, id} = this.state;
        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{id ? 'Edit Task' : 'Add New Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={validationState}
                        >
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.title}
                                placeholder="Enter text"
                                onChange={(e) => this.handleChange('title', e.target.value)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Task Notes</ControlLabel>
                            <FormControl
                                value={this.state.notes}
                                componentClass="textarea"
                                placeholder="Enter notes here"
                                onChange={(e) => this.handleChange('notes', e.target.value)}
                            />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button bsStyle="primary" onClick={this.onAddTask}>{id ? 'Edit' : 'Add'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

