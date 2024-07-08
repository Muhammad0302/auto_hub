import React from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import ClearCookies from './clearCookies';
import Icon from '../components/icon/Icon';
import showNotification from '../components/extras/showNotification';
import { _titleCustom } from './messages';

// import { demoPages } from '../menu';

const apiClient = axios.create({
	baseURL: 'http://thesfb.live/Autohub_Backend/api',

	// baseURL: 'http://thesfb.live/Ahmed_autos_backend/api',
	// baseURL: 'http://192.168.18.57/Aoun_Autos_BackEnd/api', /// Amir
	//  baseURL: 'http://192.168.18.15/Swatti_Auto_BackEnd/api', /// Faizan
	// baseURL: 'http://192.168.18.143/Swatti_Auto_BackEnd/api', /// Moheed
	// baseURL: 'http://192.168.18.143/Swatti_Auto_BackEnd/api', /// production
	// baseURL: 'http://thesfb.live/Swatti_Auto_BackEnd/api',

	// baseURL: 'http://thesfb.live/Ahmed_autos_backend/api',
	// baseURL: 'http://192.168.18.57/Aoun_Autos_BackEnd/api', /// Amir
	//  baseURL: 'http://192.168.18.15/Swatti_Auto_BackEnd/api', /// Faizan
	// baseURL: 'http://192.168.18.91/Swatti_Auto_BackEnd/api', // Husnain
	// baseURL: 'http://192.168.18.128/Swatti_Auto_BackEnd/api', // Hashim
	// baseURL: 'http://localhost/Swatti_Auto_BackEnd/api',

	// baseURL: "https://swatti.konceptsoftwares.com/api", // new by amir

	// timeout: 900000,
	// headers: {
	// 	Authorization: `Bearer ${Cookies.get('userToken')}`,
	// },
});

const _titleError = (
	<span className='d-flex align-items-center'>
		<Icon icon='Info' size='lg' className='me-1' />
		<span>Error Saving Record </span>
	</span>
);
apiClient.interceptors.request.use(
	(config) => {
		const token = Cookies.get('userToken'); // Replace with your token retrieval logic
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);
apiClient.interceptors.response.use(
	(response) => {
		const customRes = {
			...response,
			color: response.data.status === 'ok' ? 'success' : 'danger',
			icon: response.data.status === 'ok' ? 'Done' : 'warning',
			title: response.data.status === 'ok' ? 'Success' : 'Error',
		};
		if (response.config.method === 'post' || response.config.method === 'delete') {
			showNotification(
				_titleCustom({ title: customRes.title, icon: customRes.icon }),
				customRes.data.message,
				customRes.color,
			);
		}

		return customRes;
	},

	(error) => {
		try {
			const errorMessage = error.response.data.message;
			if (
				/token has expired/i.test(errorMessage) ||
				/The token could not be parsed from the request/i.test(errorMessage) ||
				/the token has been blacklisted/i.test(errorMessage)
			) {
				ClearCookies();
				showNotification(_titleError, error.response.data.message, 'danger');

				// Redirect user to login page
				// window.location.href = '/RehbarSociety/auth-pages/login';
			} else if (/Too Many Attempts./i.test(errorMessage)) {
				showNotification(
					_titleError,
					`${error.response.data.message} Please Wait`,
					'danger',
				);
			}
		} catch (err) {
			// console.log('err interceptor Catch', err);
			// handle errors that occur during error handling
			showNotification(_titleError, err.message, 'danger');
		}
		return Promise.reject(error);
	},
);

export default apiClient;
