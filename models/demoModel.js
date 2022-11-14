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
        const data = {}

        if (isRanked) {
            const categoryValuesSorted = categories.map(category => [category, queryData[category]]).sort((a, b) => b[1] - a[1])
            for (const [index, category] of categoryValuesSorted.entries()) {
                data[category[0]] = {value: category[1], rank: index+1}
            }
        } else {
            categories.forEach(category => data[category] = queryData[category])
        }

        return [queryData.borough_name, categories, data]
    }

    static async getEthnicityByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, white, black, asian, other FROM ethnicity_data JOIN borough ON ethnicity_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], true)

        return new DemoData(boroughName, 'ethnicity', categories, true, data)
    }

    static async getReligionByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, no_religion, total FROM religion_data JOIN borough ON religion_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], true)

        return new DemoData(boroughName, 'religion', categories, true, data)
    }

    static async getWellbeingByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, life_satisfaction, worthwhile, happiness, anxiety, wellbeing FROM wellbeing_data JOIN borough ON wellbeing_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], false)

        return new DemoData(boroughName, 'wellbeing', categories, false, data)
    }

    static async getAgeByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, a0_9, a10_17, a18_26, a27_35, a36_44, a45_53, a54_62, a63_71, a72_80, a81_ FROM age_data JOIN borough ON age_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], true)

        return new DemoData(boroughName, 'age', categories, true, data)
    }

    static async getSexByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, m_100f FROM sex_data JOIN borough ON sex_data.borough_id = borough.id WHERE borough_name = $1`, [borough_name])

        const [boroughName, categories, data] = DemoData.#queryDataHandler(response.rows[0], false)

        return new DemoData(boroughName, 'sex', categories, false, data)
    }
}

module.exports = DemoData;
