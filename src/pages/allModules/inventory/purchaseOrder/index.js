/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
// ** apiClient Imports
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import showNotification from '../../../../components/extras/showNotification';
import Spinner from '../../../../components/bootstrap/Spinner';

import apiClient from '../../../../baseURL/apiClient';
import { _titleError } from '../../../../notifyMessages/erroSuccess';

import View from './view';
import Add from './add';
import ReportPurchasedItems from './pdfs/ReportPurchasedItems';

export const searchByOptions = [{ value: 1, text: 'Id' }];
export const categoryOptions = [
	{ value: 0, text: 'qqq' },
	{ value: 1, text: 'www' },
	{ value: 2, text: 'eee' },
];

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);
	const [isPrintAllReportLoading, setIsPrintAllReportLoading] = useState(false);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);
	const [kitOptions, setKitOptions] = useState([]);
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState('');

	const [typeOptions, setTypeOptions] = useState([]);
	const [typeOptionsLoading, setTypeOptionsLoading] = useState(false);

	const [categoriesOptions, setCategoriesOptions] = useState([]);
	const [categoriesOptionsLoading, setCategoriesOptionsLoading] = useState(false);
	const [subOption, setSubOptions] = useState([]);
	const [subOptionsLoading, setSubOptionsLoading] = useState(false);
	const [machinePartsOptions, setMachinePartsOptions] = useState([]);
	const [machinePartsOptionsLoading, setMachinePartsOptionsLoading] = useState(false);
	const [brandOptionsLoading, setBrandOptionsLoading] = useState(false);

	const [partModelsOptions, setPartModelsOptions] = useState([]);
	const [partModelsOptionsLoading, setPartModelsOptionsLoading] = useState(false);

	const [storeTypeOptions, setStoreTypeOptions] = useState();
	const [selectedName, setSelectedName] = useState('');
	const [selectedStore, setSelectedStore] = useState('');
	const [nameOptions, setNameOptions] = useState();
	const [nameLoading, setNameLoading] = useState(false);

	const refreshTableData = () => {
		setTableDataLoading(true);
		// apiClient.get(
		// 	`/getKits?records=${store.data.kitManagement.defineKit.perPage}&pageNo=${store.data.kitManagement.defineKit.pageNo}&colName=id&sort=asc&id=${selectedItem.id}`,
		// )
		apiClient
			.get(
				`/getPolist?po_type=1&records=${
					store.data.purchaseOrderManagement.purchaseList.perPage
				}&pageNo=${
					store.data.purchaseOrderManagement.purchaseList.pageNo
				}&colName=id&sort=desc&supplier_id=${selectedItem ? selectedItem.id : ''}&item_id=${
					formik.values.machine_part_id ? formik.values.machine_part_id : ''
				}&category_id=${
					formik.values.category_id ? formik.values.category_id : ''
				}&sub_category_id=${
					formik.values.sub_category_id ? formik.values.sub_category_id : ''
				}&part_model_id=${
					formik.values.part_model_id ? formik.values.part_model_id : ''
				}&type_id=${formik.values.type_id ? formik.values.type_id : ''}
				&store_type_id=${selectedStore ? selectedStore.id : ''}
				&store_id=${selectedName ? selectedName.id : ''}`,
			)
			.then((response) => {
				// console.log('myres::', response.data.purchaseorderlist);
				setTableData(response.data.purchaseorderlist.data);
				setTableData2(response.data.purchaseorderlist);
				// console.log('bmk::tbdata::', response.data.data.data);
				// console.log('bmk::tbdata2::', response.data.data);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.purchaseorderlist,
						'purchaseOrderManagement',
						'purchaseList',
						'tableData',
					]),
				);
			})

			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
			});
	};
	useEffect(() => {
		apiClient
			.get(
				`/getPersons?person_type_id=2&part_model_id=${
					formik.values.part_model_id ? formik.values.part_model_id : ''
				}&isActive=`,
			)
			.then((response) => {
				const rec = response.data.persons.map(({ id, name }) => ({
					id,
					value: id,
					label: `${id}-${name}`,
					personName: name,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const formik = useFormik({
		initialValues: {
			name: '',
			kit_name: '',
			type_id: '',
			category_name: '',
			category_id: '',
			sub_category_id: '',
			machine_part_id: '',
			part_model_id: '',
		},
		// onSubmit: () => {
		// 	setIsLoading(true);
		// 	setTimeout(handleSave, 2000);
		// },
	});

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.purchaseOrderManagement.purchaseList.perPage,
		store.data.purchaseOrderManagement.purchaseList.pageNo,
	]);

	useEffect(() => {
		formik.setFieldValue('sub_category_id', '');

		setSubOptionsLoading(true);

		apiClient
			.get(
				`/getSubCategoriesByCategory?category_id=${
					formik.values.category_id ? formik.values.category_id : ''
				}`,
			)
			.then((response) => {
				const rec = response.data.subcategories?.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setSubOptions(rec);
				setSubOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.category_id]);

	useEffect(() => {
		apiClient
			.get(
				`/getItemTypesDropdown?sub_category_id=${
					formik.values.sub_category_id ? formik.values.sub_category_id : ''
				}`,
			)
			.then((response) => {
				const rec = response.data.machinePartstypes?.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setTypeOptions(rec);
				setTypeOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.sub_category_id]);
	useEffect(() => {
		formik.setFieldValue('machine_part_id', '');

		setMachinePartsOptionsLoading(true);
		setBrandOptionsLoading(true);

		apiClient
			.get(`/getItemOemDropDown`)
			.then((response) => {
				const rec = response.data.data.map(({ id, name }) => ({
					id,
					value: id,
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
	}, [formik.values.type_id]);

	// useEffect(() => {
	// 	formik.setFieldValue('machine_part_id', '');

	// 	setMachinePartsOptionsLoading(true);

	// 	apiClient
	// 		.get(
	// 			`/getMachinePartsDropDown?type_id=${
	// 				formik.values.type_id ? formik.values.type_id : ''
	// 			}`,
	// 		)
	// 		.then((response) => {
	// 			const rec = response.data.machine_Parts?.map(({ id, name }) => ({
	// 				id,
	// 				value: id,
	// 				label: name,
	// 			}));
	// 			setMachinePartsOptions(rec);
	// 			setMachinePartsOptionsLoading(false);
	// 		})
	// 		// eslint-disable-next-line no-console
	// 		.catch((err) => {
	// 			// showNotification(_titleError, err.message, 'Danger');
	// 			if (err.response.status === 401) {
	// 				// showNotification(_titleError, err.response.data.message, 'Danger');
	// 			}
	// 		});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [formik.values.type_id]);
	useEffect(() => {
		formik.setFieldValue('part_model_id', '');

		setPartModelsOptionsLoading(true);

		apiClient
			.get(
				`/getMachinePartsModelsDropDown?machine_part_id=${
					formik.values.machine_part_id ? formik.values.machine_part_id : ''
				}`,
			)
			.then((response) => {
				console.log('The mechine part model dropdown is:', response);
				const rec = response.data.machinepartmodel?.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setPartModelsOptions(rec);
				setPartModelsOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.machine_part_id]);

	useEffect(() => {
		apiClient
			.get(`/getCategoriesDropDown`)
			.then((response) => {
				const rec = response.data.categories?.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setCategoriesOptions(rec);
				setCategoriesOptionsLoading(false);
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
		setNameLoading(true);
		apiClient
			.get(`/getStoredropdown?store_type_id=${selectedStore ? selectedStore.id : ''}`)
			.then((response) => {
				const rec = response.data.store.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setSelectedName(rec[0]);
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
	}, [selectedStore]);
	useEffect(() => {
		// refreshTableData();
		apiClient
			.get(
				`/getStoreTypeDropDown?kit_name=${
					formik.values.kit_name ? formik.values.kit_name : ''
				}`,
			)
			.then((response) => {
				const rec = response.data.storeType.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setSelectedStore(rec[0]);
				setStoreTypeOptions(rec);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.purchaseOrderManagement.purchaseList.perPage,
		store.data.purchaseOrderManagement.purchaseList.pageNo,
	]);

	const PrintReportPurchasedItems = (docType) => {
		// setIsPrintAllReportLoading(true);

		apiClient
			.get(`/getPoChild?store_id=`)
			.then((response) => {
				ReportPurchasedItems(response.data.pochild, docType);
				showNotification('Success', 'Printing  report Successfully', 'success');
			})
			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
			});

		setIsPrintAllReportLoading(false);
	};
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Purchase Orders </CardTitle>
								</CardLabel>
								<CardActions>
									<Add refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-2'>
										<FormGroup id='category_id' label='Category'>
											<ReactSelect
												isLoading={categoriesOptionsLoading}
												options={categoriesOptions}
												isClearable
												value={
													formik.values.category_id
														? categoriesOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.category_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'category_id',
														val !== null && val.id,
													);
													formik.setFieldValue(
														'category_name',
														val !== null && val.label,
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup id='sub_category_id' label='Sub Category'>
											<ReactSelect
												isLoading={subOptionsLoading}
												options={subOption}
												isClearable
												value={
													formik.values.sub_category_id
														? subOption?.find(
																(c) =>
																	c.value ===
																	formik.values.sub_category_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'sub_category_id',
														val !== null && val.id,
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<FormGroup id='type_id' label='Item Type'>
											<ReactSelect
												isLoading={typeOptionsLoading}
												options={typeOptions}
												isClearable
												value={
													formik.values.type_id
														? typeOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.type_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'type_id',
														val !== null && val.id,
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<FormGroup id='machine_part_id' label='Item'>
											<ReactSelect
												isLoading={machinePartsOptionsLoading}
												options={machinePartsOptions}
												isClearable
												// styles={customStyles2}?
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
										{/* <FormGroup id='machine_part_id' label='Item'>
											<ReactSelect
												isLoading={machinePartsOptionsLoading}
												options={machinePartsOptions}
												isClearable
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
														val !== null && val.id,
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup> */}
									</div>
									<div className='col-md-2'>
										<FormGroup id='part_model_id' label='Part Model'>
											<ReactSelect
												isLoading={partModelsOptionsLoading}
												options={partModelsOptions}
												isClearable
												value={
													formik.values.part_model_id
														? partModelsOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.part_model_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'part_model_id',
														val !== null && val.id,
													);

													// getSubCategoriesDropDown(val.id);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup label='Suppliers' id='kit_name'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={kitOptions}
												isLoading={kitOptionsLoading}
												isClearable
												value={selectedItem}
												onChange={(val) => {
													setSelectedItem(val);
												}}
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<FormGroup label='Store Type' id='type_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={storeTypeOptions}
												isClearable
												value={selectedStore}
												onChange={(val) => {
													console.log('The selected store is:', val);
													setSelectedStore(val);
													setSelectedName('');
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup label='Store Name' id='name'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={nameOptions}
												isLoading={nameLoading}
												isClearable
												value={selectedName}
												onChange={(val) => {
													setSelectedName(val);
												}}
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<Button
											color='primary'
											onClick={() => refreshTableData()}
											isOutline
											isActive>
											Search
										</Button>
									</div>
								</div>
								{/* <div className='row g-4'>
									<FormGroup className='col-md-2' label='Category'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setCategoryOptionsSelected({
													value: e.target.value,
												});
											}}
											value={categoryOptionsSelected.value}
											list={categoryOptions}
										/>
									</FormGroup>
								</div> */}
								<br />
								<div className='row g-4 d-flex align-items-end justify-content-end'>
									{/* <Button
										color='primary'
										// isLight={darkModeStatus}
										className={classNames('text-nowrap', {
											'col-md-2 border-light': true,
										})}
										icon={!isPrintAllReportLoading && 'FilePdfFill'}
										isDisable={isPrintAllReportLoading}
										onClick={() => printReportAll(2)}>
										{isPrintAllReportLoading && <Spinner isSmall inButton />}
										{isPrintAllReportLoading
											? 'Generating PDF...'
											: 'Print Invoices Report'}
									</Button> */}

									<Button
										color='primary'
										// isLight={darkModeStatus}
										className={classNames('text-nowrap', {
											'col-md-3 border-light': true,
										})}
										icon={!isPrintAllReportLoading && 'FilePdfFill'}
										isDisable={isPrintAllReportLoading}
										onClick={() => PrintReportPurchasedItems(2)}>
										{isPrintAllReportLoading && <Spinner isSmall inButton />}
										{isPrintAllReportLoading
											? 'Generating PDF...'
											: 'Print Purchase Order Report'}
									</Button>
								</div>
								<br />
							</CardBody>
							<View
								tableData={tableData}
								tableData2={tableData2}
								refreshTableData={refreshTableData}
								tableDataLoading={tableDataLoading}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Categories;
