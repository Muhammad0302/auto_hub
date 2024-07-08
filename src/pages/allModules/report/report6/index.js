// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';

// ** apiClient Imports
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import ReactSelect from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

import { useFormik } from 'formik';
import Spinner from '../../../../components/bootstrap/Spinner';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';
import { customStyles2 } from '../../../customStyles/ReactSelectCustomStyle';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import showNotification from '../../../../components/extras/showNotification';
import apiClient from '../../../../baseURL/apiClient';
import { _titleError } from '../../../../notifyMessages/erroSuccess';

// import View from './view';
import GeneratePDF from './pdf/Report';

export const searchByOptions = [{ value: 1, text: 'Id' }];
export const categoryOptions = [
	{ value: 0, text: 'qqq' },
	{ value: 1, text: 'www' },
	{ value: 2, text: 'eee' },
];

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);
	// const [selectedBrand, setSelectedBrand] = useState('');
	const [nameOptions, setNameOptions] = useState();
	const [nameLoading, setNameLoading] = useState(false);
	// const [selectedName, setSelectedName] = useState('');
	// const [selectedItem, setSelectedItem] = useState('');

	const [machinePartsOptions, setMachinePartsOptions] = useState([]);
	const [machinePartsOptionsLoading, setMachinePartsOptionsLoading] = useState(false);

	const [kitOptions, setKitOptions] = useState([]);
	const [cusOptions, setCusOptions] = useState([]);
	const [cusOptionsLoading, setCusOptionsLoading] = useState(false);
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [brandOptions, setBrandOptions] = useState();
	const [brandOptionsLoading, setBrandOptionsLoading] = useState(false);
	const [isPrintAllReportLoading, setIsPrintAllReportLoading] = useState(false);

	const [startDate, setStartDate] = useState('');
	const [startDate2, setStartDate2] = useState('');
	const [startDate3, setStartDate3] = useState('');
	const [endDate, setEndDate] = useState('');
	const [endDate2, setEndDate2] = useState('');
	const [endDate3, setEndDate3] = useState('');

	// const saleTypeOptions = [
	// 	{
	// 		id: 1,
	// 		value: 1,
	// 		label: 'Walk-in Customer',
	// 	},
	// 	{
	// 		id: 2,
	// 		value: 2,
	// 		label: 'Registered Customer',
	// 	},
	// ];

	useEffect(() => {
		setNameLoading(true);
		apiClient
			.get(`/getStoredropdown?store_type_id=2`)
			.then((response) => {
				const rec = response.data.store.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setNameOptions(rec);
				setNameLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
	}, []);

	useEffect(() => {
		setBrandOptionsLoading(true);
		apiClient
			.get(`/getDropDownsOptionsForItemPartsIndex`)
			.then((response) => {
				const rec = response.data.companies.map(({ id, name }) => ({
					id,
					company_id: id,
					value: id,
					label: name,
				}));
				setBrandOptions(rec);
				setBrandOptionsLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
	}, []);

	useEffect(() => {
		formik.setFieldValue('machine_part_id', '');

		setMachinePartsOptionsLoading(true);

		apiClient
			.get(`/kitItemDropdown`)
			.then((response) => {
				const rec = response.data.data.map(({ id, name, machine_part_oem_part }) => ({
					id,
					value: id,
					// label: `${machine_part_oem_part.oem_part_number.number1}-${machine_part_oem_part.machine_part.name}`,
					label: name,
				}));
				setMachinePartsOptions(rec);
				setMachinePartsOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setKitOptionsLoading(true);
		apiClient
			.get(`/getPersons?person_type_id=1`)

			.then((response) => {
				// console.log('bnnn::', response.data);
				const rec = response.data.persons.map(({ id, name, phone_no }) => ({
					id,
					value: id,
					label: `${id}-${name}-${phone_no ?? ''}`,
					personName: name,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	setCusOptionsLoading(true);
	// 	apiClient
	// 		.get(`/getPersons?person_type_id=1`)

	// 		.then((response) => {
	// 			// console.log('bnnn::', response.data);
	// 			const rec = response.data.walk_in_customer.map(({ id, walk_in_customer_name }) => ({
	// 				id,
	// 				value: id,
	// 				label: `${id}-${walk_in_customer_name}`,
	// 				personName: walk_in_customer_name,
	// 			}));
	// 			setCusOptions(rec);
	// 			setCusOptionsLoading(false);
	// 		})

	// 		// eslint-disable-next-line no-console
	// 		.catch((err) => {});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	const printReportAll = (docType) => {
		setIsPrintAllReportLoading(true);

		apiClient
			.get(
				`/getSalesReportCustomerWise?records=${store.data.reportManagementModule.report6.perPage}&pageNo=${store.data.reportManagementModule.report6.pageNo}&colName=id&sort=desc&customer_id=${formik.values.customer_id}&store_id=${formik.values.store_id}&brand_id=${formik.values.brand_id}&from=${startDate3}&to=${endDate3}`,
			)
			.then((response) => {
				setTableData(response.data.invoices);

				GeneratePDF(
					response.data.invoices,
					docType,
					// formik.values.brand_id,
					startDate2,
					endDate2,
				);
				showNotification(
					'Printing Transactions Report',
					'Printing  Report Successfully',
					'success',
				);
				setIsPrintAllReportLoading(false);

				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.purchaseorderlist,
						'reportManagementModule',
						'report6',
						'tableData',
					]),
				);
			});

		// .catch((err) => {
		// 	setIsPrintAllReportLoading(false);

		// 	showNotification(_titleError, err.message, 'Danger');
		// });
	};

	const formik = useFormik({
		initialValues: {
			customer_id: '',
			store_id: '',
			brand_id: '',
			machine_part_id: '',
			// sale_type: '',
			// walk_in_customer_name: '',
		},
	});

	useEffect(() => {
		// refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.reportManagementModule.report6.perPage,
		store.data.reportManagementModule.report6.pageNo,
	]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Customer Wise Sales Report </CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-2'>
										<FormGroup label='Shop' id='store_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={nameOptions}
												isLoading={nameLoading}
												isClearable
												value={
													formik.values.store_id
														? nameOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.store_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'store_id',
														val ? val.id : '',
													);
												}}
											/>
										</FormGroup>
									</div>
									{/* <div className='col-md-2'>
										<FormGroup label='Sale Type' id='sale_type'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												isClearable
												options={saleTypeOptions}
												// isLoading={purchaseTypeOptionsLoading}
												value={
													formik.values.sale_type
														? saleTypeOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.sale_type,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'sale_type',
														val ? val.id : '',
													);
												}}
											/>
										</FormGroup>
									</div> */}
									{/* {formik.values.sale_type === 2 ? ( */}
									<div className='col-md-2'>
										<FormGroup label='Customers' id='customer_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={kitOptions}
												isLoading={kitOptionsLoading}
												isClearable
												value={
													formik.values.customer_id
														? kitOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.customer_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'customer_id',
														val ? val.id : '',
													);
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup id='machine_part_id' label='Item'>
											<ReactSelect
												isLoading={machinePartsOptionsLoading}
												options={machinePartsOptions}
												isClearable
												styles={customStyles2}
												value={
													formik.values.machine_part_id
														? machinePartsOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.machine_part_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine_part_id',
														val ? val.id : '',
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									{/* ) : ( */}
									{/* <div className='col-md-2'>
											<FormGroup
												id='walk_in_customer_name'
												label='Customer Name'
												className='col-md-12'>
												<Select
													className='col-md-12'
													classNamePrefix='select'
													options={cusOptions}
													isLoading={cusOptionsLoading}
													isClearable
													value={
														formik.values.walk_in_customer_name
															? cusOptions?.find(
																	(c) =>
																		c.value ===
																		formik.values
																			.walk_in_customer_name,
															  )
															: null
													}
													onChange={(val) => {
														formik.setFieldValue(
															'walk_in_customer_name',
															val ? val.personName : '',
														);
													}}
												/>
											</FormGroup>
										</div> */}
									{/* )} */}

									<div className='col-md-2'>
										<FormGroup label='Brand' id='brand_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={brandOptions}
												isLoading={brandOptionsLoading}
												isClearable
												value={
													formik.values.brand_id
														? brandOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.brand_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'brand_id',
														val ? val.id : '',
													);
												}}
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<FormGroup label='From' id='from'>
											<Flatpickr
												className='form-control'
												value={startDate}
												// eslint-disable-next-line react/jsx-boolean-value

												options={{
													dateFormat: 'd/m/y',
													allowInput: true,
												}}
												onChange={(date, dateStr) => {
													setStartDate(dateStr);
													setStartDate2(date[0]);
													setStartDate3(
														date[0]
															? moment(date[0]).format('YYYY-MM-DD')
															: '',
													);
												}}
												onClose={(date, dateStr) => {
													setStartDate(dateStr);
													setStartDate2(date[0]);
													setStartDate3(
														date[0]
															? moment(date[0]).format('YYYY-MM-DD')
															: '',
													);
												}}
												id='default-picker'
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<FormGroup label='To' id='to'>
											<Flatpickr
												className='form-control'
												value={endDate}
												// eslint-disable-next-line react/jsx-boolean-value

												options={{
													dateFormat: 'd/m/y',
													allowInput: true,
												}}
												onChange={(date, dateStr) => {
													setEndDate(dateStr);
													setEndDate2(date[0]);
													setEndDate3(
														date[0]
															? moment(date[0]).format('YYYY-MM-DD')
															: '',
													);
												}}
												onClose={(date, dateStr) => {
													setEndDate(dateStr);
													setEndDate2(date[0]);
													setEndDate3(
														date[0]
															? moment(date[0]).format('YYYY-MM-DD')
															: '',
													);
												}}
												id='default-picker'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<Button
											// isDisable
											color='primary'
											// isLight={darkModeStatus}
											className={classNames('text-nowrap mt-4', {
												'border-light': true,
											})}
											icon={!isPrintAllReportLoading && 'FilePdfFill'}
											isDisable={isPrintAllReportLoading}
											onClick={() => printReportAll(2)}>
											{isPrintAllReportLoading && (
												<Spinner isSmall inButton />
											)}
											{isPrintAllReportLoading
												? 'Generating PDF...'
												: 'Print Report'}
										</Button>
									</div>
								</div>
								<br />
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Categories;