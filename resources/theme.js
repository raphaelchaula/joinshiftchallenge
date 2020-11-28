import { createMuiTheme } from '@material-ui/core/styles'

// Main Theme
const maintheme = createMuiTheme({
  button: {
    borderRadius: 5
  },
  palette: {
    primary: {
      dark: '#0366d6',
      main: '#0070f3',
      light: '#3291ff'
    },
    secondary: {
      main: '#19857b'
    },
    success: {
      main: '#00A079'
    },
    error: {
      main: '#FA4344'
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
    divider: '#E5E5E5'
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1024,
      xl: 1720
    }
  }
})

// Light Theme
const lighttheme = createMuiTheme({
  ...maintheme
})

// Dark Theme
const darktheme = createMuiTheme({
  ...maintheme,
  palette: {
    type: 'dark',
    background: {
      paper: '#121212',
      default: '#121212'
    }
  }
})

export {
  maintheme,
  darktheme,
  lighttheme
}
