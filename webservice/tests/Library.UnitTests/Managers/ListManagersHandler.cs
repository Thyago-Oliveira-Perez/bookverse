using Library.Application.Handlers;
using Library.Application.Requests;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;

public class ListManagersHandlerTests
{
    private readonly Mock<IManagerRepository> _repositoryMock;
    private readonly Mock<ILogger<CreateManagerHandler>> _loggerMock;
    private readonly ListManagersHandler _handler;

    public ListManagersHandlerTests()
    {
        _repositoryMock = new Mock<IManagerRepository>();
        _loggerMock = new Mock<ILogger<CreateManagerHandler>>();
        _handler = new ListManagersHandler(_repositoryMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task Handle_WhenManagersExist_ShouldReturnListOfManagerDtos()
    {
        // Arrange
        var managerA = new Manager();
        managerA.Create("John Doe", "john@example.com");
        var managerB = new Manager();
        managerB.Create("Jane Smith", "jane@example.com");
        var managers = new List<Manager> { managerA, managerB };

        _repositoryMock
            .Setup(x => x.GetManagersAsync(false))
            .ReturnsAsync(managers);

        var request = new ListManagersRequest();

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.NotNull(response.Data);
        Assert.Equal(2, response.Data.Count());

        Assert.Collection(response.Data,
            item =>
            {
                Assert.Equal("John Doe", item.Name);
                Assert.Equal("john@example.com", item.Email);
            },
            item =>
            {
                Assert.Equal("Jane Smith", item.Name);
                Assert.Equal("jane@example.com", item.Email);
            });

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Listing managers")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Manager retrieved")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_WhenRepositoryThrowsException_ShouldLogErrorAndReturnEmptyResponse()
    {
        // Arrange
        var exception = new Exception("Database error");
        _repositoryMock
            .Setup(x => x.GetManagersAsync(false))
            .ThrowsAsync(exception);

        var request = new ListManagersRequest();

        // Act
        var response = await _handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.NotNull(response);
        Assert.Null(response.Data);

        _loggerMock.Verify(
            x => x.Log(
                LogLevel.Error,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error during manager list")),
                null,
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
}
