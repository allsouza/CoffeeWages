import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/user_actions';
import Chart from 'chart.js';
import {Scatter} from 'react-chartjs-2';

// class Chart extends Component {

// }

export default function Graphs (){
    const [chartData, setChartData] = useState({})
    const chart = () => {
        setChartData({
            // labels: ['Monday', 'Tuesday', 'Wed'],
            label: 'Scatter Dataset',
            datasets: [
                {
                    label: 'level of thickness',
                    // data: [32, 45, 23],
                    data:[
                        {
                        x: 0,
                        y: 32
                        },
                         {
                        x: 10,
                        y: 45
                        }, {
                        x: 20,
                        y: 23
                        },
                ],
                    backgroundColor: [
                        'blue',
                        'yellow',
                        'red'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    }, [])
    return(
        <div className = 'chart'>
            <Scatter    
                data = {chartData}
                // width = {100}
                // height={50}
                // options={{
                //     maintainAspectRation: false
                // }}
            />
        </div>
    )
}