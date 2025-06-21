using Library.Application.Handlers;
using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;

public class UpdateManagerHandlerTests
{
    private readonly Mock<IManagerRepository> _repositoryMock;
    private readonly Mock<ILogger<UpdateManagerHandler>> _loggerMock;
    private readonly UpdateManagerHandler _handler;

    public UpdateManagerHandlerTests()
    {
        _repositoryMock = new Mock<IManagerRepository>();
        _loggerMock = new Mock<ILogger<UpdateManagerHandler>>();
        _handler = new UpdateManagerHandler(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task Handle_WhenManagerExists_ShouldUpdateManagerAndReturnSuccess()
    {
        // Arrange
        var request = new UpdateManagerRequest(1, "Updated Name", "updated@example.com");

        var manager = new Manager();
        manager.Create("Old Name", "old@example.com");

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(request.Id))
            .ReturnsAsync(manager);

        _repositoryMock
            .Setup(x => x.UpdateManagerAsync(manager))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.True(response.IsSuccess);
        Assert.Equal("Manager updated", response.Message);

        _repositoryMock.Verify(x => x.GetManagerByIdAsync(request.Id), Times.Once);
        _repositoryMock.Verify(x => x.UpdateManagerAsync(It.Is<Manager>(m =>
            m.Name == request.Name &&
            m.Email == request.Email)), Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Updating manager")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_WhenManagerDoesNotExist_ShouldReturnNotFound()
    {
        // Arrange
        var request = new UpdateManagerRequest(1, "Name", "email@example.com");

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(request.Id))
            .ReturnsAsync((Manager?)null);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.False(response.IsSuccess);
        Assert.Equal("Manager not found", response.Message);

        _repositoryMock.Verify(x => x.GetManagerByIdAsync(request.Id), Times.Once);
        _repositoryMock.Verify(x => x.UpdateManagerAsync(It.IsAny<Manager>()), Times.Never);

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
        var request = new UpdateManagerRequest(1,"Name","email@example.com");

        var exception = new Exception("Update error");

        _repositoryMock
            .Setup(x => x.GetManagerByIdAsync(request.Id))
            .ThrowsAsync(exception);

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.False(response.IsSuccess);
        Assert.Equal("Update error", response.Message);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error during manager update")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
}
