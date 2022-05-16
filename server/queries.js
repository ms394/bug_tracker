const pool = require("./config/dbConfig");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from priority;`;
    pool.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from user_data WHERE email=$1;`;
    pool.query(query, [email], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT u.user_id, u.user_name, u.first_name,u.last_name, u.email, position.position_id, position.position_value
    FROM user_data  u
        LEFT JOIN position 
        ON u.position = position.position_id
    WHERE user_id = $1`;
    pool.query(query, [id], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
};

const createUser = (
  user_name,
  email,
  position,
  first_name,
  last_name,
  hashed_password
) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO user_data(user_name,email,position,first_name,last_name,password) VALUES($1, $2, $3, $4, $5, $6);`;
    pool.query(
      query,
      [user_name, email, position, first_name, last_name, hashed_password],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getUserAndPositionData = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT u.user_id, u.user_name, u.first_name,u.last_name, u.email, position.position_id, position.position_value
    FROM user_data  u
        LEFT JOIN position 
        ON u.position = position.position_id
    WHERE user_id = $1`;
    pool.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getPositions = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from position;`;
    pool.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const createProject = (project_name, project_description, created_by) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO project(project_name,project_description,created_by)
                  VALUES($1,$2,$3) RETURNING project_id;`;
    pool.query(
      query,
      [project_name, project_description, created_by],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          //console.log(result.rows[0].project_id);
          resolve(result.rows[0].project_id);
        }
      }
    );
  });
};

const getProject = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from project WHERE project_id=$1;`;
    pool.query(query, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const addUserProject = (user, project, is_admin) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO user_projects(is_admin,user_data,project) VALUES($1,$2,$3);`;
    pool.query(query, [is_admin, user, project], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  getUserAndPositionData,
  getPositions,
  createProject,
  addUserProject,
  getProject,
};
