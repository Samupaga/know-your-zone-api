const RentalData = require('./rentModel')
const CrimeData = require('./crimeModel')

class Summary {
    constructor(borough_name, average_monthly_rent, rent_below_london_average=false, crime_rate_per_1000) {
        this.borough_name = borough_name
        this.average_monthly_rent = average_monthly_rent
        this.rent_below_london_average = rent_below_london_average
        this.crime_rate_per_1000 = crime_rate_per_1000
    }

    static async getOneByName(boroughName) {
        const rentalResponse = await RentalData.getRentByBorough(boroughName)
        const crimeResponse = await CrimeData.getCrimeByBorough(boroughName)
        return new Summary(boroughName, rentalResponse.rent_median, false, crimeResponse);
    }
}

module.exports = Summary
