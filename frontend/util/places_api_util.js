import * as keys from '../../config/keys/keys'

export const search = terms => {
    const query = `${terms.location} ${terms.business}`.split(' ').join('%')
    return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&radius=5000&key=${keys.googlePlaces}`)
}