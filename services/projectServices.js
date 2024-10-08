const connection = require("../config/db");

class ProjectServices {

    // Function to retrieve train info by train number
    static async ByTrainNumber(trainNo) {
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query('SELECT * FROM test WHERE Train_No = ?', [trainNo], (err, results) => {
                    if (err) {
                        console.error('Error executing query: ' + err.stack);
                        reject(err);
                    }
                    resolve(results);
                });
            });

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Function to retrieve trains between source and destination stations
    static async BySourceAndDestination(source, destination) {
        const query = `
            SELECT t3.Train_No, t3.Station_Code AS Intermediate_Station, t3.SN, t3.Station_Name, t3.Arrival_Time, t3.Distance
            FROM test t1
            JOIN test t2 ON t1.Train_No = t2.Train_No
            JOIN test t3 ON t1.Train_No = t3.Train_No
            WHERE t1.Station_Code = ? AND t2.Station_Code = ?
            AND t3.SN >= t1.SN AND t3.SN <= t2.SN
            ORDER BY t3.Train_No, t3.SN;
        `;

        try {
            const results = await new Promise((resolve, reject) => {
                connection.query(query, [source, destination], (err, results) => {
                    if (err) {
                        console.error('Error executing query: ' + err.stack);
                        reject(err);
                    }
                    resolve(results);
                });
            });

            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async ByStationNameOrCode(station, isStationCode) {
        try {
            let query;
            let values = [];

            // If it's a station code, search by code, otherwise search by name
            if (isStationCode) {
                query = 'SELECT * FROM test WHERE Station_Code = ?';
                values.push(station);
            } else {
                query = 'SELECT * FROM test WHERE Station_Name LIKE ?';
                values.push(`%${station}%`);
            }

            const result = await new Promise((resolve, reject) => {
                connection.query(query, values, (err, results) => {
                    if (err) {
                        console.error('Error executing query: ' + err.stack);
                        reject(err);
                    }
                    resolve(results);
                });
            });

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = ProjectServices;
