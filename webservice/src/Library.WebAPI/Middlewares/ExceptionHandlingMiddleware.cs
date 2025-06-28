using Library.Domain.Exceptions;
using Library.Infrastructure.Exceptions;
using ApplicationException = Library.Application.Exceptions.ApplicationException;

namespace Library.WebAPI.Middlewares;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (DomainException ex)
        {
            logger.LogWarning(ex, "Domain exception occurred.");
            await WriteErrorResponse(context, 400, ex.Message);
        }
        catch (ApplicationException ex)
        {
            logger.LogWarning(ex, "Application exception occurred.");
            await WriteErrorResponse(context, 422, ex.Message);
        }
        catch (DatabaseException ex)
        {
            logger.LogWarning(ex, "Database exception occurred.");
            await WriteErrorResponse(context, 500, ex.Message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred.");
            await WriteErrorResponse(context, 500, "An unexpected error occurred.");
        }
    }

    private static async Task WriteErrorResponse(HttpContext context, int statusCode, string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;
        await context.Response.WriteAsJsonAsync(new
        {
            error = message,
            status = statusCode,
            timestamp = DateTime.UtcNow
        });
    }
}