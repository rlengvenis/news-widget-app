import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as newsActions from '../../actions/newsActions';

import DefaultSpinner from '../shared/DefaultSpinner/DefaultSpinner';


export class NewsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterType: ''
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

    return (
      <ul>
        {
          filteredNews.map((newsItem, index) => {
            return (
              <li key={index}>
                <a href={newsItem.url}>{newsItem.title}</a>
                <div>
                  <span>{newsItem.publishedAt}</span>
                  <span>{newsItem.source.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
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
  }

  filterNewsItems(news) {
    const {filterType} = this.state;

    if (filterType) {
      return news.filter(newsItem => newsItem.source.name === filterType);
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