import React, { Component } from 'react'

export default class Search extends Component {
  static defaultProps = {
    value: '',
    change: () => {},
    submit: () => {}
  }

  componentDidMount () {
    this.refs.input.placeholder="Power by Segmentfault.com Search Engine"
  }

  render () {
    return (
      <div className="search">
        <form methods="POST" onSubmit={this.props.submit}>
          <input
            type="text"
            ref="input"
            value={this.props.value}
            onChange={this.props.change}
          />
        </form>
      </div>
    )
  }
}
