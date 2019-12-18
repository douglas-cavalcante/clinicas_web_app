import React from 'react';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import ContentWrapper from './components/ContentWrapper';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Wrapper>
            <ToastContainer autoClose={3000} />
            <Navbar />
            <ContentWrapper>
              <Routes />
            </ContentWrapper>
          </Wrapper>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
