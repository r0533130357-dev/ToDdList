using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

// ---------------- DB CONTEXT ----------------
builder.Services.AddDbContext<ToDoDbContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("ToDoDB"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ToDoDB"))
    );
});

// ---------------- CORS ----------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://prcticode3.onrender.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ---------------- Swagger ----------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger always ON (לא רק ב־Development)
app.UseSwagger();
app.UseSwaggerUI();

// CORS MUST BE BEFORE ROUTES
app.UseCors("AllowFrontend");

app.MapGet("/", () => "Server running ✔️");

// ----------- API ROUTES ------------------

app.MapGet("/tasks", async (ToDoDbContext context) =>
{
    return await context.Items.ToListAsync();
});

app.MapPost("/tasks", async (Item task, ToDoDbContext context) =>
{
    context.Items.Add(task);
    await context.SaveChangesAsync();
    return Results.Created($"/tasks/{task.Id}", task);
});

app.MapPut("/tasks/{id}", async (int id, Item updatedTask, ToDoDbContext context) =>
{
    var task = await context.Items.FindAsync(id);
    if (task == null) return Results.NotFound();

    task.Name = updatedTask.Name;
    task.IsComplete = updatedTask.IsComplete;

    await context.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/tasks/{id}", async (int id, ToDoDbContext context) =>
{
    var task = await context.Items.FindAsync(id);
    if (task == null) return Results.NotFound();

    context.Items.Remove(task);
    await context.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
