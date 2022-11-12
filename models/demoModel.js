const db = require('../data/database/db');

class DemoData {
    constructor ({ borough_name, white, asian, black, other, total_population, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, total, life_satisfaction, worthwhile, happiness, anxiety, wellbeing}) {
        this.borough_name = borough_name
        this.white = white 
        this.black = black
        this.asian = asian 
        this.other = other
        this.total_population = total_population
        this.christian = christian
        this.buddhist = buddhist
        this.hindu = hindu
        this.jewish = jewish
        this.muslim = muslim
        this.sikh = sikh
        this.other_religion = other_religion
        this.no_religion = no_religion
        this.total = total
        this.life_satisfaction = life_satisfaction
        this.worthwhile = worthwhile
        this.happiness = happiness
        this.anxiety = anxiety
        this.wellbeing = wellbeing
    }

    static async getEthnicityByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, white, black, asian, other FROM ethnicity_data WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }

    static async getReligionByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, no_religion, total FROM religion_data WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }

    static async getWellbeingByBorough(borough_name) {
        const response = await db.query(`SELECT borough_name, life_satisfaction, worthwhile, happiness, anxiety, wellbeing FROM wellbeing_data WHERE borough_name = $1`, [borough_name])

        return new DemoData(response.rows[0])
    }
}

module.exports = DemoData;
