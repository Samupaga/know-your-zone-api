const db = require('../data/database/db');

class DemoData {
    constructor (borough_name, type, category_names, ranked, data) {
        this.borough_name = borough_name
        this.type = type
        this.category_names = category_names
        this.ranked = ranked
        this.data = data
    }

    static #queryDataHandler(queryData, isRanked) {
        const categories = Object.keys(queryData).filter(elem => elem !== 'borough_name')
        const data = []

        for (const category of categories) {
            data.push({category: category, value: queryData[category]})
        }

        if (isRanked) {
            data.sort((a, b) => b.value - a.value)
        }

        return [queryData.borough_name, categories, data]
    }

    static async getEthnicityByBorough(borough_name) {
        const ranked = true
        
        const response = await db.query(`SELECT borough_name, white, black, asian, other FROM ethnicity_data JOIN borough ON ethnicity_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], ranked)

        return new DemoData(boroughName, 'ethnicity', categories, ranked, data)
    }

    static async getReligionByBorough(borough_name) {
        const ranked = true

        const response = await db.query(`SELECT borough_name, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion FROM religion_data JOIN borough ON religion_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], ranked)

        return new DemoData(boroughName, 'religion', categories, ranked, data)
    }

    static async getWellbeingByBorough(borough_name) {
        const ranked = false

        const response = await db.query(`SELECT borough_name, life_satisfaction, worthwhile, happiness, anxiety, wellbeing FROM wellbeing_data JOIN borough ON wellbeing_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], ranked)

        return new DemoData(boroughName, 'wellbeing', categories, ranked, data)
    }

    static async getAgeByBorough(borough_name) {
        const ranked = true

        const response = await db.query(`SELECT borough_name, a0_9, a10_17, a18_26, a27_35, a36_44, a45_53, a54_62, a63_71, a72_80, a81_ FROM age_data JOIN borough ON age_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], ranked)

        return new DemoData(boroughName, 'age', categories, ranked, data)
    }

    static async getSexByBorough(borough_name) {
        const ranked = false

        const response = await db.query(`SELECT borough_name, m_100f FROM sex_data JOIN borough ON sex_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], ranked)

        return new DemoData(boroughName, 'sex', categories, ranked, data)
    }
}

module.exports = DemoData;
