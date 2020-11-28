/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  questioncontainer: {
    width: '100%',
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
    marginBottom: theme.spacing(1),
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
  }
}))

const Question = () => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleRadioChange = (event) => {
    setValue(parseInt(event.target.value))
  }

  return (
    <Box className={classes.questioncontainer} >
      <Typography className={classes.formtitle} >You consider yourself more practical than creative.</Typography>
      <FormControl className={classes.form} >
        <Typography className={clsx(classes.formlabel, classes.formlabelleft)} >Disagree</Typography>
        <RadioGroup row value={value} onChange={handleRadioChange} aria-label="gender" name="customized-radios" >
          {
            [1, 2, 3, 4, 5, 6, 7].map(e => <FormControlLabel className={classes.radiolabel} value={e} checked={e === value} control={<Radio />} label="" />)
          }
        </RadioGroup>
        <Typography className={clsx(classes.formlabel, classes.formlabelright)} >Agree</Typography>
      </FormControl>
    </Box>
  )
}

const Index = () => {
  const [email, setEmail] = useState()
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
      </Box>
      <Question/>
    </Container>
  )
}

export default Index
