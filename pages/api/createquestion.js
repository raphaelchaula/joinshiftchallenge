import connectDB from '../../middlewares/mongodb'
import Question from '../../models/question'
import Counter from '../../models/counter'

const handler = async (req, res) => {
  // Get question from the request query
  const { title, dimension, direction, meaning } = req.query
  if (title && dimension && direction && meaning) {
    try {
      // Get question _id
      const query = { _id: 'QSTN' }
      const update = { $inc: { sequence: 1 } }
      const options = { new: true, upsert: true }
      const counter = await Counter.findOneAndUpdate(query, update, options)
      const _id = counter.sequence
      // New question
      const question = new Question({
        _id,
        title,
        dimension,
        direction,
        meaning
      })
      // Save the question to database
      const response = await question.save()
      return res.status(200).send(response)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  } else {
    res.status(422).send('Question_data_incomplete')
  }
}

export default connectDB(handler)
