import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/user_actions';
import Chart from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { fetchAllReviews } from '../../actions/review_actions';

// class Chart extends Component {

// }

export default function Graphs ({review}){
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [avgWage, setAvgWage] = useState();
    const [omitted, setOmitted] = useState();
    const [chartData, setChartData] = useState({});

        function calcAvgAndMedian() {
        let sum = 0;
        let wages = [];
        let numOmitted = 0;
        for (let i = 0; i < review.length; i++) {
            // const review = review[i];
            if (review.payFrequency === "Hourly") {
                sum += review.wage;
                wages.push(review.wage);
            } else {
                numOmitted += 1;
            }
        }

        setOmitted(numOmitted);
        setAvgWage(sum / (review.length - numOmitted));
    }
    const chart = () => {
        setChartData({
            labels: [review.shopName, 'Average Wage', 'Wed'],
            title: 'review.location',
            datasets: [
                {
                    
                    label: review.shopName,
                    // data: [32, 45, 23],
                    data:[
                        {
                        x: review.shopName,
                        y: review.wage},
                        {
                        x: 1,
                        y: avgWage
                        }
                        // },
                        //  {
                        // x: 10,
                        // y: 45
                        // }, {
                        // x: 20,
                        // y: 23
                        // },
                ],
                    options: {
                        title: {
                            display: true,
                            text: review.shopName
                        }
                    },
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                        'yellow',
                        'red'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

        useEffect(() => {
        calcAvgAndMedian(), chart();
    }, []);

    // useDeepCompareEffect(() => {
    //     setDisplayedReviews(reviews);
    // }, [reviews]);

    // useEffect(() => {
    //     chart()
    // }, [])
    return(
        <div className = 'chart'>
            <Bar    
                data = {chartData}
                width = {400}
                height={420}
                options={{
                    // maintainAspectRation: false
                }}
            />
        </div>
    )
}