import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {HorizontalBar} from 'react-chartjs-2';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { fetchAllReviews } from '../../actions/review_actions';
import { median } from '../../util/number_util';
import ReviewIndex from '../reviews/Index'



export default function Graphs ({review, avgWage, avgSalary, displayedReviews}){
    Chart.defaults.global.legend.display = false;
    const [chartData, setChartData] = useState({});
    const [locationAvg, setLocationAvg] = useState();
    const [storeAvg, setStoreAvg] = useState();

    function shopComp(){
        let sumWages = 0;
        let wages = [];
        let salaries = [];
        let sumSalaries = 0;
        let i = 0;

        while(i < displayedReviews.length) {
            if(review.shopName === displayedReviews[i].shopName) {
                if (displayedReviews[i].payFrequency === "Hourly") {
                    wages.push(displayedReviews[i].wage)
                    sumWages += displayedReviews[i].wage
                } else {
                    salaries.push(displayedReviews[i].wage)
                    sumSalaries += displayedReviews[i].wage
                }
            }
            i++
        }
        return (sumWages/wages.length).toFixed(2)
    }


    function locationComp(){
        let storage = [];
        let i = 0
        while(i < displayedReviews.length) {
            if(review.location === displayedReviews[i].location && displayedReviews[i].payFrequency === 'Hourly') {
                storage.push(displayedReviews[i].wage)
            }
            i++
        }
        return median(storage)
    }

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 230;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1.0 + ')';
    }

    const chart = () => {
        setChartData({
            labels: ['Current Wage', review.shopName + ' Avg Wage', review.location + ' Median Wage', 'National Average Wage'],
            title: 'review.shopName',
            datasets: [
                {
                    data: [review.wage, shopComp(), locationComp(), avgWage.toFixed(2)], 
                    backgroundColor: [
                        random_rgba(),
                        random_rgba(),
                        random_rgba(),
                        random_rgba()
                    ],
                    borderWidth: 4,
                }
            ]
        })
    }

    useEffect(() => {
        chart()
        shopComp()
    }, []);

    return(
        <div className = 'chart'>
            <HorizontalBar    
                data={chartData}
                width={675}
                height={115}
                options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                        }]
                    } 
                }}
            />
        </div>
    )
}