namespace Library.Common.Results;

public enum ApplicationResultTypes
{
    // 2xx - Success
    Ok = 200,
    Created = 201,
    NoContent = 204,

    // 4xx - Client errors
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,

    // 5xx - Server errors
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}