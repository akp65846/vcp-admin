import Chart from 'react-apexcharts';

const DonutChart = ({label, series, title, ...props}) => {

    const options = {
        theme: {
            mode: 'dark',
            palette: 'palette1'
        },
        chart: {
            background: '#272727',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: title,
            margin: 20
        },
        series: [{
            data: series
        }]
        // labels: label
    }


    return (
        <Chart options={options} series={series} type="donut" height={335}/>
    )
}

export default DonutChart;