// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useFormik } from 'formik';
// ** apiClient Imports

import moment from 'moment';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import Spinner from '../../../../components/bootstrap/Spinner';
import { _titleError, _titleSuccess } from '../../../../notifyMessages/erroSuccess';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import apiClient from '../../../../baseURL/apiClient';
import Button from '../../../../components/bootstrap/Button';
// import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};
	if (!values.rack_number) {
		errors.rack_number = 'Required';
	}
	return errors;
};

// eslint-disable-next-line react/prop-types
const RacksEdit = ({ editingItem, handleStateEdit }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	// useEffect(() => {

	// }, [])

	const formik = useFormik({
		initialValues: editingItem,
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	const submitForm = (data) => {
		apiClient
			.post(`/updateRack`, data)
			.then((res) => {
				if (res.data.status === 'ok') {
					formik.resetForm();
					// showNotification(_titleSuccess, res.data.message, 'success');
					handleStateEdit(false);
					setIsLoading(false);
					setLastSave(moment());
				} else {
					setIsLoading(false);
					// showNotification(_titleError, res.message, 'Danger');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				// showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					// showNotification(_titleError, err.response.data.message, 'Danger');
				}
				setIsLoading(false);
			});
	};

	const handleChange = (e) => {
        const newValue = e.target.value;

        // Update only the rack_number property
        formik.setValues({
            ...formik.values,
            rack_number: newValue,
        });
    };

	const handleSave = () => {
		submitForm(formik.values);
		setLastSave(moment());
	};


	return (
		<div className='col-12'>
			<Card stretch tag='form' onSubmit={formik.handleSubmit}>
				<CardBody>
					<div className='row g-2'>
						<div className='col-md-12'>
							<FormGroup id='rack' label='Rack' className='col-md-12'>
								<Input
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.rack_number}
									isValid={formik.isValid}
									isTouched={formik.touched.rack_number}
									invalidFeedback={formik.errors.rack_number}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
					</div>
				</CardBody>
				<CardFooter>
					<CardFooterLeft>
						<Button type='reset' color='info' isOutline onClick={formik.resetForm}>
							Reset
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							className='me-3'
							icon={isLoading ? null : 'Update'}
							isLight
							color={lastSave ? 'info' : 'success'}
							isDisable={isLoading}
							onClick={formik.handleSubmit}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading
								? (lastSave && 'Updating') || 'Updating'
								: (lastSave && 'Update') || 'Update'}
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</div>
	);
};
RacksEdit.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	editingItem: PropTypes.object.isRequired,
	// handleStateEdit: PropTypes.function.isRequired,
};

export default RacksEdit;
