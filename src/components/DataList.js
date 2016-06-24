import React, { Component } from 'react'

export default class DataLsit extends Component {
  static defaultProps = {
    data: [],
    sum: '',
    time: '',
    load: () => {}
  }

  componentDidMount () {
    $(window).scroll((e) => {
      let limit = 100

      let top = document.body.scrollTop
      let rest = document.body.scrollHeight - document.body.clientHeight

      console.log(top,rest - limit)
      if(top >= rest - limit) {
        this.props.load()
      }

    })
  }

  componentWillUnmount () {

  }

  render () {

    const tip = (
      <i className="tip">
        找到约 <span>{this.props.sum}</span> 个结果 耗时约 <span>{this.props.time}</span>s
      </i>
    )

    const avatar = (v) => {
      switch (v.type) {
        case 'widget-question':
          return (
            <div className={"left " + (v.done ? "qa-fixed" : "qa")}>问</div>
          )
        case 'widget-blog':
          return (
            <div className="left blog">博</div>
          )

        case 'widget-user media':
          return (
            <img className="left" src={v.img} />
          )

        default: return null
      }
    }

    const data = this.props.data.map((v, k) => {
      switch (v.type) {
        case 'widget-question':

          return (
            <div key={k} className="item">
              {avatar(v)}
              <div className="right">
                <a className="label" href={v.href}>{v.title}</a>
                <span className="excerpt">{v.excerpt}</span>
              </div>
            </div>
          )

        case 'widget-blog':
          return (
            <div key={k} className="item">
              {avatar(v)}
              <div className="right">
                <a className="label" href={v.href}>{v.title}</a>
                <span className="excerpt">{v.excerpt}</span>
              </div>
            </div>
          )

        case 'widget-user media':
          return (
            <div key={k} className="item">
              {avatar(v)}
              <div className="right">
                <a className="label" href={v.href}>{v.username}</a>
                <span className="muted">{v.muted}</span>
                <div>{v.badge}</div>
              </div>
            </div>
          )

        default: return null
      }
    })
    return (
      <div className="dataList">
        {this.props.data.length ? tip : null}

        {data}
      </div>
    )
  }
}
