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
            if(review.location === displayedReviews[i].location && displayedReviews[i].payFrequency === 'Hourly') {
                storage.push(displayedReviews[i].wage)
            }
            i++
        }
        for(let i = 0; i < storage.length; i++) {
            sum+=storage[i]
        }
        let sorted = storage.sort((a,b)=> a-b)
        let mid_even = sorted[Math.floor((sorted.length - 1) / 2)]
        let mid_odd = sorted[Math.floor(sorted.length/2)]
        if(sorted.length % 2 === 1) {
            return mid_odd
        } else if (sorted.length % 2 === 0) {
            return mid_even
        }
    }

    function random_rgba() {
    var o = Math.round, r = Math.random, s = 230;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1.0 + ')';
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
                         random_rgba(),
                        random_rgba(),
                        random_rgba()
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