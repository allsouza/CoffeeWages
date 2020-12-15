import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export const fetchShopReviews = (businessId) => {
    return $.ajax({
        url: `/api/businesses/${businessId}/reviews`,
    });
};

export const fetchReviews = (filters) => {
    return $.ajax({
        url: `/api/reviews`,
        data: filters
    });
};

export const fetchBusinessReviews = (name, location) => {
    return $.ajax({
        url: 'api/search_location',
        data: {location, name}
    })
}

export const fetchReview = (review_id) => {
    return $.ajax({
        url: `/api/reviews/${review_id}`
    });
};

export const createReview = review => {
    return $.ajax({
        url: `/api/reviews`,
        method: "POST",
        data: { review }
    });
};

export const updateReview = review => {
    return $.ajax({
        url: `/api/reviews/${review.id}`,
        method: "PATCH",
        data: { review }
    });
};

export const deleteReview = reviewId => {
    return $.ajax({
        url: `/api/reviews/${reviewId}`,
        method: "DELETE"
    });
};