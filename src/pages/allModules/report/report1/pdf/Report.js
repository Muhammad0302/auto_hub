// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

// import Logo from '../../../../../assets/logos/logo.png';

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, type, specificItem, startDate, endDate) => {
	// initialize jsPDF
	let data = null;
	try {
		data = Cookies?.get('Data') ? JSON.parse(Cookies?.get('Data')) : null;
	} catch (error) {
		console.error('Error parsing cookies data:', error);
	}
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('l', 'pt', 'a4');
	const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

	// define the columns we want and their titles
	const tableColumns = [
		'S.No.',
		'Oem',
		'Item',
		'Brand',
		'Model',
		'Uom',
		'Type',
		'Qty',
		'Rate',
		'Amount',
		'Cost/unit',
	];
	const tableRows = [];
	let count = 0;
	data1.forEach((item) => {
		// eslint-disable-next-line no-unsafe-optional-chaining
		// total += item?.total_after_discount ?? 0 + item.gst ?? 0;
		if (item.purchaseorderchild && item.purchaseorderchild.length > 0) {
			tableRows.push([
				{
					content: `PO No: ${item.po_no}`,
					colSpan: 2,
					rowSpan: 1,
					styles: {
						halign: 'left',
						fontStyle: 'bold',
						fontSize: 10,
						fillColor: [175, 175, 175],
					},
				},
				{
					content: `Supplier:${item.supplier ? item.supplier.name : 'Direct Purchase'}`,
					colSpan: 2,
					rowSpan: 1,
					styles: {
						halign: 'left',
						fontStyle: 'bold',
						fontSize: 10,
						fillColor: [175, 175, 175],
					},
				},
				{
					content: `Store: ${item.store.name}`,
					colSpan: 4,
					rowSpan: 1,
					styles: {
						halign: 'left',
						fontStyle: 'bold',
						fontSize: 10,
						fillColor: [175, 175, 175],
					},
				},
				{
					content: `Date: ${moment(item.request_date).format('DD-MM-YYYY')}`,
					colSpan: 2,
					rowSpan: 1,
					styles: {
						halign: 'right',
						fontStyle: 'bold',
						fontSize: 10,
						fillColor: [175, 175, 175],
					},
				},
			]);

			const totalExpenses =
				item.purchase_expenses !== null
					? parseFloat(
							item.purchase_expenses.reduce(
								// eslint-disable-next-line no-return-assign
								(a, v) => (a += parseFloat(v !== undefined ? v.amount : 0)),
								0,
							),
					  )
					: 0;
			console.log(totalExpenses, 'totalExpenses');
			count = 0;
			item.purchaseorderchild.forEach((item2) => {
				count += 1;
				// percentAge: (item2.amount * 100) / item.total ?? 0,
				// cost: (((item.amount * 100) / item.total) * t) / 100,
				const costPerItem =
					(((item2.amount * 100) / item.total) * totalExpenses) /
						100 /
						item2.received_quantity ?? 0;
				console.log(costPerItem, 'costPerItem');

				const itemsData2 = [
					count,
					item2.item.machine_part_oem_part.oem_part_number.number1,
					item2.item.machine_part_oem_part.machine_part.name,
					item2.item.brand.name,
					item2.item.machine_part_oem_part.machine_partmodel?.name,
					item2.item.machine_part_oem_part.machine_part.unit.name,

					item2.item.machine_part_oem_part.machine_part.type.name,
					item2.quantity.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}),
					item2.purchase_price.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}),
					item2.amount.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}),
					costPerItem.toLocaleString(undefined, {
						maximumFractionDigits: 2,
					}),
				];

				tableRows.push(itemsData2);
			});
			if (!specificItem) {
				tableRows.push([
					{
						content: `Total Expenses:`,
						colSpan: 2,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
					{
						content: `${totalExpenses.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}:`,
						colSpan: 2,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
					{
						content: `Total:`,
						colSpan: 2,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
					{
						content: `${item.total.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}`,
						colSpan: 4,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
				]);

				tableRows.push([
					{
						content: `Discount:`,
						colSpan: 6,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
					{
						content: `${item.discount.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}`,
						colSpan: 4,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
				]);
				tableRows.push([
					{
						content: `Total After Discount:`,
						colSpan: 6,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
					{
						content: `${item.total_after_discount.toLocaleString(undefined, {
							maximumFractionDigits: 2,
						})}`,
						colSpan: 4,
						rowSpan: 1,
						styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
					},
				]);
			}
		}
	});

	let yPos = 100;

	// doc.addImage(Logo, 'JPEG', 720, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text(data?.user?.company_name, pageWidth / 2, 40, { align: 'center' });

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('Purchase Report', pageWidth / 2, 55, { align: 'center' });
	doc.text(
		`From ${startDate !== '' ? moment(startDate).format('MMMM D, YYYY') : 'Start'} To ${
			endDate !== '' ? moment(endDate).format('MMMM D, YYYY') : 'End'
		}`,
		pageWidth / 2,
		70,
		{ align: 'center' },
	);
	doc.text(`As on  ${moment().format('MMMM D, YYYY')}`, pageWidth / 2, 85, { align: 'center' });

	yPos += 15;
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
	yPos = doc.lastAutoTable.finalY + 20;

	yPos = doc.lastAutoTable.finalY + 20;

	doc.setFontSize(12);

	// doc.text('Logo', 47, 26);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('Kashmir Builders and Developers', 46, 20);
	doc.setFontSize(10);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('ABC Near GT Road Rawalpindi', 47, 26);
	// doc.text('Report II', 47, 32);
	doc.setFontSize(10);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');

	// Footer Starts
	doc.page = 1;
	// doc.text(150, 285, `page ${doc.page}`);
	// doc.text(150, yPos, `Print date: ${Date()}`);
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
		doc.save(`Report1${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
