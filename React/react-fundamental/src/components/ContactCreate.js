import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            phone : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }

    handleClick() {
        this.props.onCreate(this.state);
        this.state = {
            name: '',
            phone: ''
        }
    }

    render () {
        return (
            <div>
                <h2>Contact Creator</h2>
                <p>
                    <input 
                        type="text"
                        placeholder="name"
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="phone"
                        name="phone" 
                        value={this.state.phone} 
                        onChange={this.handleChange}
                    />
                </p>
                <button onClick={this.handleClick}>Create Contact</button>
            </div>
        );
    }
}

ContactCreate.defaultProps = {
    onCreate: () => { console.log('onCreate not defined.') }
}