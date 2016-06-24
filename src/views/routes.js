import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App.js'
import Home from './Home.js'
import Detail from './Detail.js'
import Search from './Search.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/detail" component={Detail} />
    <Route path="/search" component={Search} />
  </Route>
)
