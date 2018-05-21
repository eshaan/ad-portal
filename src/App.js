import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SeekAdPortal from './containers/SeekAdPortal/SeekAdPortal';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={SeekAdPortal} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
