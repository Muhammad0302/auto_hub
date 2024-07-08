import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
// import ReactRoundedImage from 'react-rounded-image';
import Icon from '../../components/icon/Icon';

// import Logo from '../../components/Logo';
// import Logo from '../../components/logo/meelu.png';
import Logo from '../../components/logo/Koncept-logo.png';

const Brand = ({ asideStatus, setAsideStatus }) => {
	// Parse cookies data safely
	let data = null;
	try {
		data = Cookies.get('Data') ? JSON.parse(Cookies.get('Data')) : null;
	} catch (error) {
		console.error('Error parsing cookies data:', error);
	}
	const logoUrl = data?.user?.logo_url !== 'NA' ? data?.user?.logo_url : Logo;
	// console.log('the logo url is:', logoUrl);
	return (
		<div className='brand'>
			<div className='brand-logo'>
				<h1 className='brand-title '>
					<Link to='/' aria-label='Logo' alt='Swatti Autos'>
						<img
							alt='Logo'
							width={150}
							// roundedColor='#66A5CC'
							// imageWidth='55'
							// imageHeight='55'
							// roundedSize='5'
							// borderRadius='45'
							// image={Logo}
							src={logoUrl}
						/>
					</Link>
				</h1>
			</div>
			<button
				type='button'
				className='btn brand-aside-toggle'
				aria-label='Toggle Aside'
				onClick={() => setAsideStatus(!asideStatus)}>
				<Icon icon='FirstPage' className='brand-aside-toggle-close' />
				<Icon icon='LastPage' className='brand-aside-toggle-open' />
			</button>
		</div>
	);
};
Brand.propTypes = {
	asideStatus: PropTypes.bool.isRequired,
	setAsideStatus: PropTypes.func.isRequired,
};

export default Brand;
