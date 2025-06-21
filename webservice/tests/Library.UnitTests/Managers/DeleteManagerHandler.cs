using Library.Application.Handlers;
using Library.Application.Requests;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;

public class DeleteManagerHandlerTests
{
    private readonly Mock<IManagerRepository> _repositoryMock;
    private readonly Mock<ILogger<DeleteManagerHandler>> _loggerMock;
    private readonly DeleteManagerHandler _handler;

    public DeleteManagerHandlerTests()
    {
        _repositoryMock = new Mock<IManagerRepository>();
        _loggerMock = new Mock<ILogger<DeleteManagerHandler>>();
        _handler = new DeleteManagerHandler(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task Handle_WhenManagerExists_ShouldDeleteManagerAndReturnSuccess()
    {
        // Arrange
        const int managerId = 1;
        var manager = new Manager();
        manager.Create("John Doe", "john@example.com");
        var request = new DeleteManagerRequest(managerId);

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(managerId))
            .ReturnsAsync(manager);

        _repositoryMock
            .Setup(x => x.DeleteManagerAsync(manager))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.True(response.IsSuccess);
        Assert.Equal("Manager deleted", response.Message);

        _repositoryMock.Verify(x => x.GetManagerByIdAsync(managerId), Times.Once);
        _repositoryMock.Verify(x => x.DeleteManagerAsync(manager), Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Deleting manager")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_WhenManagerDoesNotExist_ShouldReturnNotFound()
    {
        // Arrange
        const int managerId = 1;
        var request = new DeleteManagerRequest(managerId);

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(managerId))
            .ReturnsAsync((Manager?)null);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.False(response.IsSuccess);
        Assert.Equal("Manager not found", response.Message);

        _repositoryMock.Verify(x => x.GetManagerByIdAsync(managerId), Times.Once);
        _repositoryMock.Verify(x => x.DeleteManagerAsync(It.IsAny<Manager>()), Times.Never);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Warning,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Manager not found")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_WhenRepositoryThrowsException_ShouldLogErrorAndReturnFailure()
    {
        // Arrange
        const int managerId = 1;
        var request = new DeleteManagerRequest(managerId);
        var exception = new Exception("Database error");

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(managerId))
            .ThrowsAsync(exception);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.False(response.IsSuccess);
        Assert.Equal("Database error", response.Message);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error during manager delete")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
}
