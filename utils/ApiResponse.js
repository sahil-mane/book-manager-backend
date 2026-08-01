class ApiResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

module.exports = ApiResponse;
