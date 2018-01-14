import React from 'react';

export default class ContactDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit : false,
            name: '',
            phone: ''
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            name: nextProps.contact.name,
            phone: nextProps.contact.phone
        });
    }

    handleKeyPress(e) {
        if (e.charCode === 13) this.onEdit(e);
    }

    toggleEdit() {
        this.setState({
            isEdit : !this.state.isEdit
        });
    }

    onEdit() {
        if (this.state.isEdit) this.props.onEdit(this.state.name, this.state.phone);
        this.toggleEdit();
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }



    render() {
        const selectedDetail = this.state.isEdit ?
            (<div>
                <p>
                    <input 
                        type="text"
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <p>
                    <input 
                        type="text"
                        name="phone" 
                        value={this.state.phone} 
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>) :
            (<div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>);
        const blankDetail = (<div></div>)

        const editLabel = this.state.isEdit ? 'Ok' : 'Edit';

        return (
            <div>
                <h2>Contact Details.</h2>
                {(this.props.isSelected) ? selectedDetail : blankDetail}
                <button onClick={this.onEdit}>{editLabel}</button>
                <button onClick={this.props.onRemove}>Remove</button>
            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: "",
        phone: ""
    }
}
