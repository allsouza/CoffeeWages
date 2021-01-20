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
        debugger
        setChartData({
            labels: ['Current Wage', review.shopName + ' Avg Wage', review.location + ' Median Wage', 'National Average Wage'],
            title: 'review.shopName',
            datasets: [
                {
                    
                    label: review.shopName,
                    data: [[0,review.wage], [0, shopComp()],[0,locationComp()], [0, avgWage.toFixed(2)]], 
                    options: {
                        title: {
                            display: true,
                            text: review.shopName
                        }
                    },
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