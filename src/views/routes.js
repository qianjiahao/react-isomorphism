import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App.js'
import List from './List.js'
import Item from './Item.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={List} />
    <Route path="/list" component={List} />
    <Route path="/item" component={Item} />
  </Route>
)
