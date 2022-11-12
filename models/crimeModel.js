const db = require('../data/database/db')

class CrimeData {
    constructor({ borough_name, period=null, offence_category, offence_count }) {
        this.borough_name = borough_name
        this.period = period
        this.offence_category = offence_category
        this.offence_count = offence_count
}

    // get average crime count by borough 
    static async getCrimeByBorough(boroughName) {
        const population = 400000
        const popPer1000 = population/1000
        const response = await db.query(`SELECT (SUM(offence_count::real)/6)/$2 AS six_month_crime_rate_per_1000 FROM "public"."crime_data" 
        WHERE period IN (SELECT DISTINCT period FROM crime_data ORDER BY period DESC LIMIT 6) AND borough_name = $1`, [boroughName, popPer1000])

        // console.log(response.rows[0])
        return response.rows[0]
    }

    static async getCrimeByTypes(boroughName, crimeCategories) {
        const population = 400000
        const popPer1000 = population/1000
        const crimeCategoriesJoined = crimeCategories.map(elem => `'${elem}'`).join(', ')
        // console.log(crimeCategoriesJoined)

        let crimeStats = []
        for (const category of crimeCategories) {
            const response = await db.query(`SELECT borough_name, offence_category, (SUM(offence_count::real)/6)/$2 AS offence_count FROM crime_data WHERE borough_name = $1 AND period IN (SELECT DISTINCT period FROM crime_data ORDER BY period DESC LIMIT 6) AND offence_category = $3 GROUP BY offence_category, borough_name`, [boroughName, popPer1000, category])
            // console.log(response.rows)

            crimeStats.push(new CrimeData(response.rows[0]))
        }
        

        return crimeStats
    }
}

module.exports = CrimeData
