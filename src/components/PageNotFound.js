import React, { Component } from 'react'

class PageNotFound extends Component {
  render () {
    return (
      <div className="m-h-auto m-t-2 flex-column-center">
        <p className="font-size-7 m-t-0 m-b">404</p>
        <img alt="cute snake illustration" height="150px" src="/images/snake.png" width="150px" />
        <a className="copyright-link m-t-0_5" href="https://www.flaticon.com/free-icons/snake" title="snake icons">Snake icons created by Freepik - Flaticon</a>
        <p className="m-t">Heeheeheee... You found me! SssssSSSss</p>
        <p>But the page you're looking for doesn't exisSssssSSSt. :(</p>
      </div>
    )
  }
}

export default PageNotFound

