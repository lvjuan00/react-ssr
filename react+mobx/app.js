import React from 'react'
import ReactDOM from 'react-dom'
import App from '@views/App'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import appState from '@store/app-state'

// ReactDOM.hydrate(<App />, document.getElementById('root'))
const root = document.getElementById('root')
const renderWithHotReplace = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
renderWithHotReplace(App)

if (module.hot) {
  module.hot.accept('./client/views/App.jsx', () => {
    const NextApp = require('./client/views/App.jsx').default //eslint-disable-line
    // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
    renderWithHotReplace(NextApp)
  })
}
