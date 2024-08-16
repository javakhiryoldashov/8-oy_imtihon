import React, { lazy, useEffect, useState } from 'react';

const ReactApexChart = lazy(() => import('react-apexcharts'));

const ApexChart = ({ data }) => {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		if (data && Array.isArray(data)) {
			const formattedData = data.map(item => ({
				x: new Date(item[0]).toISOString(),
				y: item[1],
			}));
			setChartData([{ name: 'Price', data: formattedData }]);
		}
	}, [data]);

	const options = {
		chart: {
			type: 'area',
			stacked: false,
			height: 350,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
			toolbar: {
				autoSelected: 'zoom',
			},
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			size: 0,
		},
		title: {
			text: 'Crypto Price Movement',
			align: 'left',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 90, 100],
			},
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return val.toFixed(2);
				},
			},
			title: {
				text: 'Price',
			},
		},
		xaxis: {
			type: 'datetime',
		},
		tooltip: {
			shared: false,
			y: {
				formatter: function (val) {
					return val.toFixed(2);
				},
			},
		},
	};

	return (
		<div>
			<ReactApexChart options={options} series={chartData} type='area' width={1100} height={550} />
		</div>
	);
};

export default ApexChart;
