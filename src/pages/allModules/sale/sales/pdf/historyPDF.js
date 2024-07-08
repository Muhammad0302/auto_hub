// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

// import Logo from '../../../../../assets/logos/logo.png';

// define a GeneratePDF2 function that accepts a tickets argument
const GeneratePDF = (data1, type) => {
	let data3 = null;
	try {
		data3 = Cookies?.get('Data') ? JSON.parse(Cookies?.get('Data')) : null;
	} catch (error) {
		console.error('Error parsing cookies data:', error);
	}
	// initialize jsPDF
	console.log('obj', data1.invoiceHistory.Salehistory);
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('l', 'pt', 'a4');
	const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

	//  Original PO Start
	let totalAmountOriginalPo = 0;
	let totalHistorySummarytotalReturned = 0;
	let totalHistorySummarydiscount = 0;
	let totalHistorySummaryTotalAfterDiscount = 0;
	let totalHistorySummaryTaxInFigure = 0;
	let totalHistorySummaryTotalAfterTax = 0;
	const tableColumnsOriginalPo = [
		'S.No.',
		'OEM/ PART NO',
		'ITEM',
		'BRAND',
		'MODEL',
		'UOM',
		' QTY',
		' PRICE',
		'TOTAL',

		// 'Amount Received',
	];
	const tableRowsOriginalPo = [];
	const totalRowsOriginalPo = [];
	const totalRowsHistorySummary = [];

	data1?.invoiceHistory?.childData.forEach((item, index) => {
		totalAmountOriginalPo += Number(item.price * item.quantity);

		// eslint-disable-next-line no-unsafe-optional-chaining

		const itemsData = [
			index + 1,
			`${item.item?.machine_part_oem_part?.oem_part_number?.number1}/ ${item.item?.machine_part_oem_part?.oem_part_number?.number2}`,
			item.item?.name,
			item.item?.brand?.name,
			item.item?.machine_part_oem_part?.machine_partmodel?.name,
			item.item?.machine_part_oem_part?.machine_part?.unit?.name,

			item?.quantity ?? 0,
			item?.price ?? 0,
			(item.price * item.quantity).toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}) ?? 0,
		];

		tableRowsOriginalPo.push(itemsData);
	});

	totalRowsOriginalPo.push([
		{
			content: `Total`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content: `${
				totalAmountOriginalPo.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0
			}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);

	totalRowsOriginalPo.push([
		{
			content: `Discount`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				data1.invoiceHistory.discount.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);
	totalRowsOriginalPo.push([
		{
			content: `Total After Discount`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				data1.invoiceHistory.total_after_discount.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);

	totalRowsOriginalPo.push([
		{
			content: `GST`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				data1.invoiceHistory.gst.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);
	totalRowsOriginalPo.push([
		{
			content: `Total After GST`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				data1.invoiceHistory.total_after_gst.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);

	//  Original PO End

	// define the columns we want and their titles
	const tableColumns = [
		'S.No.',
		'OEM/ PART NO',
		'ITEM',
		'BRAND',
		'MODEL',
		'UOM',
		'RETURNED QTY',
		' RETURNED PRICE',
		'TOTAL',
	];
	const tableRows = [];

	let count = 0;
	let count2 = 0;

	data1.invoiceHistory?.Salehistory.forEach((item) => {
		count += 1;
		// totalHistorySummaryTotalAfterDiscount += totalHistorySummarydiscount;
		tableRows.push([
			{
				content: `${count}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'left',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [175, 175, 175],
				},
			},
			{
				content: `Return Date   ${
					moment(item.parentData.return_date).format('DD/MM/YYYY') || ''
				}`,
				colSpan: 9,
				rowSpan: 1,
				styles: {
					halign: 'center',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [175, 175, 175],
				},
			},
			{
				content: ``,
				colSpan: 4,
				rowSpan: 1,
				styles: {
					halign: 'left',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [175, 175, 175],
				},
			},
		]);

		console.log(1111);
		count2 = 0;
		let totalReturned = 0;
		let totalReturnedDiscount = 0;
		let totalReturnedAfterDiscount = 0;
		let totalReturnedTax = 0;
		let totalReturnedAfterTax = 0;
		item.childData.forEach((item3) => {
			count2 += 1;
			totalReturned += item3.quantity * item3.price;
			totalReturnedDiscount = item.parentData.deduction;
			totalReturnedAfterDiscount = totalReturned - totalReturnedDiscount;
			totalReturnedTax = item.parentData.gst;
			totalReturnedAfterTax = totalReturnedAfterDiscount + totalReturnedTax;

			const itemsData = [
				`    ${count2}`,
				`${item3.item?.machine_part_oem_part?.oem_part_number?.number1}/ ${item3.item?.machine_part_oem_part?.oem_part_number?.number2}`,
				item3.item?.name,
				item3.item?.brand?.name,
				item3.item?.machine_part_oem_part?.machine_partmodel?.name,
				item3.item?.machine_part_oem_part?.machine_part?.unit?.name,
				item3.quantity.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) || 0,
				item3.price.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) || '',
				(item3.quantity * item3.price).toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			];
			tableRows.push(itemsData);
		});
		totalHistorySummarytotalReturned += totalReturned;
		totalHistorySummarydiscount += totalReturnedDiscount;

		totalHistorySummaryTotalAfterDiscount += totalReturnedAfterDiscount;
		totalHistorySummaryTaxInFigure += totalReturnedTax;
		totalHistorySummaryTotalAfterTax += totalReturnedAfterTax;
		tableRows.push([
			{
				content: ``,
				colSpan: 5,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					// fillColor: [225, 225, 225],
				},
			},
			{
				content: `Total`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
			{
				content: `${
					totalReturned.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}) ?? 0
				}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
		]);
		tableRows.push([
			{
				content: ``,
				colSpan: 5,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					// fillColor: [225, 225, 225],
				},
			},
			{
				content: `Deduction`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
			{
				content: `${
					totalReturnedDiscount.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}) ?? 0
				}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
		]);
		tableRows.push([
			{
				content: ``,
				colSpan: 5,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					// fillColor: [225, 225, 225],
				},
			},
			{
				content: `Total After Deduction`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
			{
				content: `${
					totalReturnedAfterDiscount.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}) ?? 0
				}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
		]);
		tableRows.push([
			{
				content: ``,
				colSpan: 5,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					// fillColor: [225, 225, 225],
				},
			},
			{
				content: `GST`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
			{
				content: `${
					totalReturnedTax.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}) ?? 0
				}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
		]);
		tableRows.push([
			{
				content: ``,
				colSpan: 5,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					// fillColor: [225, 225, 225],
				},
			},
			{
				content: `Total After GST `,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
			{
				content: `${
					totalReturnedAfterTax.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}) ?? 0
				}`,
				colSpan: 1,
				rowSpan: 1,
				styles: {
					halign: 'right',
					fontStyle: 'bold',
					fontSize: 10,
					fillColor: [225, 225, 225],
				},
			},
		]);
	});

	// totalRowsHistorySummary Starts
	totalRowsHistorySummary.push([
		{
			content: `Total`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content: `${
				totalHistorySummarytotalReturned.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0
			}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);

	totalRowsHistorySummary.push([
		{
			content: `Deduction`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				totalHistorySummarydiscount.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);
	totalRowsHistorySummary.push([
		{
			content: `Total After Deduction`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				totalHistorySummaryTotalAfterDiscount.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);
	totalRowsHistorySummary.push([
		{
			content: `GST`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
		{
			content:
				totalHistorySummaryTaxInFigure.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'normal', fontSize: 11 },
		},
	]);

	totalRowsHistorySummary.push([
		{
			content: `Total After GST`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 11 },
		},
		{
			content:
				totalHistorySummaryTotalAfterTax.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				}) ?? 0,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 11 },
		},
	]);
	// totalRowsHistorySummary Ends

	let yPos = 60;

	// doc.addImage(Logo, 'JPEG', 720, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text(data3?.user?.company_name, pageWidth / 2, 40, { align: 'center' });
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');
	doc.text('Return Sales History', pageWidth / 2, 55, { align: 'center' });

	doc.setFontSize(12);
	doc.setFont(undefined, 'bold');
	doc.text(`Invoice No: ${data1.invoiceHistory.invoice_no}`, 40, 70, { align: 'left' });
	doc.setFont(undefined, 'normal');
	doc.setFontSize(12);
	doc.text(
		`Customer: ${
			data1.invoiceHistory.sale_type === 2
				? data1.invoiceHistory.customer.name
				: data1.invoiceHistory.walk_in_customer_name
		}`,
		40,
		85,
		{ align: 'left' },
	);

	doc.setFont(undefined, 'normal');
	doc.setFontSize(10);
	doc.text(
		`Request Date: ${moment(data1.invoiceHistory?.date || '').format('DD/MM/YYYY')}`,
		pageWidth - 40,
		70,
		{ align: 'right' },
	);
	doc.setFont(undefined, 'normal');
	doc.setFontSize(12);
	doc.text(`Store: ${data1.invoiceHistory.store.name}`, pageWidth - 40, 85, { align: 'right' });
	// doc.text(
	// 	`Receiving Date: ${moment(data1.purchaseOrder.receive_date || '').format('DD/MM/YYYY')}`,
	// 	pageWidth - 40,
	// 	85,
	// 	{ align: 'right' },
	// );
	yPos += 30;
	doc.setFont(undefined, 'bold');
	doc.setFontSize(12);
	// Original PO Starts
	doc.text(`Original Sales`, pageWidth / 2, yPos, { align: 'center' });
	yPos += 5;

	doc.autoTable(tableColumnsOriginalPo, tableRowsOriginalPo, {
		startY: yPos,
		headStyles: {
			fillColor: [217, 217, 214],
			textColor: [0, 0, 0],
			lineWidth: 1,
		},
		bodyStyles: {
			textColor: [0, 0, 0],
			lineWidth: 0.2,
		},
	});
	yPos = doc.lastAutoTable.finalY + 1;
	doc.autoTable(['', ''], totalRowsOriginalPo, {
		startY: yPos,
		// theme: 'grid',
		headStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
			lineWidth: 0,
		},
		bodyStyles: {
			textColor: [0, 0, 0],
			lineWidth: 0.2,
		},
		styles: {
			halign: 'right',
			// fontStyle: 'bold',
			fontSize: 12,
			lineWidth: 0,
			lineColor: [0, 0, 0],
		},
		margin: {
			left: pageWidth - 340,
		},
		columnStyles: {
			0: { cellWidth: 150 },
			1: { cellWidth: 150 },
		},
	});
	yPos = doc.lastAutoTable.finalY + 1;
	// Original PO Ends

	yPos += 15;
	doc.text(`Returned Sales History`, pageWidth / 2, yPos, { align: 'center' });
	yPos += 5;
	doc.autoTable(tableColumns, tableRows, {
		startY: yPos,
		theme: 'grid',
		styles: { fontSize: 10, rowHeight: 10, cellPadding: 1 },
		bodyStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
		},
		headStyles: {
			fillColor: [225, 225, 225],
			textColor: [0, 0, 0],
			lineWidth: 1,
		},
		columnStyles: {
			0: { cellWidth: 40 },
		},
	});
	yPos = doc.lastAutoTable.finalY + 1;
	doc.autoTable(['Returned ', 'Summary'], totalRowsHistorySummary, {
		startY: yPos,
		// theme: 'grid',
		headStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
			lineWidth: 0,
		},
		bodyStyles: {
			textColor: [0, 0, 0],
			lineWidth: 0.2,
		},
		styles: {
			halign: 'right',
			// fontStyle: 'bold',
			fontSize: 12,
			lineWidth: 0,
			lineColor: [0, 0, 0],
		},
		margin: {
			left: pageWidth - 340,
		},
		columnStyles: {
			0: { cellWidth: 150, halign: 'right' },
			1: { cellWidth: 150, halign: 'left' },
		},
	});

	yPos = doc.lastAutoTable.finalY + 20;

	doc.setFontSize(12);

	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.setFontSize(10);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.setFontSize(10);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');

	// Footer Starts
	doc.page = 1;

	doc.page += 1;
	// Footer Ends
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

	// Footer
	let str = `Page ${doc.internal.getNumberOfPages()}`;
	// Total page number plugin only available in jspdf v1.0+
	if (typeof doc.putTotalPages === 'function') {
		str = `${str} of ${doc.internal.getNumberOfPages()}`;
	}
	doc.setFontSize(10);

	// eslint-disable-next-line prefer-destructuring
	// const pageSize = doc.internal.pageSize;
	doc.text(str, 40, pageHeight - 15);
	if (type === 1) {
		doc.save(`Returned Sales History${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
