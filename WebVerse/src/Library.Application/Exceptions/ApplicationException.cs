namespace Library.Application.Exceptions;

public class ApplicationException(string message, Exception? inner = null) : Exception(message, inner);