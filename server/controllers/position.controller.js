const { getPositions } = require("../queries");

const getAllPositions = async (req, res) => {
  try {
    const positionsRows = await getPositions();
    const positions = positionsRows.rows;
    return res.status(200).send(positions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getAllPositions;
