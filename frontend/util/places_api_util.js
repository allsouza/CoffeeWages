import * as keys from '../../config/keys/keys'

export const search = terms => {
    const query = `${terms.address} ${terms.name}`.split(' ').join('%')
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&radius=5000&key=AIzaSyCX6xmOF_IXMfaN-75IobeJrPvQ4uAmUPk`
    return fetch(url).then(res => res.json())
}