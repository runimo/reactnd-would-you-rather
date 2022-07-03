import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestionForm extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    showSuccessMessage: false
  }

  handleChange = (e, prop) => {
    const value = e.target.value
    this.setState(() => ({
      [prop]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    const question = {
      optionOneText,
      optionTwoText
    }

    dispatch(handleAddQuestion(question))

    this.setState(() => ({
      showSuccessMessage: true
    }))
    this.resetInputValues()
  }

  handleToggle = (e) => {
    this.setState(() => ({
      showSuccessMessage: false
    }))
  }

  resetInputValues = () => {
    this.setState(() => ({
        optionOneText: '',
        optionTwoText: ''
    }))
  }

  render () {
    const { optionOneText, optionTwoText, showSuccessMessage } = this.state

    return (
      <div className='new-question'>
        {!showSuccessMessage &&
          <div className="question-container">
            <h1>Create new question</h1>
            <form>
              <fieldset className='flex-column'>
                <legend className='m-b-0_5'>Would you rather...</legend>
                <div className='width-100'>
                  <label className='sr-only' htmlFor='optionOne'>Option one</label>
                  <input type='text' id='optionOne' className='width-100' onChange={e => this.handleChange(e, 'optionOneText')} placeholder='Enter option one here' value={optionOneText} />
                </div>
                <div className='m-t-0_5 font-size-small flex-item-center'>
                  OR
                </div>
                <div className='width-100 m-t-0_5'>
                  <label className='sr-only' htmlFor='optionTwo'>Option two</label>
                  <input type='text' id='optionTwo' className='width-100' onChange={e => this.handleChange(e, 'optionTwoText')} placeholder='Enter option two here' value={optionTwoText} />
                </div>
                <button type='submit' className="btn btn-primary width-100 m-t" onClick={e => this.handleSubmit(e)} disabled={optionOneText === '' && optionTwoText === ''}>Submit</button>
              </fieldset>
            </form>
          </div>}
        {showSuccessMessage &&
          <div className="question-container question-success">
            <div className="m-b">
              <img alt="confetti icon with a happy face" className="question-success-icon" height="150px" src="/icons/confetti.png" width="150px" />
              <a className="copyright-link" href="https://www.flaticon.com/free-icons/confetti" title="confetti icon">Confetti icon created by Freepik - Flaticon</a>
            </div>
            <div className="m-t">
              Question was successfully created!
            </div>
            <button className="btn btn-primary width-100 m-t" onClick={e => this.handleToggle(e)}>Create another question</button>
          </div>}
      </div>
    )
  }
}

export default connect()(NewQuestionForm)