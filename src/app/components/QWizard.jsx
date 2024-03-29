import React from 'react';
import { QConfirmation } from './QConfirmation'

export class QWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qIndex: 0, isLoaded: false, confirmWizard: false };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.confirm = this.confirm.bind(this);
        this.submitAnswers = this.submitAnswers.bind(this);
        this.setQWizard = this.setQWizard.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleName = this.handleName.bind(this);

    }
    componentDidMount() {
        fetch("http://localhost:7200/qbank/fetchq")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionList: result
                    });
                    console.log('results from react' + result.questions.length);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    handlePrev(event) {
        this.setState((state) => ({
            qIndex: state.qIndex - 1
        }));
    }

    handleNext(event) {
        this.setState((state) => ({
            qIndex: state.qIndex + 1
        }));
    }

    handleOptions(event) {
        const selectedAnswer = event.target.value;
        this.setState((state) => {
            state.questionList.questions[this.state.qIndex].selectedAnswer = selectedAnswer;
            return state;


        });
    }

    handleEmail(email) {
        this.setState((state) => {
            state.email = email;
            return state;
        }
        );
    }

    handleName(name) {
        this.setState((state) => {
            state.name = name;
            return state;
        }
        );
    }

    submitAnswers() {
        alert('incide submit answer');
        const url = "http://localhost:7200/qbank/submitAnswers";
        let data = this.state.questionList;
        data.emailId = this.state.email;
        (async () => {
            try {
                const response = fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrer: 'no-referrer', // no-referrer, *client
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                response.then(function (body) {
                    console.log("GOT response.........finally.", body.json().then(data =>
                        console.log(data)));
                })
            }
            catch (error) {
                console.log(error);
            }
        })();
    }

    setQWizard() {

        this.setState(((state) => {
            state.confirmWizard = false;
            return state;
        }));
        //this.forceUpdate();
    }

    confirm(event) {
        if (window.confirm("Are you sure you want to submit answers?")) {
            this.setState(((state) => {
                state.confirmWizard = true;
                return state;
            }));

        }
    }

    render() {
        if (!this.state.isLoaded)
            return null;

        let nextStep = this.state.qIndex < this.state.questionList.questions.length - 1 ? true : false;
        let prevStep = this.state.qIndex > 0 ? true : false;

        const questionStep = <div> <h2> {this.state.questionList.questions[this.state.qIndex].qtext} </h2>
            {this.state.questionList.questions[this.state.qIndex].qoptions.map((option) =>
                <div  >
                    <input type="radio" key={this.state.questionList.questions[this.state.qIndex].record_id}
                        name={this.state.questionList.questions[this.state.qIndex].record_id} value={option} checked={option === this.state.questionList.questions[this.state.qIndex].selectedAnswer ? true : false}
                        onChange={this.handleOptions} />
                    <span> {option}</span>
                </div>

            )
            }
            <div>
                <input type="button" disabled={!prevStep} name="prev" value="prev" onClick={this.handlePrev} />
                <input type="button" disabled={!nextStep} name="next" value="next" onClick={this.handleNext} />
                {nextStep === false ? <input type="button" name="submit" value="submit answerS" onClick={this.confirm} /> : ''}
            </div>
        </div>;

        return <div><h1>Anketo Wizard</h1>
            {this.state.confirmWizard === true ? <QConfirmation email={this.state.email} name={this.state.name}
                submitAnswers={this.submitAnswers} setQWizard={this.setQWizard} handleEmail={this.handleEmail} handleName={this.handleName} /> : [questionStep]}

        </div>
    }
}