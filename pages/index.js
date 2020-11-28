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
import FormControlLabel from '@material-ui/core/FormControlLabel'

import clsx from 'clsx'
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
  }
}))

const Question = () => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleRadioChange = (event) => {
    setValue(parseInt(event.target.value))
  }

  return (
    <Box className={classes.formcontainer} >
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

const Email = () => {
  const classes = useStyles()
  return (
    <Box className={classes.formcontainer} >
        <Typography className={classes.formtitle} >Your email</Typography>
        <InputBase className={classes.input} type="text" placeholder="you@example.com" />
    </Box>
  )
}

const Submit = () => {
  const classes = useStyles()
  return (
    <Box className={classes.submitcontainer} >
      <ButtonBase className={classes.submitbutton} >Save & Continue</ButtonBase>
    </Box>
  )
}

const Index = () => {
  const classes = useStyles()
  const [email, setEmail] = useState()
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)

  return (
    <Container className={classes.container} maxWidth="lg" >
      <Box className={classes.heading} >
        <Typography className={classes.head} >Discover Your Perspective</Typography>
        <Typography className={classes.description} >Complete the 7 min test and get a detailed report of your lenses on the world.</Typography>
      </Box>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => <Question key={i} />)
      }
      <Email/>
      <Submit/>
    </Container>
  )
}

export default Index
