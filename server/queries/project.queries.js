const pool = require("../config/dbConfig");

// Create Project Query
const createProject = (project_name, project_description, created_by) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO project(project_name,project_description,created_by)
                  VALUES($1,$2,$3) RETURNING * ;`;
    pool.query(
      query,
      [project_name, project_description, created_by],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows[0]);
        }
      }
    );
  });
};

// Get Details of the Project
const getProjectDetails = (project) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from project WHERE project_id=$1;`;
    pool.query(query, [project], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

module.exports = {
  createProject,
  getProjectDetails,
};
