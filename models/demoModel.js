const db = require('../data/database/db');

class DemoData {
    constructor (borough_name, type, category_names, ranked, data) {
        this.borough_name = borough_name
        this.type = type
        this.category_names = category_names
        this.ranked = ranked
        this.data = data
    }
    }

    static async getEthnicityByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, white, black, asian, other FROM ethnicity_data JOIN borough ON ethnicity_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }

    static async getReligionByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, no_religion, total FROM religion_data JOIN borough ON religion_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }

    static async getWellbeingByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, life_satisfaction, worthwhile, happiness, anxiety, wellbeing FROM wellbeing_data JOIN borough ON wellbeing_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }
}

module.exports = DemoData;
