/* eslint-disable no-undef */
import connectDB from '../../middlewares/mongodb'
import Question from '../../models/question'
import Counter from '../../models/counter'
import Answer from '../../models/answer'
import User from '../../models/user'

const handler = async (req, res) => {
  // Check if request method isn't POST
  if (req.method !== 'POST') {
    return res.status(405).send(`Cannot ${req.method} in this route`)
  }
  // Get email & answers from the request body
  const { email, answers } = req.body
  if (email && answers) {
    try {
      // Common options
      const options = { new: true, upsert: true }
      // Counter update
      const counterUpdate = { $inc: { sequence: 1 } }
      // Userid
      let userId
      // Check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        // Get new Uuer _id
        const userQuery = { _id: 'USR' }
        const userCounter = await Counter.findOneAndUpdate(userQuery, counterUpdate, options)
        userId = userCounter.sequence
        // Create user
        const newUser = new User({
          email,
          _id: userId,
          since: new Date()
        })
        // Save new user to database
        await newUser.save()
      }
      // Get answer _id
      const answerQuery = { _id: 'ANS' }
      const answerCounter = await Counter.findOneAndUpdate(answerQuery, counterUpdate, options)
      const answerId = answerCounter.sequence
      // Create answer
      const answerUser = user ? user._id : userId
      const answer = new Answer({
        answers,
        _id: answerId,
        user: answerUser,
        date: new Date()
      })
      // Save the answer to database
      await answer.save()
      // Calculate user MBTI
      // Get questions
      const questions = await Question.find({}).limit(10)
      // Calculate meaning scores
      const scores = calculateMeaningScores(questions, answers)
      // Calculate MBTI result
      const response = calculateMBTIresult(scores)
      return res.status(200).send(response)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  } else {
    return res.status(422).send('Answer_data_incomplete')
  }
}

const calculateMeaningScores = (questions, answers) => {
  const scores = questions.map((q, i) => {
    const answerValue = answers[i + 1]
    const questionDirection = q.direction
    const questionDimension = q.dimension
    if (questionDirection === 1) {
      if (answerValue < 4) {
        return questionDimension.split('')[0]
      }
      if (answerValue > 4) {
        return questionDimension.split('')[1]
      } else {
        return questionDimension.split('')[0] + 'n'
      }
    } else {
      if (answerValue < 4) {
        return questionDimension.split('')[1]
      }
      if (answerValue > 4) {
        return questionDimension.split('')[0]
      } else {
        return questionDimension.split('')[0] + 'n'
      }
    }
  })
  return scores
}

const calculateMBTIresult = (scores) => {
  const dimensions = ['EI', 'SN', 'TF', 'JP']
  const result = dimensions.map(d => {
    const firstMeaning = d.split('')[0]
    const secondMeaning = d.split('')[1]
    const firstScores = scores.filter(e => e === firstMeaning)
    const secondScores = scores.filter(e => e === secondMeaning)
    if (secondScores.length > firstScores.length) {
      return secondMeaning
    } else {
      return firstMeaning
    }
  })
  return result.join('')
}

export default connectDB(handler)
