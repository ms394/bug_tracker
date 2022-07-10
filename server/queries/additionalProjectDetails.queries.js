const pool = require("../config/dbConfig");

// GET Queries for Status, Type, Priority
const getStatus = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from status_project;`;
    pool.query(query, (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const searchStatus = (str) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from status_data WHERE status_value LIKE $1;`;
    pool.query(query, ["%" + str + "%"], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const createStatus = (value) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO status_data(status_value) VALUES($1) RETURNING status_id;`;
    pool.query(query, [value], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res.rows[0].status_id);
      }
    });
  });
};

const addStatusToProject = (project, status) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO status_project(status,project) VALUES($1,$2);`;
    pool.query(query, [status, project], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// Type Queries
const getType = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from type_data;`;
    pool.query(query, (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const searchType = (str) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from type_data WHERE LOWER(type_value) LIKE LOWER($1) ;`;
    pool.query(query, ["%" + str + "%"], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const createType = (value) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO type_data(type_value) VALUES($1) RETURNING type_data_id;`;
    pool.query(query, [value], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res.rows[0].type_data_id);
      }
    });
  });
};

const addTypeToProject = (project, type) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO type_project(type,project) VALUES($1,$2);`;
    pool.query(query, [type, project], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// Queries for Priority
const getPriority = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from priority;`;
    pool.query(query, (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const searchPriority = (str) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from priority WHERE LOWER(priority_value) LIKE LOWER($1) ;`;
    pool.query(query, ["%" + str + "%"], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const createPriority = (value) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO priority(priority_value) VALUES($1) RETURNING priority_id,priority_value;`;
    pool.query(query, [value], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res.rows[0]);
      }
    });
  });
};

const addPriorityToProject = (project, priority) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO priority_project(priority,project) VALUES($1,$2) RETURNING *;`;
    pool.query(query, [priority, project], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows[0]);
      }
    });
  });
};

const projectPriorities = (project) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM priority_project WHERE project=$1;`;
    pool.query(query, [project], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

const getAddProjDetails = (project) => {
  return new Promise((resolve, reject) => {
    const query = ``;
    pool.query(query, [], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
};

module.exports = {
  getPriority,
  getStatus,
  getType,
  createPriority,
  createStatus,
  createType,
  addTypeToProject,
  addStatusToProject,
  addPriorityToProject,
  searchStatus,
  searchPriority,
  searchType,
  projectPriorities,
  getAddProjDetails,
};
