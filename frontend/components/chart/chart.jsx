import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Bar} from 'react-chartjs-2';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { fetchAllReviews } from '../../actions/review_actions';
import { median } from '../../util/number_util';
import ReviewIndex from '../reviews/Index'



export default function Graphs ({review, avgWage, avgSalary, displayedReviews}){
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
            if(review.location === displayedReviews[i].location && displayedReviews[i].payFrequency === "Hourly" && !(displayedReviews[i].position.includes("Manager"))) {
                storage.push(displayedReviews[i].wage)
            }
            i++
        }
        return median(storage)
    }

    const chart = () => {
        setChartData({
            labels: ['Current Wage', review.shopName + ' Avg Wage', 'City Wide Median Wage'],
            title: 'review.shopName',
            datasets: [
                {
                    
                    label: review.shopName,
                    data: [[0,review.wage], [0, shopComp()],[0,locationComp()]], 
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
        chart()
    }, []);

    useEffect(() => {
        shopComp()
    }, []);

    return(
        <div className = 'chart'>
            <Bar    
                data = {chartData}
                width = {400}
                height={415}
            />
        </div>
    )
}