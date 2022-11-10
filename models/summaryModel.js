class Summary {
    constructor({ borough_name, average_monthly_rent, rent_below_london_average=false }) {
        this.borough_name = borough_name
        this.average_monthly_rent = average_monthly_rent
        this.rent_below_london_average = rent_below_london_average
    }

    static async getOneByName(boroughName) {

    }
}
