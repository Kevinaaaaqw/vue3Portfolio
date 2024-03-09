using Microsoft.EntityFrameworkCore;
using myback.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<OLDemoContext>(
   options => options.UseSqlServer(builder.Configuration.GetConnectionString("default")));

builder.Services.AddCors(option => option.AddPolicy("any", builder =>
{
    builder.AllowAnyOrigin()//¤¹³\¥þºô°ì
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("any");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
