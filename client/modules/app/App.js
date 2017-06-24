import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Helmet
            title="Christensen Wedding 2017 | Amanda Thompson and Erik Christensen"
            titleTemplate="%s"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
