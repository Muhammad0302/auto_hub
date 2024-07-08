// import React, { useContext, useRef, useState } from 'react';
// import classNames from 'classnames';
// import { motion } from 'framer-motion';
// import { useTranslation } from 'react-i18next';
// import Brand from '../Brand/Brand';
// import Navigation, { NavigationLine } from '../Navigation/Navigation';
// import User from '../User/User';
// // eslint-disable-next-line no-unused-vars
// import {
// 	componentsMenu,
// 	demoPages,
// 	layoutMenu,
// 	dashboardHome,
// 	accountsModule,
// 	itemsManagementModule,
// 	// kitModule,
// 	inventoryModule,
// 	salesModule,
// 	transferModule,
// 	suppliersModule,
// 	storesModule,
// 	customersModule,
// 	reportModule,
// 	expenseModule,
// 	rolesAdmin,
// } from '../../menu';
// import ThemeContext from '../../contexts/themeContext';
// import Card, { CardBody } from '../../components/bootstrap/Card';

// import Hand from '../../assets/img/hand.png';
// import HandWebp from '../../assets/img/hand.webp';
// // import Icon from '../../components/icon/Icon';
// import Button from '../../components/bootstrap/Button';
// import Tooltips from '../../components/bootstrap/Tooltips';
// import useDarkMode from '../../hooks/useDarkMode';
// import useAsideTouch from '../../hooks/useAsideTouch';

// const Aside = () => {
// 	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

// 	const { asideStyle, touchStatus, hasTouchButton, asideWidthWithSpace, x } = useAsideTouch();

// 	const isModernDesign = process.env.REACT_APP_MODERN_DESGIN === 'true';

// 	const constraintsRef = useRef(null);

// 	const [doc, setDoc] = useState(false);

// 	const { t } = useTranslation(['translation', 'menu']);

// 	const { darkModeStatus } = useDarkMode();

// 	return (
// 		<>
// 			<motion.aside
// 				style={asideStyle}
// 				className={classNames(
// 					'aside',
// 					{ open: asideStatus },
// 					{
// 						'aside-touch-bar': hasTouchButton && isModernDesign,
// 						'aside-touch-bar-close': !touchStatus && hasTouchButton && isModernDesign,
// 						'aside-touch-bar-open': touchStatus && hasTouchButton && isModernDesign,
// 					},
// 				)}>
// 				<div className='aside-head'>
// 					<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
// 				</div>
// 				<div className='aside-body'>
// 					<Navigation menu={dashboardHome} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={itemsManagementModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					{/* <Navigation menu={kitModule} id='aside-dashboard' /> */}
// 					{/* <NavigationLine /> */}
// 					<Navigation menu={inventoryModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={salesModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={transferModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={suppliersModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={customersModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={storesModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={reportModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={expenseModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={accountsModule} id='aside-dashboard' />
// 					<NavigationLine />
// 					<Navigation menu={rolesAdmin} id='aside-dashboard' />
// 					<NavigationLine />
// 					{/* <Navigation menu={dashboardMenu} id='aside-dashboard' /> */}
// 					{doc && (
// 						<>
// 							<NavigationLine />
// 							<Navigation menu={demoPages} id='aside-demo-pages' />
// 							<NavigationLine />
// 							<Navigation menu={layoutMenu} id='aside-menu' />
// 						</>
// 					)}

// 					{doc && (
// 						<>
// 							<NavigationLine />
// 							<Navigation menu={componentsMenu} id='aside-menu-two' />
// 							<NavigationLine />
// 						</>
// 					)}

// 					{asideStatus && doc && (
// 						<Card className='m-3 '>
// 							<CardBody className='pt-0'>
// 								<img
// 									srcSet={HandWebp}
// 									src={Hand}
// 									alt='Hand'
// 									width={130}
// 									height={130}
// 								/>
// 								<p
// 									className={classNames('h4', {
// 										'text-dark': !darkModeStatus,
// 										'text-light': darkModeStatus,
// 									})}>
// 									{t('Everything is ready!')}
// 								</p>
// 								<Button
// 									color='info'
// 									isLight
// 									className='w-100'
// 									onClick={() => setDoc(false)}>
// 									{t('Demo Pages')}
// 								</Button>
// 							</CardBody>
// 						</Card>
// 					)}
// 				</div>
// 				<div className='aside-foot'>
// 					<nav aria-label='aside-bottom-menu'>
// 						{/* <div className='navigation'>
// 							<div
// 								role='presentation'
// 								className='navigation-item cursor-pointer'
// 								onClick={() => {
// 									setDoc(!doc);
// 								}}
// 								data-tour='documentation'>
// 								<span className='navigation-link navigation-link-pill'>
// 									<span className='navigation-link-info'>
// 										<Icon
// 											icon={doc ? 'ToggleOn' : 'ToggleOff'}
// 											color={doc ? 'success' : null}
// 											className='navigation-icon'
// 										/>
// 										<span className='navigation-text'>
// 											{t('menu:Documentation')}
// 										</span>
// 									</span>
// 									<span className='navigation-link-extra'>
// 										<Icon
// 											icon='Circle'
// 											className={classNames(
// 												'navigation-notification',
// 												'text-success',
// 												'animate__animated animate__heartBeat animate__infinite animate__slower',
// 											)}
// 										/>
// 									</span>
// 								</span>
// 							</div>
// 						</div> */}
// 					</nav>
// 					<User />
// 				</div>
// 			</motion.aside>
// 			{asideStatus && hasTouchButton && isModernDesign && (
// 				<>
// 					<motion.div className='aside-drag-area' ref={constraintsRef} />
// 					<Tooltips title='Toggle Aside' flip={['top', 'right']}>
// 						<motion.div
// 							className='aside-touch'
// 							drag='x'
// 							whileDrag={{ scale: 1.2 }}
// 							whileHover={{ scale: 1.1 }}
// 							dragConstraints={constraintsRef}
// 							// onDrag={(event, info) => console.log(info.point.x, info.point.y)}
// 							dragElastic={0.1}
// 							style={{ x, zIndex: 1039 }}
// 							onClick={() => x.set(x.get() === 0 ? asideWidthWithSpace : 0)}
// 						/>
// 					</Tooltips>
// 				</>
// 			)}
// 		</>
// 	);
// };

// export default Aside;

import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Brand from '../Brand/Brand';
import Navigation, { NavigationLine } from '../Navigation/Navigation';
import User from '../User/User';
// eslint-disable-next-line no-unused-vars
import {
	componentsMenu,
	demoPages,
	layoutMenu,
	dashboardHome,
	accountsModule,
	itemsManagementModule,
	// kitModule,
	inventoryModule,
	salesModule,
	// transferModule,
	suppliersModule,
	// storesModule,
	customersModule,
	reportModule,
	expenseModule,
	rolesAdmin,
	// packagesModule,
} from '../../menu';
import ThemeContext from '../../contexts/themeContext';
import Card, { CardBody } from '../../components/bootstrap/Card';

import Hand from '../../assets/img/hand.png';
import HandWebp from '../../assets/img/hand.webp';
// import Icon from '../../components/icon/Icon';
import Button from '../../components/bootstrap/Button';
import Tooltips from '../../components/bootstrap/Tooltips';
import useDarkMode from '../../hooks/useDarkMode';
import useAsideTouch from '../../hooks/useAsideTouch';

const Aside = () => {
	const role = Cookies.get('role_id');
	// console.log(Cookies.get('role_id'));
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const { asideStyle, touchStatus, hasTouchButton, asideWidthWithSpace, x } = useAsideTouch();

	const isModernDesign = process.env.REACT_APP_MODERN_DESGIN === 'true';

	const constraintsRef = useRef(null);

	const [doc, setDoc] = useState(false);

	const { t } = useTranslation(['translation', 'menu']);

	const { darkModeStatus } = useDarkMode();

	let data;
	try {
		const dataString = Cookies.get('Data');
		data = dataString ? JSON.parse(dataString) : null;
	} catch (error) {
		console.error('Failed to parse cookie data:', error);
		data = null;
	}

	const features = data?.package_features?.split(', ') || [];
	// console.log('The features is:', features);

	return (
		<>
			<motion.aside
				style={asideStyle}
				className={classNames(
					'aside',
					{ open: asideStatus },
					{
						'aside-touch-bar': hasTouchButton && isModernDesign,
						'aside-touch-bar-close': !touchStatus && hasTouchButton && isModernDesign,
						'aside-touch-bar-open': touchStatus && hasTouchButton && isModernDesign,
					},
				)}>
				<div className='aside-head'>
					<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
				</div>
				<div className='aside-body'>
					{role === '3' && (
						<>
							<Navigation menu={inventoryModule} id='aside-dashboard' />
							<NavigationLine />
							<Navigation menu={salesModule} id='aside-dashboard' />
							<NavigationLine />
							{/* <Navigation menu={accountsModule} id='aside-dashboard' /> */}
							{/* <Navigation
								menu={{
									accountsHeading: accountsModule.accountsHeading,
									vouchers: accountsModule.vouchers,
									viewTransactions: accountsModule.viewTransactions
								}}
								id='aside-dashboard'
							/> */}
							<Navigation
								menu={{
									...accountsModule,
									accounts: {
										...accountsModule.accounts,
										subMenu: {
											dailyClosing:
												accountsModule.accounts.subMenu.dailyClosing,
										},
									},
								}}
								id='aside-dashboard'
							/>
							<NavigationLine />
						</>
					)}
					{role === '2' && (
						<>
							{features[0] === 'Dashboard stats' ? (
								<>
									<Navigation menu={dashboardHome} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[1] === 'Parts Management' ? (
								<>
									<Navigation menu={itemsManagementModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[2] === 'Inventory' ? (
								<>
									<Navigation menu={inventoryModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[3] === 'Sale' ? (
								<>
									<Navigation menu={salesModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{/* {features[4] === 'Transfer' ? (
								<>
									<Navigation menu={transferModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null} */}

							{features[5] === 'Supplier' ? (
								<>
									<Navigation menu={suppliersModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[6] === 'Customer' ? (
								<>
									<Navigation menu={customersModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{/* {features[7] === 'Stores' ? (
								<>
									<Navigation menu={storesModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null} */}

							{features[8] === 'Reports' ? (
								<>
									<Navigation menu={reportModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[9] === 'Expense Type' ? (
								<>
									<Navigation menu={expenseModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[10] === 'Accounts' &&
							features[12] === 'Financial Statements' &&
							features[11] === 'Vouchers' ? (
								<>
									<Navigation menu={accountsModule} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{features[13] === 'Manage' ? (
								<>
									<Navigation menu={rolesAdmin} id='aside-dashboard' />
									<NavigationLine />
								</>
							) : null}

							{/* <Navigation menu={kitModule} id='aside-dashboard' /> */}
							{/* <NavigationLine /> */}

							{/* <Navigation menu={packagesModule} id='aside-dashboard' /> */}
							{/* <Navigation menu={dashboardMenu} id='aside-dashboard' /> */}
							{doc && (
								<>
									<NavigationLine />
									<Navigation menu={demoPages} id='aside-demo-pages' />
									<NavigationLine />
									<Navigation menu={layoutMenu} id='aside-menu' />
								</>
							)}

							{doc && (
								<>
									<NavigationLine />
									<Navigation menu={componentsMenu} id='aside-menu-two' />
									<NavigationLine />
								</>
							)}

							{asideStatus && doc && (
								<Card className='m-3 '>
									<CardBody className='pt-0'>
										<img
											srcSet={HandWebp}
											src={Hand}
											alt='Hand'
											width={130}
											height={130}
										/>
										<p
											className={classNames('h4', {
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											})}>
											{t('Everything is ready!')}
										</p>
										<Button
											color='info'
											isLight
											className='w-100'
											onClick={() => setDoc(false)}>
											{t('Demo Pages')}
										</Button>
									</CardBody>
								</Card>
							)}
						</>
					)}
				</div>
				<div className='aside-foot'>
					<User />
				</div>
			</motion.aside>
			{asideStatus && hasTouchButton && isModernDesign && (
				<>
					<motion.div className='aside-drag-area' ref={constraintsRef} />
					<Tooltips title='Toggle Aside' flip={['top', 'right']}>
						<motion.div
							className='aside-touch'
							drag='x'
							whileDrag={{ scale: 1.2 }}
							whileHover={{ scale: 1.1 }}
							dragConstraints={constraintsRef}
							dragElastic={0.1}
							style={{ x, zIndex: 1039 }}
							onClick={() => x.set(x.get() === 0 ? asideWidthWithSpace : 0)}
						/>
					</Tooltips>
				</>
			)}
		</>
	);
};

export default Aside;
