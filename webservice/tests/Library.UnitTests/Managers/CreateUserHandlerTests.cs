using Library.Application.Commands;
using Library.Application.Handlers;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;

public class CreateManagerHandlerTests
{
    private readonly Mock<IManagerRepository> _repositoryMock;
    private readonly Mock<ILogger<CreateManagerHandler>> _loggerMock;
    private readonly CreateManagerHandler _handler;

    public CreateManagerHandlerTests()
    {
        _repositoryMock = new Mock<IManagerRepository>();
        _loggerMock = new Mock<ILogger<CreateManagerHandler>>();
        _handler = new CreateManagerHandler(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task Handle_WithValidRequest_ShouldCreateManagerAndReturnId()
    {
        // Arrange
        var request = new CreateManagerCommand("John Doe", "john.doe@example.com");
        const int expectedManagerId = 1;
        
        _repositoryMock
            .Setup(x => x.AddManager(It.IsAny<Manager>()))
            .ReturnsAsync(expectedManagerId);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        _repositoryMock.Verify(
            x => x.AddManager(It.Is<Manager>(m => 
                m.Name == request.Name && 
                m.Email == request.Email)),
            Times.Once);
            
        Assert.Equal(expectedManagerId, result);
        
        // Verifica se os logs foram chamados
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Creating manager")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Manager created")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_WhenRepositoryThrowsException_ShouldLogErrorAndReturnMinusOne()
    {
        // Arrange
        var request = new CreateManagerCommand("John Doe", "john.doe@example.com");
        var exception = new Exception("Database error");
        
        _repositoryMock
            .Setup(x => x.AddManager(It.IsAny<Manager>()))
            .ThrowsAsync(exception);

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.Equal(-1, result);
        
        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error during manager creation")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
}