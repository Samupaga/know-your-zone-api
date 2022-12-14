const RentalData = require('./rentModel')
const CrimeData = require('./crimeModel')
const db = require('../data/database/db')

class Summary {
    constructor(borough_name, average_monthly_rent, rent_below_london_average, crime_rate_per_1000, crime_below_london_average, second_lang, motto, expect, checkout) {
        this.borough_name = borough_name
        this.average_monthly_rent = average_monthly_rent
        this.rent_below_london_average = rent_below_london_average
        this.crime_rate_per_1000 = crime_rate_per_1000
        this.crime_below_london_average = crime_below_london_average
        this.second_lang = second_lang
        this.motto = motto
        this.expect = expect
        this.checkout = checkout
    }

    static async getBoroughMotto(boroughName) {
        const response = await db.query("SELECT motto FROM borough WHERE borough_name = $1", [boroughName])

        return response.rows[0].motto
    }

    static async getBoroughLang(boroughName) {
        const response = await db.query("SELECT second_lang FROM borough WHERE borough_name = $1", [boroughName])

        return response.rows[0].second_lang
    }

    static async getBoroughExpect(boroughName) {
        const response = await db.query("SELECT expect FROM borough WHERE borough_name = $1", [boroughName])

        return response.rows[0].expect
    }

    static async getBoroughCheck(boroughName) {
        const response = await db.query("SELECT checkout FROM borough WHERE borough_name = $1", [boroughName])

        return response.rows[0].checkout
    }

    static async getOneByName(boroughName) {
        const rentalResponse = await RentalData.getRentByBorough(boroughName)
        const medianRent = rentalResponse[0].rent_median
        const londonRentResponse = await RentalData.getAllLondon()
        const rentBelowLondon = medianRent < londonRentResponse.rent_median

        const crimeResponse = await CrimeData.getCrimeByBorough(boroughName)
        const londonCrimeResponse = await CrimeData.getAllLondon()
        const crimeBelowLondon = crimeResponse.six_month_crime_rate_per_1000 < londonCrimeResponse.london_six_month_crime_rate

        const second_lang = await Summary.getBoroughLang(boroughName)

        const motto = await Summary.getBoroughMotto(boroughName)

        const expect = await Summary.getBoroughExpect(boroughName)

        const checkout = await Summary.getBoroughCheck(boroughName)

        return new Summary(boroughName, medianRent, rentBelowLondon, crimeResponse.six_month_crime_rate_per_1000, crimeBelowLondon, second_lang, motto, expect, checkout);
    }
}

module.exports = Summary
