import $ from 'jquery';

export const search = terms => {
    const query = `${terms.address} ${terms.name}`.split(' ').join('%')
    $.ajax({
        url: '/api/search',
        data: {terms: query}
    })
}