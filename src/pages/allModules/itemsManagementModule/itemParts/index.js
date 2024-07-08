// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

// ** apiClient Imports
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';

// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';
import Input from '../../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
// import showNotification from '../../../../components/extras/showNotification';
import apiClient from '../../../../baseURL/apiClient';
import { _titleError } from '../../../../notifyMessages/erroSuccess';

import View from './view';
import Add from './add';
import AddModal from './modals/addModal';
import AddMake from './modals/addMake';

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);
	const [oemNo, setOemNo] = useState('');
	const [oemNo2, setOemNo2] = useState('');
	const [machineOptions, setMachineOptions] = useState();
	const [selectedMachine, setSelectedMachine] = useState('');
	const [selectedCompany, setSelectedCompany] = useState('');
	const [nameOptions, setNameOptions] = useState();
	const [selectedName, setSelectedName] = useState('');
	const [makeOptions, setMakeOptions] = useState();
	const [selectedMake, setSelectedMake] = useState('');
	const [modelOptions, setModelOptions] = useState();
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedOrigin, setSelectedOrigin] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');
	const [selectedPart, setSelectedPart] = useState('');
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [subOptionsLoading, setSubOptionsLoading] = useState(false);
	const [nameLoading, setNameLoading] = useState(false);
	const [catOptionsLoading, setCatOptionsLoading] = useState(false);
	const [modelOptionsLoading, setModelOptionsLoading] = useState(false);
	const [brandOptions, setBrandOptions] = useState();
	const [brandOptionsLoading, setBrandOptionsLoading] = useState(false);
	const [originOptionsLoading, setOriginOptionsLoading] = useState(false);
	const [originOptions, setOriginOptions] = useState();
	const [partModelsOptions, setPartModelsOptions] = useState([]);
	const [partModelsOptionsLoading, setPartModelsOptionsLoading] = useState(false);
	const [machinePartsOptionsLoading, setMachinePartsOptionsLoading] = useState(false);
	const [machinePartsOptions, setMachinePartsOptions] = useState([]);

	const refreshTableData = () => {
		setTableDataLoading(true);
		apiClient
			.get(
				`/getModelItemOem?records=${
					store.data.itemsManagementModule.itemParts.perPage
				}&pageNo=${store.data.itemsManagementModule.itemParts.pageNo}
			&colName=id&sort=asc&make_id=${selectedMake ? selectedMake.id : ''}&machine_id=${
					selectedMachine ? selectedMachine.id : ''
				}
			&machine_model_id=${selectedModel ? selectedModel.id : ''}&item_id=${
					selectedName ? selectedName.id : ''
				}&oem_number=${oemNo}&company_id=${
					selectedCompany ? selectedCompany.id : ''
				}&company_oem_number=${oemNo2}&category_id=${
					selectedCategory ? selectedCategory.id : ''
				}&sub_category_id=${selectedSubCategory ? selectedSubCategory.id : ''}&brand_id=${
					selectedBrand ? selectedBrand.id : ''
				}&origin_id=${selectedOrigin ? selectedOrigin.id : ''}&part_model_id=${
					selectedPart ? selectedPart.id : ''
				}`,
				{},
			)
			.then((response) => {
				setTableData(response.data.data);
				console.log(response.data.data)
				setTableData2(response.data.data);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.data,
						'itemsManagementModule',
						'itemParts',
						'tableData',
					]),
				);
			})

			.catch((err) => {
				// showNotification(_titleError, err.message, 'Danger');
			});
	};

	useEffect(() => {
		if (selectedMachine || selectedMake) {
			setModelOptionsLoading(true);
			apiClient
				.get(
					`/getMachineModelsDropDown?machine_id=${
						selectedMachine ? selectedMachine.id : ''
					}&make_id=${selectedMake ? selectedMake.id : ''}`,
				)
				.then((response) => {
					const rec = response.data.machineModels.map(({ id, name }) => ({
						id,
						value: id,
						label: name,
					}));
					setModelOptions(rec);
					setModelOptionsLoading(false);
				})
				// eslint-disable-next-line no-console
				.catch((err) => {
					// showNotification(_titleError, err.message, 'Danger');
					if (err.response.status === 401) {
						// showNotification(_titleError, err.response.data.message, 'Danger');
					}
				});
		}
	}, [selectedMachine, selectedMake]);
	useEffect(() => {
		setCatOptionsLoading(true);

		setOriginOptionsLoading(true);

		setBrandOptionsLoading(true);
		apiClient
			.get(`/getDropDownsOptionsForItemPartsIndex`)
			.then((response) => {
				const rec = response.data.machineModels.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setModelOptions(rec);
				setModelOptionsLoading(false);
				const rec2 = response.data.categories.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				// console.log('ppp:', rec);
				setCategoryOptions(rec2);
				setCatOptionsLoading(false);
				const rec3 = response.data.origin.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setOriginOptions(rec3);
				setOriginOptionsLoading(false);

				const rec5 = response.data.companies.map(({ id, name }) => ({
					id,
					company_id: id,
					value: id,
					label: name,
				}));
				setBrandOptions(rec5);
				setBrandOptionsLoading(false);
				const rec6 = response.data.machines.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMachineOptions(rec6);
				const rec7 = response.data.makes.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMakeOptions(rec7);
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
		if (selectedCategory) {
			setSubOptionsLoading(true);

			apiClient
				.get(
					`/getSubCategoriesByCategory?category_id=${
						selectedCategory ? selectedCategory.id : ''
					}`,
				)
				.then((response) => {
					const rec = response.data.subcategories?.map(({ id, name }) => ({
						id,
						value: id,
						label: name,
					}));
					setSubCategoryOptions(rec);
					setSubOptionsLoading(false);
				})
				// eslint-disable-next-line no-console
				.catch((err) => {
					// showNotification(_titleError, err.message, 'Danger');
					if (err.response.status === 401) {
						// showNotification(_titleError, err.response.data.message, 'Danger');
					}
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);
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
	}, [selectedSubCategory]);
	// useEffect(() => {
	// 	setNameLoading(true);

	// 	apiClient
	// 		.get(
	// 			`/getDropDownsOptionsForItemPartsIndex?sub_category_id=${
	// 				selectedSubCategory ? selectedSubCategory.id : ''
	// 			}`,
	// 		)
	// 		.then((response) => {
	// 			const rec8 = response.data.machine_Parts?.map(({ id, name }) => ({
	// 				id,
	// 				value: id,
	// 				label: name,
	// 			}));
	// 			setNameOptions(rec8);
	// 			setNameLoading(false);
	// 		})
	// 		// eslint-disable-next-line no-console
	// 		.catch((err) => {
	// 			// showNotification(_titleError, err.message, 'Danger');
	// 			if (err.response.status === 401) {
	// 				// showNotification(_titleError, err.response.data.message, 'Danger');
	// 			}
	// 		});

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [selectedSubCategory]);
	useEffect(() => {
		setPartModelsOptionsLoading(true);

		apiClient
			.get(
				`/getDropDownsOptionsForItemPartsIndex?item_id=${
					selectedName ? selectedName.id : ''
				}`,
			)
			.then((response) => {
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
	}, [selectedName]);

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.itemsManagementModule.itemParts.perPage,
		store.data.itemsManagementModule.itemParts.pageNo,
	]);

	const formik = useFormik({
		initialValues: {
			supplier_id: '',
			store_id: '',
			machine_part_id: '',
			po_type: '',
			// brand_id: '',
		},
	});
	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Parts List</CardTitle>
								</CardLabel>
								<CardActions>
									<Add
										refreshTableData={refreshTableData}
										brandOptions={brandOptions}
									/>
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Machine' id='machine'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={machineOptions}
												isClearable
												value={selectedMachine}
												onChange={(val) => {
													setSelectedMachine(val);
													setSelectedModel('');
												}}
											/>
										</FormGroup>
									</div>

									<div className='col-md-3'>
										<FormGroup label='Make' id='make'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={makeOptions}
												isClearable
												value={selectedMake}
												onChange={(val) => {
													setSelectedMake(val);
													setSelectedModel('');
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Model' id='model'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={modelOptions}
												isLoading={modelOptionsLoading}
												isClearable
												value={selectedModel}
												onChange={(val) => {
													setSelectedModel(val);
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Brand' id='brand_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={brandOptions}
												isLoading={brandOptionsLoading}
												isClearable
												value={selectedBrand}
												onChange={(val) => {
													setSelectedBrand(val);
												}}
											/>
										</FormGroup>
									</div>
								</div>

								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Categories' id='category_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={categoryOptions}
												isLoading={catOptionsLoading}
												isClearable
												value={selectedCategory}
												onChange={(val) => {
													setSelectedCategory(val);
													setSelectedSubCategory('');
													setSelectedName('');
													setSelectedPart('');
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Sub Category' id='sub_category_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={subCategoryOptions}
												isLoading={subOptionsLoading}
												isClearable
												value={selectedSubCategory}
												onChange={(val) => {
													setSelectedSubCategory(val);
													setSelectedName('');
													setSelectedPart('');
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
									<FormGroup id='machine_part_id' label='Item'>
											<ReactSelect
												isLoading={machinePartsOptionsLoading}
												options={machinePartsOptions}
												isClearable
												// styles={customStyles2}
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
										{/* <FormGroup label='Item' id='name'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={nameOptions}
												isLoading={nameLoading}
												isClearable
												value={selectedName}
												// onChange={(val) => {
												// 	if (val !== null) {
												// 		setSelectedName({ id: val.id });
												// 	} else {
												// 		setSelectedName({ id: '' });
												// 	}
												// }}
												onChange={(val) => {
													setSelectedName(val);
													setSelectedPart('');
												}}
											/>
										</FormGroup> */}
									</div>
									<div className='col-md-3'>
										<FormGroup label='Origin' id='origin_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={originOptions}
												isLoading={originOptionsLoading}
												isClearable
												value={selectedOrigin}
												onChange={(val) => {
													setSelectedOrigin(val);
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Part Models' id='part_model_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={partModelsOptions}
												isLoading={partModelsOptionsLoading}
												isClearable
												value={selectedPart}
												onChange={(val) => {
													setSelectedPart(val);
												}}
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup label='OEM/ Part no' id='oem_num'>
											<Input
												id='oemFileNo'
												type='text'
												onChange={(e) => {
													setOemNo(e.target.value);
												}}
												value={oemNo}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
										<Button
											color='primary'
											onClick={() => refreshTableData()}
											isOutline
											// isDisable={landsViewLoading}
											isActive>
											Search
										</Button>
									</div>
								</div>
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
