import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App.js'
import Home from './Home.js'
import Hero from './Hero.js'
import Heros from './Heros.js'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/heros" component={Heros} />
  </Route>
)
