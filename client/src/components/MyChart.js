import React from 'react'
import {Bar} from 'react-chartjs-2'

class  MyChart extends React.Component{
    render(){
        var dataPoints = [];
        var y = 0;
        var max = 30;
        var min = 0;

        for (var i = 0; i < 10; i += 1) {
			y = Math.round(Math.random() * (max-min+1)+min);
			dataPoints.push(y);
        }

        const data = {
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'],
            datasets:[
                {
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                    data: dataPoints,
                    borderColor: ['rgba(255, 206, 86, 0.2)'],
                    pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
                    pointBorderColor: 'rgba(255, 206, 86, 0.2)',
                    backgroundColor:'rgb(183, 216, 214)',
                },
            ]
        }

        const options = {
            title: {
                display: true,
                text: 'Popular Times'
            },
            legend:{
                display: false
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:30,
                        stepsize:5,
                        display: false
                    },
    
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }

        return <Bar data={data} options={options}/>
    }
    
}

export default MyChart