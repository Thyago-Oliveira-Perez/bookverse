namespace Library.Infrastructure.Exceptions;

public class DatabaseException(string message, Exception? inner = null) : InfrastructureException(message, inner);