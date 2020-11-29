/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import InputBase from '@material-ui/core/InputBase'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import ButtonBase from '@material-ui/core/ButtonBase'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'

import clsx from 'clsx'
import axios from 'axios'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  heading: {
    width: '100%',
    textAlign: 'left',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4)
  },
  head: {
    fontSize: 20.0,
    color: '#113264',
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  },
  description: {
    fontSize: 18.0,
    color: '#495057',
    fontWeight: theme.typography.fontWeightRegular
  },
  formcontainer: {
    width: '75%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formtitle: {
    width: '60%',
    fontSize: 18.0,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium
  },
  formlabel: {
    fontSize: 16.0,
    fontWeight: theme.typography.fontWeightMedium
  },
  formlabelleft: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main
  },
  formlabelright: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.main
  },
  radiolabel: {
    marginLeft: 8.0,
    marginRight: 8.0
  },
  text: {
    fontSize: 16
  },
  input: {
    height: 48.0,
    width: '60%',
    borderRadius: 5,
    border: '2px solid #AAAAAA',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium
  },
  submitcontainer: {
    height: 180,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitbutton: {
    height: 48,
    width: 240,
    border: 'none',
    fontSize: 18.0,
    borderRadius: 5.0,
    cursor: 'pointer',
    backgroundColor: '#3D59FA',
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium
  },
  dialogTitle: {
    marginTop: theme.spacing(2),
    marginBottom: -theme.spacing(1)
  },
  dialogContent: {
    minWidth: 480,
    marginBottom: -theme.spacing(2)
  },
  loading: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <Box className={classes.loading} >
      <CircularProgress size={60} color="primary" />
    </Box>
  )
}

const Heading = () => {
  const classes = useStyles()
  return (
    <Box className={classes.heading} >
      <Typography className={classes.head} >Discover Your Perspective</Typography>
      <Typography className={classes.description} >Complete the 7 min test and get a detailed report of your lenses on the world.</Typography>
    </Box>
  )
}

const Question = ({ question, answerQuestion }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleRadioChange = (event) => {
    setValue(parseInt(event.target.value))
    answerQuestion(question._id, event.target.value)
  }

  return (
    <Box className={classes.formcontainer} >
      <Typography className={classes.formtitle} >{question.title}</Typography>
      <FormControl className={classes.form} >
        <Typography className={clsx(classes.formlabel, classes.formlabelleft)} >Disagree</Typography>
        <RadioGroup row value={value} onChange={handleRadioChange} aria-label="gender" name="customized-radios" >
          {
            [1, 2, 3, 4, 5, 6, 7].map((e, i) => <FormControlLabel key={i} className={classes.radiolabel} value={e} checked={e === value} control={<Radio />} label="" />)
          }
        </RadioGroup>
        <Typography className={clsx(classes.formlabel, classes.formlabelright)} >Agree</Typography>
      </FormControl>
    </Box>
  )
}

const Email = ({ setEmail }) => {
  const classes = useStyles()
  return (
    <Box className={classes.formcontainer} >
        <Typography className={classes.formtitle} >Your email</Typography>
        <InputBase className={classes.input} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="you@example.com" />
    </Box>
  )
}

const Submit = ({ submitting, handleSubmitAnswers }) => {
  const classes = useStyles()
  return (
    <Box className={classes.submitcontainer} >
      <ButtonBase className={classes.submitbutton} onClick={handleSubmitAnswers} >
        {submitting ? <CircularProgress size={24} color="white" /> : 'Save & Continue'}
      </ButtonBase>
    </Box>
  )
}

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AlertDialog = ({ openDialog, dialogText, dialogTitle, closeDialog }) => {
  const classes = useStyles()
  return (
    <Dialog keepMounted open={openDialog} TransitionComponent={Transition}>
      <DialogTitle className={classes.dialogTitle} >{dialogTitle}</DialogTitle>
      <DialogContent className={classes.dialogContent} >
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  )
}

const Index = () => {
  const classes = useStyles()
  const router = useRouter()

  const [email, setEmail] = useState()
  const [answers, setAnswers] = useState({})
  const [questions, setQuestions] = useState()
  const [dialogText, setDialogText] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  React.useEffect(async () => {
    const qstns = await axios.get('/api/getquestions')
    setQuestions(qstns.data)
  }, [])

  const handleSetAnswer = (question, answer) => {
    const ansrs = answers
    ansrs[question] = parseInt(answer)
    setAnswers(ansrs)
  }

  const handleSetEmail = (value) => {
    setEmail(value)
  }

  const toggleDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleSubmitAnswers = async () => {
    for (let i = 1; i <= 10; i++) {
      if (!answers[i]) {
        setDialogTitle('Answer all questions')
        setDialogText('Please, answer all the questions to complete the test')
        setOpenDialog(true)
        return null
      }
    }
    if (!email) {
      setDialogTitle('Enter your email')
      setDialogText('Please, enter your email to complete the test')
      setOpenDialog(true)
      return null
    }
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setDialogTitle('Enter a valid email')
      setDialogText('Please, enter a valid email to complete the test')
      setOpenDialog(true)
      return null
    }
    setSubmitting(true)
    const body = { email, answers }
    const response = await axios.post('/api/answerquestion', body)
    const score = response.data
    if (score) {
      setEmail()
      setAnswers({})
      setSubmitting(false)
      router.push(`/result/${score.toUpperCase()}`)
    }
  }

  return (
    <Container className={classes.container} maxWidth="lg" >
      {
        questions
          ? <>
            <Heading/>
            { questions.map((question, i) => <Question key={i} question={question} answerQuestion={handleSetAnswer} />)}
            <Email setEmail={handleSetEmail} />
            <Submit submitting={submitting} handleSubmitAnswers={handleSubmitAnswers} />
            <AlertDialog openDialog={openDialog} dialogTitle={dialogTitle} dialogText={dialogText} closeDialog={toggleDialog} />
          </>
          : <Loading/>
      }
    </Container>
  )
}

export default Index
