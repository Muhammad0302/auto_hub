import React from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import './i18n';

const children = (
	<Router>
		{/* <React.StrictMode> */}
		<Provider store={store}>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</Provider>
		{/* </React.StrictMode> */}
	</Router>
);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container).render(children); // For React 18

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
