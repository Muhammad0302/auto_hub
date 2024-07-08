import React from 'react';
import Modal, { ModalBody, ModalHeader } from '../../../../../../components/bootstrap/Modal';
import Button from '../../../../../../components/bootstrap/Button';

const AlternateBrandsModal = ({ isOpen, toggle, data }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={toggle}>
				Brands Available
				<Button color='secondary' onClick={toggle}>
					Close
				</Button>
			</ModalHeader>
			<ModalBody>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Part Number</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((brand) => {
							return (
								<tr key={brand.id}>
									<td>{brand.name}</td>
									<td>{brand.number3}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</ModalBody>
		</Modal>
	);
};

export default AlternateBrandsModal;
