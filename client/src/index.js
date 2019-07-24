import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { devToolsEnhancer } from 'redux-devtools-extension';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import 'semantic-ui-css/semantic.min.css';


// uri comes from Rails route graphql engine
const client = new ApolloClient({
  uri: "/graphql"
});

const store = createStore(reducers, /* preloadedState, */ devToolsEnhancer(
  // Specify custom devTools options
));

ReactDOM.render(
  <ApolloProvider client={ client }>
    <ApolloHooksProvider client={ client }>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloHooksProvider>,
  </ApolloProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
