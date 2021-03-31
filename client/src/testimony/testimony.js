import React from 'react';

import './testimony.scss';

import mock from './mock';
import BackButton from '../backButton/backButton';


class Testimony extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testimony: {},
            toShowTexts: false,
            freeSelection: "",
        }
    }

    componentDidMount() {
        console.log('this.props.history.location.state: ', this.props.history.location.state);
        this.getTestimonyData()
    }

    getTestimonyData = () => {
        const chosenTestimony = this.props.history.location.state.testimony;
        const testimony = mock.find(story => story.id === chosenTestimony.id);
        this.setState({ testimony: testimony });
    }

    onTextChosen = (text) => {
        const template = {
            backgroundImg: this.props.history.location.state.template.backgroundImg,
            text: text
        }
        this.props.history.push({
            pathname: `/textEdit`,
            state:
            {
                template: template
            }
        })
    }


    getTexts = () => {
        return (
            <div className='texts-container'>
                 
                <div className='choose-text-title'> טקסט לבחירה
                <span className='close-icon' onClick={this.openTextsOptions} >X</span>
                </div>
                <div className='optional-texts-container'>
                    {this.state.testimony.optionalTexts.map((text, index) => {
                        return (
                            <button className='optional-text' onClick={() => this.onTextChosen(text)} key={index}>{text}</button>
                        );
                    })}
                    <button className='optional-text free-choice' onClick={this.getFreeChoice}>סימון חופשי</button>
                </div>
            </div>
        );
    }

    getFreeChoice = (event) => {
            //close selection menu "openTextsOptions"
            this.openTextsOptions(event)

            // addEventListener version
            document.addEventListener('selectionchange', this.handelSelectionChange);
    }

    handelSelectionChange = () => {
         //chack text "selection = window.getSelection().toString();"
      const freeSelection = window.getSelection().toString()
      this.setState({freeSelection}) 
    }

   

    openTextsOptions = (event) => {
        this.setState({ toShowTexts: !this.state.toShowTexts })
    }

    render() {
        return (
            <div className='testimony-container'>
                <BackButton history={{...this.props.history}}/>
                <div className='testimony-content'>
                    <h5>שלב 2 מתוך 4 </h5>
                    <h3>בחרו טקסט מעצים והוסיפו אותו טמפלייט שלכם.ן </h3>
                    <div className='contant-title'>{this.state.testimony.title}</div>
                    <div className='content-container'>
                        <div className='content- body'>
                            {this.state.testimony.testimony}
                        </div>
                    </div>
                </div>
                <div className='choose-text'>
                    {this.state.toShowTexts ?
                        this.getTexts() :
                        <React.Fragment>
                            <div className='choose-text-title' onClick={this.openTextsOptions}>מומלצים</div>
                            <div className='choose-text-title' onClick={() => this.onTextChosen(this.state.freeSelection)}>בחירה חופשית</div>

                        </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}

export default Testimony;