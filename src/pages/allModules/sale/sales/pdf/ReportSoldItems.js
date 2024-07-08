// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js
import Cookies from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

// import Logo from '../../../../../assets/logos/logo.png';

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, type) => {
	let data3 = null;
	try {
		data3 = Cookies?.get('Data') ? JSON.parse(Cookies?.get('Data')) : null;
	} catch (error) {
		console.error('Error parsing cookies data:', error);
	}
	// initialize jsPDF

	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');
	const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

	// define the columns we want and their titles
	const tableColumns = [
		'S.No.',
		'Invoice No',
		'Customer',
		'Date',
		'Part',
		'Unit',
		'Qty',
		'Rate',
		'Total',
		// 'Amount Received',
	];
	const tableRows = [];
	let total = 0;
	data1.forEach((item, index) => {
		// eslint-disable-next-line no-unsafe-optional-chaining
		total += item.price * item.quantity;
		const itemsData = [
			index + 1,
			item.invoice_no?.invoice_no,
			item.invoice_no.customer
				? item.invoice_no.customer.name
				: item.invoice_no.walk_in_customer_name,
			moment(item.date).format('DD/MM/YYYY'),

			`${item.item.machine_part_oem_part.oem_part_number.number1}-${item.item.machine_part_oem_part.machine_part.name}`,
			item.item.machine_part_oem_part.machine_part.unit.name,
			item.quantity.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			item.price.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			(item.price * item.quantity).toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			// item.walk_in_customer_name,
			// item.remarks,
			// item.total_amount ?? 0,
			// item.discount ?? 0,
			// item.total_after_discount ?? 0,
			// item.received_amount,
		];

		tableRows.push(itemsData);
	});

	tableRows.push([
		{
			content: `Total:`,
			colSpan: 6,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${total.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 2,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	]);

	// doc.autoTable(tableColumns, tableRows, {
	// 	startY: yPos,
	// 	theme: 'grid',
	// 	columnStyles: { 4: { fillColor: '#f2f2f2' } },
	// 	styles: { fontSize: 8, theme: 'grid' },
	// 	headStyles: { fillColor: '#808080' },
	// });

	// let count = 0;
	// let count2 = 0;

	// data1.forEach((data) => {
	// 	count += 1;

	// 	tableRowsPayments.push([
	// 		{
	// 			content: `${count}`,
	// 			colSpan: 1,
	// 			rowSpan: 1,
	// 			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
	// 		},
	// 		{
	// 			content: `Transfer: ${data.registry_no}`,
	// 			colSpan: 3,
	// 			rowSpan: 1,
	// 			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
	// 		},

	// 	]);
	// 	count2 = 0;
	// 	data.files.forEach((data2) => {
	// 		count2 += 1;
	// 		data2.purchasers.forEach((d) => {
	// 			purchasers = `${purchasers}${d.id}-${d.purchaser_name},\n`;
	// 		});
	// 		data2.sellers.forEach((d) => {
	// 			owners = `${owners}${d.id}-${d.seller_name},\n`;
	// 		});

	// 		// totalLand += (data2.totalLand);
	// 		const TableData = [
	// 			count2,

	// 			data2.mouza_name,
	// 			data2.file_no,
	// 			data2.file_name,
	// 			purchasers,
	// 			// owners,
	// 			// `${data2.totalLand.kanal}-${data2.totalLand.marla}-${data2.totalLand.sarsai}-${data2.totalLand.feet}`,
	// 			// moment(data.lands.purchase_date).format('DD/MM/YYYY'),
	// 		];
	// 		// owners = '';
	// 		purchasers = '';
	// 		tableRowsPayments.push(TableData);
	// 	});
	// });

	// tableRowsPayments.push([
	// 	{
	// 		content: `Total`,
	// 		colSpan: 6,
	// 		rowSpan: 1,
	// 		styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
	// 	},

	// ]);

	// startY is basically margin-top

	let yPos = 100;

	// doc.addImage(Logo, 'JPEG', 720, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text(data3?.user?.company_name, pageWidth / 2, 40, { align: 'center' });

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('Sales Sold Part Report', pageWidth / 2, 55, { align: 'center' });
	// doc.text(`${mouzaName}`, pageWidth / 2, 70, { align: 'center' });

	// doc.setFont(undefined, 'normal');

	yPos -= 20;

	doc.text(`Sales:`, 45, yPos);
	yPos += 15;
	doc.autoTable(tableColumns, tableRows, {
		startY: yPos,
		styles: { fontSize: 8 },
		columnStyles: {
			0: { cellWidth: 40 },
		},
	});
	yPos = doc.lastAutoTable.finalY + 20;

	doc.text(`Date Printed:`, pageWidth - 180, yPos, {
		align: 'right',
	});
	doc.text(`__________________`, pageWidth - 40, yPos, {
		align: 'right',
	});
	doc.text(`${moment().format('DD/MM/YYYY hh:mm:ss a')}`, pageWidth - 40, yPos, {
		align: 'right',
	});
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
		doc.save(`TransferReport${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
