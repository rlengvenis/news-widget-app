import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as newsActions from '../../actions/newsActions';

import DefaultSpinner from '../shared/DefaultSpinner/DefaultSpinner';


export class NewsPage extends React.Component {
  componentDidMount() {
    this.props.newsActions.fetchNews();
  }

  render() {
    const {news} = this.props;

    if (!news) {
      return <DefaultSpinner/>
    }

    return (
      <ul>
        {
          news.map(newsItem => {
            return (
              <li>
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
}


const mapStateToProps = (state) => ({
  news: state.newsData.news
});

const mapDispatchToProps = (dispatch) => ({
  newsActions: bindActionCreators(newsActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);