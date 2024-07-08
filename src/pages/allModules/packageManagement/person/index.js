// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/disable-enable-pair
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import Select2 from '../../../../components/bootstrap/forms/Select';

// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Input from '../../../../components/bootstrap/forms/Input';

import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';

// import apiClient from '../../../../baseURL/api';

const Categories = () => {
	const navigate = useNavigate();
	const data = JSON.parse(Cookies.get('Data'));
	const endDate = data.user.subscription.end_date;
	const parts = endDate.split('-');

	// Rearrange the parts to MM-DD-YYYY
	const formattedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
	const handlePackage = (id) => {
		localStorage.setItem('packageId', id);
		localStorage.setItem('newUser', 1);
		navigate(`/`, { replace: true });
	};
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel>
									<CardTitle>
										<div
											style={{
												fontSize: '14px',
												fontWeight: 'normal',
												color: '#f72323',
											}}>
											Your {data?.package_name} package will expire on{' '}
											{formattedDate}!
										</div>
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<div
								className='d-flex justify-content-center'
								style={{ paddingTop: '50px', paddingBottom: '50px' }}>
								<div
									className='card mx-2'
									style={{ width: '30rem', color: 'black' }}>
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
												<span style={{ color: 'green' }}>✔</span> Real-time
												insights with comprehensive dashboard stats
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Optimize
												inventory Efficient parts management and tracking
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Drive
												revenue with Streamlined inventory operations with
												optimal stock levels
											</p>
											<br />
											<a
												href='/Auto_hub/package'
												className='btn btn-primary w-100'
												style={{ fontSize: '16px', fontWeight: 'bold' }}
												onClick={() => handlePackage(2)}>
												{' '}
												Buy Basic
											</a>
										</div>
									</div>
								</div>
								<div
									className='card mx-2'
									style={{ width: '30rem', color: 'black' }}>
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
												<span style={{ color: 'green' }}>✔</span> Real-time
												data insights on your dashboard
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Efficient
												parts management and tracking
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span>{' '}
												Streamlined inventory operations with optimal stock
												levels
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Boost
												sales performance with tools designed to enhance
												customer satisfaction
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Manage
												product transfers seamlessly, ensuring accurate and
												efficient operations
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Enhance
												supplier management with tools to streamline
												communication and transactions
											</p>
											<br />
											<a
												href='/Auto_hub/package'
												className='btn btn-primary w-100'
												style={{ fontSize: '16px', fontWeight: 'bold' }}
												onClick={() => handlePackage(3)}>
												{' '}
												Buy Silver
											</a>
										</div>
									</div>
								</div>
								<div
									className='card mx-2'
									style={{ width: '30rem', color: 'black' }}>
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
												<span style={{ color: 'green' }}>✔</span> Real-time
												data insights on your dashboard
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Efficient
												parts management and tracking
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span>{' '}
												Streamlined inventory operations with optimal stock
												levels
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Boost
												sales performance with tools designed to enhance
												customer satisfaction
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Manage
												product transfers seamlessly, ensuring accurate and
												efficient operations
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Enhance
												supplier management with tools to streamline
												communication and transactions
											</p>

											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span>
												Keep your store operations organized and efficient
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span> Handle
												your financial accounts effortlessly
											</p>
											<p className='card-text' style={{ fontSize: '16px' }}>
												<span style={{ color: 'green' }}>✔</span>
												Create and track vouchers accurately, ensuring
												seamless financial transactions
											</p>

											<br />
											<a
												href='/Auto_hub/package'
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
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Categories;
