/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
// eslint-disable-next-line eslint-comments/no-duplicate-disable
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Logo from '../../../components/logo/meelu.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import './GettingStarted.css'; // Make sure to create and include this CSS file

const GetingStarted = () => {
	const navigate = useNavigate();
	const [showPackages, setShowPackages] = useState(false);
	const [showFeatures, setShowFeatures] = useState(false);
	const [about, setAbout] = useState(false);
	const [contact, setContact] = useState(false);

	const handleSignup = () => {
		localStorage.setItem('packageId', 1);
		localStorage.setItem('newUser', 1);
		navigate(`/`, { replace: true });
	};
	const handlePackage = (id) => {
		localStorage.setItem('packageId', id);
		localStorage.setItem('newUser', 1);
		navigate(`/`, { replace: true });
	};
	const handleShowPackages = () => {
		setShowPackages(true);
		setShowFeatures(false);
		setAbout(false);
		setContact(false);
	};

	const handleShowFeatures = () => {
		setShowPackages(false);
		setContact(false);
		setAbout(false);
		setShowFeatures(true);
	};
	// const handleShowAbout = () => {
	// 	setShowPackages(false);
	// 	setContact(false);
	// 	setAbout(true);
	// 	setShowFeatures(false);
	// };
	// const handleShowContact = () => {
	// 	setShowPackages(false);
	// 	setContact(true);
	// 	setAbout(false);
	// 	setShowFeatures(false);
	// };

	const handleHome = () => {
		setShowPackages(false);
		setContact(false);
		setAbout(false);
		setShowFeatures(false);
	};

	const handleLearnMore = () => {
		setShowPackages(false);
		setContact(false);
		setAbout(false);
		setShowFeatures(true);
	};

	return (
		<div className='container-fluid min-vh-100 d-flex flex-column justify-content-between text-light  p-0'>
			<header className='d-flex justify-content-between align-items-center p-3 bg-success'>
				<div className='d-flex align-items-center'>
					<a href='#' onClick={handleHome}>
						<img src={Logo} alt='Logo' width={200} />
					</a>
				</div>
				<nav style={{ fontSize: '22px' }}>
					<a
						href='#'
						className='text-light'
						style={{ marginRight: '6rem' }}
						onClick={handleShowFeatures}>
						Features
					</a>
					<a
						href='#'
						className='text-light'
						style={{ marginRight: '6rem' }}
						onClick={handleShowPackages}>
						Pricing
					</a>
					{/* <a
						href='#'
						className='text-light'
						style={{ marginRight: '6rem' }}
						onClick={handleShowAbout}>
						About
					</a>
					<a
						href='#'
						className='text-light'
						style={{ marginRight: '6rem' }}
						onClick={handleShowContact}>
						Contact
					</a> */}
					<a
						href='#'
						className='btn btn-primary ms-3'
						style={{ fontSize: '18px' }}
						onClick={handleSignup}>
						Sign up for Trial
					</a>
				</nav>
			</header>
			<main
				className='flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center main-section text-black'
				style={{ backgroundColor: 'rgb(255 255 255)' }}>
				{!showPackages && !showFeatures && !about && !contact && (
					<>
						<h1 className='display-4'>
							Effortless Point of Sale Solutions for Your Business
						</h1>
						<p className='mt-3' style={{ fontSize: '1.8rem', fontWeight: '500' }}>
							Manage sales, inventory, and customer relationships with ease using Auto
							Hub POS.
						</p>
						<button className='btn btn-primary btn-lg mt-3' onClick={handleLearnMore}>
							Learn More
						</button>
					</>
				)}

				{showFeatures && (
					<div className='features-section'>
						<h2 className='mb-4' style={{ fontSize: '2.5rem' }}>
							Our Features
						</h2>
						<ul className='list-unstyled'>
							<li>
								Gain comprehensive insights with real-time data visualization on
								your dashboard for informed decisions.
							</li>
							<li>
								Optimize parts management with advanced tools for efficient tracking
								and control.
							</li>
							<li>
								Streamline inventory operations, ensuring optimal stock levels and
								reduced costs.
							</li>
							<li>
								Boost sales performance with tools designed to enhance customer
								satisfaction.
							</li>
							<li>
								Manage product transfers seamlessly, ensuring accurate and efficient
								operations.
							</li>
							<li>
								Enhance supplier management with tools to streamline communication
								and transactions.
							</li>
							<li>
								Keep your store operations organized and efficient with our
								management tools.
							</li>
							<li>
								Handle your financial accounts effortlessly with comprehensive
								accounting solutions.
							</li>
							<li>
								Create and track vouchers accurately, ensuring seamless financial
								transactions.
							</li>
							<li>
								Generate precise financial statements to assess your business's
								financial health.
							</li>
							<li>
								Facilitate the transfer of items with tools that ensure accuracy and
								efficiency.
							</li>
							<li>
								Categorize and track expenses easily with our expense type
								management tools.
							</li>
							<li>
								Control and manage user access and permissions to ensure security
								and proper resource allocation.
							</li>
						</ul>
					</div>
				)}

				{showPackages && (
					<div className='d-flex justify-content-center'>
						<div className='card mx-2' style={{ width: '30rem', color: 'black' }}>
							<div
								className='card-header'
								style={{ fontSize: '18px', fontWeight: 'bold' }}>
								<div>Basic Plan</div>
								<div>
									<h5 className='card-title'>3000 PKR</h5>
								</div>
							</div>
							<div
								className='card-body h-100 d-flex flex-column justify-content-end'
								style={{ backgroundColor: '#e0f3e8' }}>
								<div className='text-start'>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Real-time insights
										with comprehensive dashboard stats
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Optimize inventory
										Efficient parts management and tracking
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Drive revenue with
										Streamlined inventory operations with optimal stock levels
									</p>
									<br />
									<a
										href='#'
										className='btn btn-primary w-100'
										style={{ fontSize: '16px', fontWeight: 'bold' }}
										onClick={() => handlePackage(2)}>
										{' '}
										Buy Basic
									</a>
								</div>
							</div>
						</div>
						<div className='card mx-2' style={{ width: '30rem', color: 'black' }}>
							<div
								className='card-header'
								style={{ fontSize: '18px', fontWeight: 'bold' }}>
								<div>Silver Plan</div>
								<div>
									<h5 className='card-title'>5000 PKR</h5>
								</div>
							</div>
							<div
								className='card-body h-100 d-flex flex-column justify-content-end'
								style={{ backgroundColor: '#e0f3e8' }}>
								<div className='text-start'>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Real-time data
										insights on your dashboard
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Efficient parts
										management and tracking
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Streamlined
										inventory operations with optimal stock levels
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Boost sales
										performance with tools designed to enhance customer
										satisfaction
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Manage product
										transfers seamlessly, ensuring accurate and efficient
										operations
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Enhance supplier
										management with tools to streamline communication and
										transactions
									</p>
									<br />
									<a
										href='#'
										className='btn btn-primary w-100'
										style={{ fontSize: '16px', fontWeight: 'bold' }}
										onClick={() => handlePackage(3)}>
										{' '}
										Buy Silver
									</a>
								</div>
							</div>
						</div>
						<div className='card mx-2' style={{ width: '30rem', color: 'black' }}>
							<div
								className='card-header'
								style={{ fontSize: '18px', fontWeight: 'bold' }}>
								<div>Gold Plan</div>
								<div>
									<h5 className='card-title'>7000 PKR</h5>
								</div>
							</div>
							<div
								className='card-body h-100 d-flex flex-column justify-content-end'
								style={{ backgroundColor: '#e0f3e8' }}>
								<div className='text-start'>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Real-time data
										insights on your dashboard
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Efficient parts
										management and tracking
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Streamlined
										inventory operations with optimal stock levels
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Boost sales
										performance with tools designed to enhance customer
										satisfaction
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Manage product
										transfers seamlessly, ensuring accurate and efficient
										operations
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Enhance supplier
										management with tools to streamline communication and
										transactions
									</p>

									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span>
										Keep your store operations organized and efficient
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span> Handle your
										financial accounts effortlessly
									</p>
									<p className='card-text' style={{ fontSize: '16px' }}>
										<span style={{ color: 'green' }}>✔</span>
										Create and track vouchers accurately, ensuring seamless
										financial transactions
									</p>

									<br />
									<a
										href='#'
										className='btn btn-primary w-100'
										style={{ fontSize: '16px', fontWeight: 'bold' }}
										onClick={() => handlePackage(4)}>
										{' '}
										Buy Gold
									</a>
								</div>
							</div>
						</div>
					</div>
				)}
				{about && (
					<div className=''>
						<h2 className='display-5 mb-4'>About</h2>
					</div>
				)}
				{contact && (
					<div className=''>
						<h2 className='display-5 mb-4'>Contact Us</h2>
					</div>
				)}
			</main>
		</div>
	);
};

export default GetingStarted;
