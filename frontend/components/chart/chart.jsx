import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Bar} from 'react-chartjs-2';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { fetchAllReviews } from '../../actions/review_actions';
import { median } from '../../util/number_util';
import ReviewIndex from '../reviews/Index'



export default function Graphs ({review, avgWage, displayedReviews}){
    const [chartData, setChartData] = useState({});
    const [locationAvg, setLocationAvg] = useState();
    const [storeAvg, setStoreAvg] = useState();
   

    function shopComp(){
        let sum = 0;
        let storage = [];
        let i = 0
        while(i < displayedReviews.length) {
            if(review.shopName === displayedReviews[i].shopName) {
                storage.push(displayedReviews[i].wage)
            }
            i++
        }
        for(let i = 0; i < storage.length; i++) {
            sum+=storage[i]
        }
        return (sum/storage.length).toFixed(2)
    }

    function locationComp(){
        let sum = 0;
        let storage = [];
        let i = 0
        while(i < displayedReviews.length) {
            if(review.location === displayedReviews[i].location && displayedReviews[i].payFrequency === "Hourly" && !(displayedReviews[i].position.includes("Manager"))) {
                storage.push(displayedReviews[i].wage)
            }
            i++
        }
        for(let i = 0; i < storage.length; i++) {
            sum+=storage[i]
        }
        // return (sum/storage.length).toFixed(2)
        let mid = Math.floor(storage.length)/2
        return storage[mid]
    }

    const chart = () => {
        // debugger
     
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