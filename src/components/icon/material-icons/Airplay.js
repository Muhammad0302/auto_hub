import * as React from 'react';

function SvgAirplay(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			className='svg-icon'
			{...props}>
			<g fill='none'>
				<path d='M0 0h24v24H0z' />
				<path d='M0 0h24v24H0z' />
				<path d='M0 0h24v24H0z' />
			</g>
			<path d='M6 22h12l-6-6z' />
			<path d='M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
		</svg>
	);
}

export default SvgAirplay;
