import React from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { useNavigate } from 'react-router-dom'

const NewQuestionForm = ({ dispatch, questions }) => {
  let navigate = useNavigate()
  let [duplicateQuestionId, setDuplicateQuestionId] = React.useState(null)
  let [optionOneText, setOptionOneText] = React.useState('')
  let [optionTwoText, setOptionTwoText] = React.useState('')
  let [showErrorMessage, setShowErrorMessage] = React.useState(false)
  let [showSuccessMessage, setShowSuccessMessage] = React.useState(false)

  const checkIfQuestionExists = (question) => {
    const identicalQuestion = Object.values(questions)
      .find(q => q.optionOne.text === question.optionOneText && q.optionTwo.text === question.optionTwoText)
    if (identicalQuestion) {
      setDuplicateQuestionId(identicalQuestion.id)
    }

    return !!identicalQuestion
  }

  const goToQuestion = (e) => {
    e.preventDefault()
    navigate(`/question/${duplicateQuestionId}`)
  }

  const handleChange = (e, prop) => {
    const value = e.target.value
    if (prop === 'optionOneText') {
      setOptionOneText(value)
    } else {
      setOptionTwoText(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const question = {
      optionOneText,
      optionTwoText
    }
    console.log('question', question)

    const questionExists = checkIfQuestionExists(question)
    console.log('questionExists', questionExists)

    if (!questionExists) {
      dispatch(handleAddQuestion(question))

      setShowSuccessMessage(true)
    } else {
      setShowErrorMessage(true)
    }


    resetInputValues()
  }

  const handleToggle = (e) => {
    setShowSuccessMessage(false)
  }

  const resetInputValues = () => {
    setOptionOneText('')
    setOptionTwoText('')
  }

  return (
    <div className='new-question'>
      {!showSuccessMessage && !showErrorMessage &&
        <div className="question-container">
          <h1>Create new question</h1>
          <form>
            <fieldset className='flex-column'>
              <legend className='m-b-0_5'>Would you rather...</legend>
              <div className='width-100'>
                <label className='sr-only' htmlFor='optionOne'>Option one</label>
                <input type='text' id='optionOne' className='width-100' onChange={e => handleChange(e, 'optionOneText')} placeholder='Enter option one here' value={optionOneText} />
              </div>
              <div className='m-t-0_5 font-size-small flex-item-center'>
                OR
              </div>
              <div className='width-100 m-t-0_5'>
                <label className='sr-only' htmlFor='optionTwo'>Option two</label>
                <input type='text' id='optionTwo' className='width-100' onChange={e => handleChange(e, 'optionTwoText')} placeholder='Enter option two here' value={optionTwoText} />
              </div>
              <button type='submit' className="btn btn-primary width-100 m-t" onClick={e => handleSubmit(e)} disabled={optionOneText === '' && optionTwoText === ''}>Submit</button>
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
          <button className="btn btn-primary width-100 m-t" onClick={e => handleToggle(e)}>Create another question</button>
        </div>}
      {showErrorMessage &&
        <div className="question-container flex-column-center">
          <img className="m-t-0_75" alt="star icon with a happy face" height="150px" src="/icons/stars.png" width="150px" />
          <a className="copyright-link m-t-0_75" href="https://www.flaticon.com/free-icons/glitter" title="glitter icons">Glitter icons created by Freepik - Flaticon</a>
          <div className="m-t text-align-center">
            That question already exists.
            <button className="btn btn-primary width-100 m-t" onClick={e => goToQuestion(e)}>Go answer it now!</button>
          </div>
        </div>
      }
    </div>
  )
  }

function mapStateToProps ({ questions }) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(NewQuestionForm)