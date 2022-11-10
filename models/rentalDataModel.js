const db = require('../data/database/db')

class rentalData {
    constructor({ id, borough_name, period_start_date, period_end_date, property_type, rent_median, rent_mean }){
        this.id= id
        this.borough_name= borough_name
        this.period_start_date= period_start_date
        this.period_end_date= period_end_date
        this.property_type= property_type
        this.rent_median= rent_median
        this.rent_mean= rent_mean
    }

    static async latestRentalDataByBorough(boroughName) {
        const response = await db.query("SELECT * FROM ")
    }
}
