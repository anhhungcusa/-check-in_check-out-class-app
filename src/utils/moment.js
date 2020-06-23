import moment from 'moment'

export const formatDate = (dateString) => {
    return moment(dateString).format('dddd, DD - MM - YYYY, hh:mm:ss');
}

// YYYYMMDD
export const format = (dateString) => {
    return new moment(dateString).format("YYYYMMDD")
}