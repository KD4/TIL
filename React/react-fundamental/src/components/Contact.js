import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-1001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };
        this.handleChange = this.handleChange.bind(this); // 메소드 바인딩
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const contactData = localStorage.contactData;
        if (contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    handleRemove() {
        if (this.state.selectedKey < 0) return 0;

        this.setState({
            contactData: update(this.state.contactData, {
                $splice: [[this.state.selectedKey, 1]]
            }),
            selectedKey: -1
        })
    }

    handleEdit(editedName, editedPhone) {
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey] : {
                    name: { $set : editedName },
                    phone: { $set : editedPhone }
                }
            })
        })
        
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, {
                $push: [contact],
            })
        });
    }


    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({selectedKey: key});
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter((contact) => {
              return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });

            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)} />);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input name="keyword" value={this.state.keyword} placeholder="Search" onChange={this.handleChange}/>
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails 
                    isSelected={(this.state.selectedKey != -1)} 
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                ></ContactDetails>
                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}

