class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludedObjs = ['company', 'keyword', 'limit', 'page'];

    excludedObjs.forEach((field) => delete queryStringObj[field]);

    if (queryStringObj.technicalSkills) {
      queryStringObj.technicalSkills = queryStringObj.technicalSkills.split(',');
      queryStringObj.technicalSkills = {
        $all: queryStringObj.technicalSkills.map(skill =>
          new RegExp(skill, 'i')
        ),
      };
    }

    this.mongooseQuery = this.mongooseQuery.find(queryStringObj);
    return this;
  }

  sort() {
    this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      const query = {};
      query.$or = [
        { jobTitle: { $regex: this.queryString.keyword, $options: 'i' } },
        { jobDescription: { $regex: this.queryString.keyword, $options: 'i' } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery
      .skip(skip)
      .limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
