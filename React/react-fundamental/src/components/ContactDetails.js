import React from 'react';

export default class ContactDetails extends React.Component {

    render() {
        const selectedDetail = (<div>
             <p>{this.props.contact.name}</p>
             <p>{this.props.contact.phone}</p>
             </div>);
        const blankDetail = (<div></div>)

        return (
            <div>
                <h2>Contact Details.</h2>
                {(this.props.isSelected) ? selectedDetail : blankDetail}
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
