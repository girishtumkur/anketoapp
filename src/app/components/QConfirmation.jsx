import React from 'react';


export class QConfirmation extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { confirmation: true };
        this.goBack = this.goBack.bind(this);
        this.submitAnswers = this.submitAnswers.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);

    }

    handleEmail(event) {
        const email = event.target.value;
        this.props.handleEmail(email);
       
    }

    handleName(event) {
        const name = event.target.value;
        this.props.handleName(name);
  
    }

    goBack(event) {
        this.props.setQWizard();
    }

    submitAnswers(event) {
        this.props.submitAnswers();
    }

    render() {
        return <div>
            <div>
                <label>Email::
                    <input type="text" name="emailId" value={this.props.email} onChange={this.handleEmail} />
                </label>
            </div>
            <div>
                <label>Name:
                    <input type="text" name="name" value={this.props.name} onChange={this.handleName} />
                </label>
            </div>

            <div>
                <input type="button" name="GoBack" value="GoBack" onClick={this.goBack} />
                <input type="button" name="confirm" value="Confirm Submission" onClick={this.submitAnswers} />
            </div>
        </div>
    }
}