const db = require('../data/database/db')

class RentalData {
    constructor({ borough_name, period_start_date, period_end_date, property_type, rent_median, rent_mean }){
        this.borough_name = borough_name
        this.period_start_date = period_start_date
        this.period_end_date = period_end_date
        this.property_type = property_type
        this.rent_median = rent_median
        this.rent_mean = rent_mean
    }

    static async getAllLondon() {
        const response = await db.query(`SELECT period_start_date, period_end_date, property_type, AVG(rent_median) as rent_median, AVG(rent_mean) as rent_mean
        FROM rental_data
        JOIN borough ON rental_data.borough_id = borough.id
        WHERE property_type = 'All categories' AND period_end_date = (SELECT DISTINCT period_end_date FROM rental_data ORDER BY period_end_date DESC LIMIT 1)
        GROUP BY period_start_date, period_end_date, property_type`)

        return new RentalData(Object.assign({borough_name: "London"}, response.rows[0]))
    }

    static async getRentByBorough(boroughName) {
        const response = await db.query("SELECT borough_name, period_start_date, period_end_date, property_type, rent_median, rent_mean FROM rental_data JOIN borough ON rental_data.borough_id = borough.id WHERE borough_name = $1 AND property_type = 'All categories' ORDER BY period_start_date DESC", [boroughName])

        return response.rows.map(elem => new RentalData(elem))
    }

    static async getRentPerCategoryByBorough(borough_name) {
        const response = await db.query("SELECT borough_name, period_start_date, period_end_date, property_type, rent_median, rent_mean FROM rental_data JOIN borough ON rental_data.borough_id = borough.id WHERE borough_name = $1 AND property_type != 'All categories' AND period_end_date = (SELECT DISTINCT period_end_date FROM rental_data ORDER BY period_end_date DESC LIMIT 1) ORDER BY property_type", [borough_name])

        return response.rows.map(elem => new RentalData(elem))
    }
}

module.exports = RentalData;
