import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message;
      !err.response ? message = "Server error, please try again later"
        : message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  };

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  };

  /** Get all companies or get by search params */

  static async getCompanies(param={}) {
    let res = await this.request('companies', param);
    return res.companies;
  };

  /** Get all jobs */

  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  };

  /** Register new user */

  static async signup(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  };

  /** Log in user */

  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  };

  /** Get user details */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  };

  /** Update user */

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  };

  /** Apply for job */

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  };
};

JoblyApi.token = localStorage.getItem("token");

export default JoblyApi;