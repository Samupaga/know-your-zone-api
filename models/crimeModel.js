const db = require('../data/database/db')

class CrimeData {
    constructor({ borough_name, period=null, offence_category, offence_count }) {
        this.borough_name = borough_name
        this.period = period
        this.offence_category = offence_category
        this.offence_count = offence_count
}

    // get average crime count by for london
    static async getAllLondon() {
        const population = 8.982e6
        const popPer1000 = population/1000
        const response = await db.query(`SELECT (SUM(offence_count::real)/6)/$1 AS london_six_month_crime_rate FROM "public"."crime_data" WHERE period IN (SELECT DISTINCT period FROM crime_data ORDER BY period DESC LIMIT 6)`, [popPer1000])

        return response.rows[0]
    }

    static async getCrimeByBorough(boroughName) {
        const pop_response = await db.query('SELECT total_population FROM ethnicity_data JOIN borough ON ethnicity_data.borough_id = borough.id WHERE borough_name = $1', [boroughName])
        const population = pop_response.rows[0].total_population/1000
        const response = await db.query(`SELECT (SUM(offence_count::real)/12)/$2 AS six_month_crime_rate_per_1000 FROM "public"."crime_data" JOIN borough ON crime_data.borough_id = borough.id WHERE period IN (SELECT DISTINCT period FROM crime_data ORDER BY period DESC LIMIT 12) AND borough_name = $1`, [boroughName, population])

        return response.rows[0]
    }

    static async getCrimeHistoryByBorough(boroughName) {
        const pop_response = await db.query('SELECT total_population FROM ethnicity_data JOIN borough ON ethnicity_data.borough_id = borough.id WHERE borough_name = $1', [boroughName])
        const population = pop_response.rows[0].total_population/1000
        const response = await db.query(`SELECT period, (SUM(offence_count::real))/$2 AS crime_rate FROM "public"."crime_data" JOIN borough ON crime_data.borough_id = borough.id AND borough_name = $1 GROUP BY period ORDER BY period DESC`, [boroughName, population])

        return response.rows
    }

    static async getCrimeByTypes(boroughName, crimeCategories) {
        const crimeCategoriesJoined = crimeCategories.map(elem => `'${elem}'`).join(', ')

        let crimeStats = []
        for (const category of crimeCategories) {
            const response = await db.query(`SELECT borough_name, offence_category, SUM(offence_count) as offence_count FROM crime_data JOIN borough ON crime_data.borough_id = borough.id WHERE borough_name = $1 AND period IN (SELECT DISTINCT period FROM crime_data ORDER BY period DESC LIMIT 12) AND offence_category = $2 GROUP BY offence_category, borough_name`, [boroughName, category])

            crimeStats.push(new CrimeData(response.rows[0]))
        }
        

        return crimeStats
    }
}

module.exports = CrimeData
