import $ from 'jquery';
$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

export const fetchBusinesses = () => {
    return $.ajax({
        url: '/api/businesses'
    })
}

export const fetchBusiness = (business_id) => {
    return $.ajax({
        url: `/api/businesses/${business_id}`
    })
}

export const createBusiness = business => {
    return $.ajax({
        url: '/api/businesses',
        method: "POST",
        data: {business}
    })
}