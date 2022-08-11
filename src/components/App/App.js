import React from 'react'
import Item from '../Item/Item';
import './App.scss'

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enabledAutoRefresh: false,
      minComments: 0
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    this.setState({
      isLoading: true
    })
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
    .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          items: data.children,
          isLoading: false
        })
      })
  }

  updateAutoRefresh = () => {
    this.setState(
      state => ({
      enabledAutoRefresh: !state.enabledAutoRefresh
    }), () => {
      if (this.state.enabledAutoRefresh) {
        this.autoRefresh = setInterval(this.getItems, 3000)
      } else {
        clearInterval(this.autoRefresh)
      }
    })
    
  }

  updateMinComments = (ev) => {
    this.setState({
      minComments: Number(ev.target.value)
    })
  }

  getItemsByComments = (items, minComments) => 
    items
    .filter(item => item.data.num_comments >= minComments)
    .sort(
      (min,max) => max.data.num_comments - min.data.num_comments)

  render() {
    const { items, isLoading, enabledAutoRefresh, minComments } = this.state;
    const itemsByComments = this.getItemsByComments(items, minComments)

    return (
      <div className='main-page'>
        <div className='container'>
        <div className='header'>
            <div className='headline'>
              <h1 className='title'>Top commented</h1>
            </div>
            <div className='autorefresh'>
              <button 
                className='autorefresh-button'
                type='button' 
                onClick={this.updateAutoRefresh}>
                  {enabledAutoRefresh ? "Stop" : "Start"} auto-refresh
              </button>
            </div>
          </div>
          <div className='current-filter'>
            <p className='current-filter__text text'>Current filter: {minComments}</p>
            <input
              className='current-filter__range'
              type='range' 
              value={minComments} 
              min={0} 
              max={500} 
              step='5' 
              onChange={this.updateMinComments} 
            />
          </div>
          <div className='items'>
          <div className='items__wrap'>
            {isLoading ? (
              <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              ) : itemsByComments.length > 0 ? (
                itemsByComments.map(item => (
                  <Item key={item.data.id} data={item.data} />
                ))
              ) : (
                <p>No results found matching your criteria</p>
            )}
          </div>
          </div>
        </div>
      </div>
    )
  }

}
