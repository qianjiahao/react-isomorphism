import React, { Component } from 'react'
import SearchBar from '../components/SearchBar.js'
import DataList from '../components/DataList.js'

export default class Search extends Component {
  state = {
    value: '',  // 关键字
    page: 0,    // 页数
    data: [],   // 数据
    sum: '',    // 总数
    time: '',   // 耗时
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
          load={this.load}
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

    this.setState({
      q: encodeURI(q),
      page: 0
    }, () => {
      this.load(this.state.page)
    })
  }

  load = () => {
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {
        q: this.state.q,
        page: ++this.state.page
      },
      success: (data) => {
        this.setState({
          data: data.page == 1 ? data.data : this.state.data.concat(data.data),
          sum: data.sum,
          time: data.time,
          page: data.page
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
