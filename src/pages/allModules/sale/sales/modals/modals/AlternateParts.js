import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../../../../components/bootstrap/Modal';
import Button from '../../../../../../components/bootstrap/Button';

const AlternatePartsModal = ({ isOpen, toggle, data, data2 }) => {
	if (Array.isArray(data2)) {
		return (
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					Alternate Parts
					<Button color='secondary' onClick={toggle}>
						Close
					</Button>
				</ModalHeader>
				<ModalBody>
					<table className='table'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Quantity</th>
								<th>Sale Price</th>
							</tr>
						</thead>
						<tbody>
							{data2.map((item, index) => (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.label}</td>
									<td>{data[index]?.quantity || 0}</td>
									<td>{data[index]?.sale_price || 0}</td>
								</tr>
							))}

							{/* {data.map((item) => (
								<tr key={item.id}>
									<td>{item?.quantity || 0}</td>
									<td>{item?.sale_price || 0}</td>
								</tr>
							))} */}
						</tbody>
					</table>
				</ModalBody>
			</Modal>
		);
	}
	return null;
};

export default AlternatePartsModal;
