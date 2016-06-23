import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import routes from './views/routes.js'

import './styles/common.css'

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('root')
)
