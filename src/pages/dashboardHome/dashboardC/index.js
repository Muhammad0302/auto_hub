// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import apiClient from '../../../baseURL/apiClient';
// import ClearCookies from '../../../baseURL/clearCookies';

import PlotData from './plotsData/PlotData';
import PlotDataType from './plotsData/PlotDataType';
import PlotsRecievables from './plotsData/plotsRecievables';
import Revenue from './IncomeStatement/Revenue';
import Income from './IncomeStatement/Income';
import IncomingsOutgoings from './IncomeStatement/IncomingsOutgoings';
// import GeneralInfo from './generalInfo/PurchaseOrder';
import PurchaseOrder from './generalInfo/PurchaseOrder';
import SalesInvoice from './generalInfo/SalesInvoice';

const Chart = () => {
	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);
	const [dataforRevenueExpensesCostLoading, setDataforRevenueExpensesCostLoading] =
		useState(true);
	const [dataforRevenueExpensesCost, setDataforRevenueExpensesCost] = useState([]);

	useEffect(() => {
		refreshData();
		getDataforRevenueExpensesCost();
		getDataForPlotsReceivable();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getDataforRevenueExpensesCost = () => {
		setDataforRevenueExpensesCostLoading(true);

		apiClient
			.get(`/getTrailBalanceForDash`)
			.then((response) => {
				if (response.data.status === 'ok') {
					setDataforRevenueExpensesCost(response.data);
					setDataforRevenueExpensesCostLoading(false);
				} else {
					// eslint-disable-next-line no-lonely-if
					// if (1 === 2) ClearCookies();
				}
			})
			.catch((err) => console.log(err));
	};
	const refreshData = () => {
		setTableRecordsLoading(true);

		apiClient
			.get(`/getDashboardData`)
			.then((response) => {
				if (response.data.status === 'ok') {
					setTableRecords(response.data);
					setTableRecordsLoading(false);
				} else {
					// eslint-disable-next-line no-lonely-if
					// if (1 === 2) ClearCookies();
				}
			})
			.catch((err) => console.log(err));
	};
	const [dataForPlotsReceivable, setDataForPlotsReceivable] = useState(true);
	const [dataForPlotsReceivableLoading, setDataForPlotsReceivableLoading] = useState(true);

	const getDataForPlotsReceivable = () => {
		setDataForPlotsReceivableLoading(true);

		apiClient
			.get(`/getBookingReport`)
			.then((response) => {
				if (response.data.status === 'ok') {
					// setData(response.data.data);

					const t = response.data.data
						? response.data.data.reduce(
								// eslint-disable-next-line no-return-assign
								(a, v) => (a += parseFloat(v !== undefined ? v.total_payable : 0)),
								0,
						  )
						: 0;

					const r = response.data.data
						? response.data.data.reduce(
								// eslint-disable-next-line no-return-assign
								(a, v) => (a += parseFloat(v !== undefined ? v.received : 0)),
								0,
						  )
						: 0;

					setDataForPlotsReceivable({
						received: r,
						total: t,
					});

					setDataForPlotsReceivableLoading(false);
				} else {
					// eslint-disable-next-line no-lonely-if
					// if (1 === 2) ClearCookies();
				}
			})
			.catch((err) => console.log(err));
	};
	// console.log("tablerecord:" ,tableRecords)
	return tableRecordsLoading ? (
		<h5>Loading...</h5>
	) : (
		<div className='col-lg-12'>
			<Card stretch>
				{/* <CardHeader>
					<CardLabel icon='PieChart'>
						<CardTitle>
							Overview <small>Business</small>
						</CardTitle>
						<CardSubTitle>Overview</CardSubTitle>
					</CardLabel>
				</CardHeader> */}
				<CardBody>
					<div className='row'>
						<PurchaseOrder data={tableRecords} />
						<SalesInvoice data={tableRecords} />
					</div>
					<div className='row'>
						<Revenue
							dataMain={dataforRevenueExpensesCost}
							dataLoading={dataforRevenueExpensesCostLoading}
						/>
						<IncomingsOutgoings
							dataMain={dataforRevenueExpensesCost}
							dataLoading={dataforRevenueExpensesCostLoading}
						/>
					</div>
					<div className='row justify-content-center'>
						<Income
							dataMain={dataforRevenueExpensesCost}
							dataLoading={dataforRevenueExpensesCostLoading}
						/>
					</div>
					<div className='row justify-content-center'>
						{/* <generalInfo data={tableRecords} /> */}
						
					</div>
					{/* <div className='row'>
						<PlotData data={tableRecords?.PlotsData} />
						<PlotDataType data={tableRecords?.PlotsData} />
					</div>
					{dataForPlotsReceivableLoading ? (
						<p>...</p>
					) : (
						<div className='row'>
							<PlotsRecievables
								data={dataForPlotsReceivable}
								// isLoading={dataForPlotsReceivableLoading}
							/>
						</div>
					)} */}
				</CardBody>
			</Card>
		</div>
	);
};

export default Chart;
