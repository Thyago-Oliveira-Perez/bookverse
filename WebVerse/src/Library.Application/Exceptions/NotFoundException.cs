namespace Library.Application.Exceptions;

public class NotFoundException(string message, Exception? inner = null) : ApplicationException(message, inner);