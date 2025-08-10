namespace Library.Infrastructure.Exceptions;

public class InfrastructureException(string message, Exception? inner = null) : Exception(message, inner);