import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Course from '../views/course/index'
import Resource from '../views/resource/index'
import Test from '../views/test/index'

export default () => [
  <Route path="/" component={() => <Redirect to="/course" />} exact key="index" />,
  <Route path="/course" component={Course} exact key="course" />,
  <Route path="/resource" component={Resource} exact key="resource" />,
  <Route PATH="/test" component={Test} exact key="test" />
]
