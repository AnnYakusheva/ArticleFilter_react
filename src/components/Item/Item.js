import React, { PureComponent } from 'react'
import './Item.scss'

export default class Item extends PureComponent {
  render() {
    const { data } = this.props

    return (
      <>
        <div className='item'>
          <div className='item-block' key={data.id}>
            <div className='item-block__img'>
              {
                data.thumbnail.includes('http') && (
                <img className='item-img' src={data.thumbnail} alt='img' />)
              }
              </div>
              <div className='item-block__info'>
                <div className='item-title'>
                <div className='item-title__text'>
                  <p className='text'>{data.title}</p>
                </div>
                  <div className='item-title__link'>
                    <a className='item-link' href={data.permalink} target='_blank' rel='noreferrer'>Follow the link</a>
                  </div>
                </div>
                <div className='item-block__comments'>
                  <p>Number of comments: {data.num_comments}</p>
                </div>
              </div>
              
          </div>
        </div> 
      </>
    )
  }
}
