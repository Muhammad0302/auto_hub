import * as React from 'react';

function SvgNutFill(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M4.58 1a1 1 0 00-.868.504l-3.428 6a1 1 0 000 .992l3.428 6A1 1 0 004.58 15h6.84a1 1 0 00.868-.504l3.429-6a1 1 0 000-.992l-3.429-6A1 1 0 0011.42 1H4.58zm5.018 9.696a3 3 0 11-3-5.196 3 3 0 013 5.196z' />
		</svg>
	);
}

export default SvgNutFill;
