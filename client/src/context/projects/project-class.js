export default class Project {
  constructor(
    id,
    project_id,
    project_name,
    project_description,
    created_by,
    is_admin
  ) {
    this.id = id;
    this.project_id = project_id;
    this.project_name = project_name;
    this.project_description = project_description;
    this.created_by = created_by;
    this.is_admin = is_admin;
    this.additionalProjectDetails = {
      priorites: [],
      statuses: [],
      types: [],
    };
  }

  addPriority(priority) {
    this.additionalProjectDetails.priorites.push(priority);
  }

  addStatus(status) {
    this.additionalProjectDetails.statuses.push(status);
  }

  addType(type) {
    this.additionalProjectDetails.types.push(type);
  }
}
