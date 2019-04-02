import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'

import PropTypes from 'prop-types'
import { AppState } from '@store/app-state'

@inject('appState') @observer

class Course extends React.Component {
  componentDidMount() {
    // do some things
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        课程页面
        {appState.msg}
      </div>
    )
  }
}

Course.propTypes={
  appState: PropTypes.instanceOf(AppState),
}
export default Course
