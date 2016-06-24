import React, { Component } from 'react'
import SearchBar from '../components/SearchBar.js'
import DataList from '../components/DataList.js'

export default class Search extends Component {
  state = {
    value: '',  // 关键字
    page: 1,    // 页数
    data: [],   // 数据
    sum: '',    // 总数
    time: ''    // 耗时
  }

  render () {
    return (
      <div>
        <SearchBar
          value={this.state.value}
          change={this.change}
          submit={this.submit}
        />
        <DataList
          data={this.state.data}
          sum={this.state.sum}
          time={this.state.time}
        />
      </div>
    )
  }

  change = (e) => {
    let value = e.target.value

    this.setState({
      value: value
    })
  }

  submit = (e) => {
    e.preventDefault()
    let q = this.state.value.trim().replace(new RegExp(' ', 'g'), '+')
    let url = `https://segmentfault.com/search?q=${q}&page=${this.state.page}`

    $.ajax({
      type: 'POST',
      url: '/search',
      data: { url: url },
      success: (data) => {
        this.setState({
          data: data.data,
          sum: data.sum,
          time: data.time
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
