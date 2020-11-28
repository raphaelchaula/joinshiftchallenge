/* eslint-disable no-unused-vars */
import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  resultcontainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '96px 48px',
    marginTop: theme.spacing(8),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`
  },
  resulttitle: {
    fontSize: 28.0,
    color: '#113264',
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium
  },
  resultdescription: {
    fontSize: 18.0,
    color: '#343A40',
    fontWeight: theme.typography.fontWeightRegular
  },
  score: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  scoretitle: {
    width: 160,
    color: '#878787'
  },
  bar: {
    width: 280,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#E9ECEF',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  barchild: {
    height: 20,
    width: '50%',
    backgroundColor: '#A920CB'
  },
  barchildleft: {
    float: 'left',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  barchildright: {
    float: 'right',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  }
}))

const Bar = ({ side }) => {
  const classes = useStyles()
  return (
        <div className={classes.bar} >
            <div className={clsx(classes.barchild, side === 'right' ? classes.barchildright : classes.barchildleft)} ></div>
        </div>
  )
}

const Score = ({ result }) => {
  const classes = useStyles()

  const scoresTitles = {
    0: ['Introversion (I)', 'Extraversion (E)'],
    1: ['Sensing (S)', 'Intuition (N)'],
    2: ['Thinking (T)', 'Feeling (F)'],
    3: ['Judging (J)', 'Perceiving (P)']
  }
  const resultSplit = result.split('')
  const scoresCouple = ['IE', 'SN', 'TF', 'JP']
  const scores = resultSplit.map((e, i) => {
    const scoreSplit = scoresCouple[i].split('')
    return (
          <div className={classes.score} >
              <Typography className={classes.scoretitle} >{scoresTitles[i][0]}</Typography>
               {
                   scoreSplit[0] === e ? <Bar side="left" /> : <Bar side="right" />
               }
              <Typography className={classes.scoretitle} >{scoresTitles[i][1]}</Typography>
          </div>
    )
  })
  return scores
}

const Result = () => {
  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth="lg" >
      <Box className={classes.resultcontainer} >
        <Box>
            <Typography className={classes.resulttitle} >Your Perspective</Typography>
            <Typography className={classes.resultdescription} >Your Perspective Type is ENTJ</Typography>
        </Box>
        <Box>
            <Score result="ESTP" />
        </Box>
      </Box>
    </Container>
  )
}

export default Result
