import Chart from "react-apexcharts";

const RadiaBarChart = ({label, series, title, total, ...props}) => {
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
        plotOptions : {
            radialBar: {
                dataLabels: {
                    total: {
                        show: true,
                        label: 'Total Published',
                        formatter: (() => total)
                    }
                }
            }
        },
        // plotOptions: {
        //     radialBar: {
        //         dataLabels: {
        //             // name: {
        //             //     fontSize: '22px',
        //             // },
        //             // value: {
        //             //     fontSize: '16px',
        //             // },
        //             // total: {
        //             //     show: true,
        //             //     label: 'Total',
        //             //     formatter: function (w) {
        //             //         return 249
        //             //     }
        //             // }
        //         }
        //     }
        //     // radialBar: {
        //     //     offsetY: 0,
        //     //     startAngle: 0,
        //     //     endAngle: 270,
        //     //     hollow: {
        //     //         margin: 5,
        //     //         size: '30%',
        //     //         background: 'transparent',
        //     //         image: undefined,
        //     //     },
        //     //     dataLabels: {
        //     //         name: {
        //     //             show: false,
        //     //         },
        //     //         value: {
        //     //             show: false,
        //     //         }
        //     //     }
        //     // }
        // },
        labels: label,
        legend: {
            show: true,
            floating: true,
            // fontSize: '16px',
            // position: 'left',
            // offsetX: 50,
            // offsetY: 50,
            // labels: {
            //     useSeriesColors: true,
            // },
            // markers: {
            //     size: 0
            // },
            // formatter: function(seriesName, opts) {
            //     return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            // },
            // itemMargin: {
            //     vertical: 3
            // }
        },
    }

    return (
        <Chart options={options} series={series} type="radialBar" height={335}/>
    )
}

export default RadiaBarChart;