import * as BusinessApiUtil from '../util/business_api_util'

export const RECEIVE_ALL_BUSINESSES = "RECEIVE_ALL_BUSINESSES"
export const RECEIVE_BUSINESS = "RECEIVE_BUSINESS"

const receiveBusiness = business => ({
    type: RECEIVE_BUSINESS,
    business
})

const receiveAllBusinesses = businesses => ({
    type: RECEIVE_ALL_BUSINESSES,
    businesses
})

export const fetchAllBusinesses = () => dispatch => {
    return BusinessApiUtil.fetchBusinesses().then( businesses => dispatch(receiveAllBusinesses(businesses)))
}

export const createBusiness = business => dispatch => {
    return BusinessApiUtil.createBusiness(business).then( business => dispatch(receiveBusiness(business)), err => {console.log(err)})
}