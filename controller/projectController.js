const ProjectServices = require("../services/projectServices");

exports.byTrainNumber = async (req, res) => {
    try {
        const { Train_No } = req.params;

        const successResponse = await ProjectServices.ByTrainNumber(Train_No);

        res.status(200).json({
            status: true,
            msg: "Train Searched Successfully!",
            data: successResponse
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Error occurred while searching by Train Number!",
            error: error.message
        });
    }
};

exports.initialRoute = (req, res) => {
    res.status(200).json({ status: true, msg: "Hello Initial Route" });
};

exports.srcDest = async (req, res) => {
    try {
        const { source, destination } = req.params;

        if (!source || !destination) {
            return res.status(400).json({
                status: false,
                msg: "Source and Destination are required!"
            });
        }

        const successResponse = await ProjectServices.BySourceAndDestination(source, destination);

        res.status(200).json({
            status: true,
            msg: "Train Searched Successfully!",
            data: successResponse
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Error occurred while searching by Source and Destination!",
            error: error.message
        });
    }
};


exports.searchByStation = async (req, res) => {
    const station = req.params.station;  // Access station from URL parameter

    // Check if the station input is a code (shorter) or a name (longer)
    const isStationCode = station.length <= 4;

    try {
        const result = await ProjectServices.ByStationNameOrCode(station, isStationCode);
        if (result.length === 0) {
            return res.status(404).send('No train information found for the given station.');
        }
        res.json(result);
    } catch (error) {
        res.status(500).send('Error retrieving train information from the database');
    }
};
