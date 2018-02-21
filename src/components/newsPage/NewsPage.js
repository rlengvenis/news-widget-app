import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as newsActions from '../../actions/newsActions';
import DefaultSpinner from '../shared/DefaultSpinner/DefaultSpinner';

import "./NewsPage.css";


const MORE_ITEMS_AMOUNT = 5;

export class NewsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterType: '',
      itemsToShow: 5
    };
  }

  componentDidMount() {
    this.props.newsActions.fetchNews();
  }

  render() {
    const {news} = this.props;

    if (!news) {
      return <DefaultSpinner/>
    }

    return (
      <div>
        <div className="header__section">
          {this.renderFilterSelector()}
        </div>
        <div className="news__section">
          {this.renderNewsList()}
        </div>
      </div>
    );
  }

  renderNewsList() {
    const {news} = this.props;
    const filteredNews = this.filterNewsItems(news);
    const visibleItems = this.getVisibleItems(filteredNews);

    return (
      <div>
        <ul className="news__list">
          {
            visibleItems.map((newsItem, index) => {
              return (
                <li
                  key={index}
                  className="news__list-item"
                >
                  <a
                    className="news__link"
                    href={newsItem.url}
                  >
                    {newsItem.title}
                  </a>
                  <div className="news__details">
                    <span>{newsItem.publishedAt}</span>
                    <span className="news__source">{newsItem.source.name}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {
          filteredNews.length > this.state.itemsToShow && (
            <div className="news__control">
              <button
                className="news__show-more-btn"
                type="button"
                onClick={this.handleShowMoreItems}
              >
                Show more
              </button>
            </div>
          )
        }
      </div>
    );
  }

  renderFilterSelector() {
    return (
      <select onChange={this.handleFilterTypeSelect}>
        <option key={-1} value={-1}>Select filter</option>
        {this.props.filterTypes.map(filterType => {
          return (
            <option key={filterType} value={filterType}>{filterType}</option>
          )
        })}
      </select>
    )
  }

  handleFilterTypeSelect = (e) => {
    this.setState({
      filterType: e.target.value
    });
  };

  handleShowMoreItems = () => {
    this.setState({
      itemsToShow: this.state.itemsToShow + MORE_ITEMS_AMOUNT
    });
  };

  filterNewsItems(news) {
    const {filterType} = this.state;

    if (filterType) {
      return news.filter(newsItem => newsItem.source.name === filterType);
    }

    return news;
  }

  getVisibleItems(news) {
    const {itemsToShow} = this.state;

    if (itemsToShow < news.length) {
      return news.slice(0, itemsToShow);
    }

    return news;
  }
}


const mapStateToProps = (state) => ({
  news: state.newsData.news,
  filterTypes: state.newsData.filterTypes
});

const mapDispatchToProps = (dispatch) => ({
  newsActions: bindActionCreators(newsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);