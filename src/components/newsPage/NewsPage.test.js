import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {NewsPage} from './NewsPage';


describe('NewsPage', () => {
  let props;

  beforeEach(() => {
    props = {
      newsActions: {
        fetchNews: sinon.spy()
      },
      news: [{
        publishedAt: "2018-02-21T13:42:41Z",
        source: {
          id: null,
          name: "Yahoo.com"
        },
        title: "Albertsons Might Be Buying a Lemon in Rite Aid",
        url: "https://finance.yahoo.com/news/albertsons-might-buying-lemon-rite-225439786.html"
      }],
      filterTypes: [
        "Yahoo.com"
      ]
    };
  });

  it('should call fetch contacts when component is mounted ', () => {
    const wrapper = shallow(<NewsPage {...props}/>);

    expect(props.newsActions.fetchNews.calledOnce).to.be.true;
  });

  it('should render news provided', () => {
    const wrapper = shallow(<NewsPage {...props}/>);

    expect(wrapper.find('.news__list-item')).to.have.length(1);
  });

  it('should not render news button', () => {
    const wrapper = shallow(<NewsPage {...props}/>);

    expect(wrapper.find('.news__show-more-btn')).to.have.length(0);
  });
});
