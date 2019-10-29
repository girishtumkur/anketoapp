import React from 'react';

//import { qList } from '../state/qlist';
//import { fetchQuestions } from '../facade/qBank';


export class QWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { qIndex: 0, isLoaded: false };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
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
            this.forceUpdate();

        });
    }

   
    confirm(event) {
        if (window.confirm("Are you sure you want to submit answers?")) {
            let email = window.prompt("Enter your Email ID");
            console.log('emailid:', email);
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            //var address = document.getElementById[email].value;
            if (!email=="" && reg.test(email) == false) {
                 email = window.prompt("Please enter  Email ID Correctly");
            }

        }
    }

   
    render() {

        if (!this.state.isLoaded)
            return null;

        let nextStep = this.state.qIndex < this.state.questionList.questions.length - 1 ? true : false;
        let prevStep = this.state.qIndex > 0 ? true : false;

        return <div><h1>Anketo Wizard</h1>
            <h2> {this.state.questionList.questions[this.state.qIndex].qtext} </h2>

            {this.state.questionList.questions[this.state.qIndex].qoptions.map((option) =>
                <div  >
                    <input type="radio" key={this.state.questionList.questions[this.state.qIndex].record_id}
                        name={this.state.questionList.questions[this.state.qIndex].record_id} value={option} checked={option === this.state.questionList.questions[this.state.qIndex].selectedAnswer ? true : false}
                        onChange={this.handleOptions} />
                    <span> {option}</span>
                </div>

            )}
            <div>
                <input type="button" disabled={!prevStep} name="prev" value="prev" onClick={this.handlePrev} />
                <input type="button" disabled={!nextStep} name="next" value="next" onClick={this.handleNext} />
                {nextStep === false ? <input type="button" name="submit" value="submit answerS" onClick={this.confirm} /> : ''}
            </div>
        </div>
    }
}