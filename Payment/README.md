# Fake Payment Gateway (ASP.NET Core)

Minimal project to simulate a payment gateway

Basic features:
- Create payment (authorize + capture)
- Check payment status
- Refund
- Webhook for sending events
- Simple in-memory management (for development only)

Requirements: .NET 7+ (or 8), dotnet CLI

How to run:
1. `dotnet restore`
2. `dotnet run --project FakePayment`

Sample curl commands available in the `FakePayment.http` folder.