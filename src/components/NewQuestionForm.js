import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestionForm extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
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

    this.resetInputValues()
  }

  resetInputValues = () => {
    this.setState(() => ({
        optionOneText: '',
        optionTwoText: ''
    }))
  }

  render () {
    const { optionOneText, optionTwoText } = this.state

    return (
      <div className='new-question'>
        <h1>Create new question</h1>
        <form className='width-33'>
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
      </div>
    )
  }
}

export default connect()(NewQuestionForm)