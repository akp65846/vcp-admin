import Chart from 'react-apexcharts';

const BarChat = ({series, title, label, ...props}) => {

    const options = {
        theme: {
            mode: 'dark',
            palette: 'palette1'
        },
        chart: {
            background: '#272727',
        },
        title: {
            text: title,
            margin: 20
        },
        labels: label
    }

    return (
        <Chart options={options} series={series} type="bar" height={335}/>
    )
}

export default BarChat;