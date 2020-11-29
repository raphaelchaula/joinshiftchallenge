import connectDB from '../../middlewares/mongodb'
import Question from '../../models/question'

const handler = async (req, res) => {
  // Get questions from database
  try {
    const questions = await Question.find({}).limit(10)
    return res.status(200).send(questions)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

export default connectDB(handler)
