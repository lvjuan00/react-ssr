import React from 'react'
import axios from 'axios'
/*eslint-disable */
export default class TestApi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  topics() {
    axios.get('https://cnodejs.org/api/v1/topics')
      .then((resp) => {
        console.log(resp)
      })
  }

  login() {
    axios.post('https://cnodejs.org/api/v1/user/alsotang', {
      accesstoken:'dcf6bff4-ace7-48f8-bbe4-e65c2710807f'
    })
      .then((resp) => {
        console.log(resp)
      })
  }

  markAll() {
    axios.post('https://cnodejs.org/api/v1/message/mark_all?needAccessToken=true')
      .then((resp) => {
        console.log(resp)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.topics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>marAll</button>
      </div>
    )
  }
}
/*eslint-enable */
