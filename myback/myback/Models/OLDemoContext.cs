﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace myback.Models;

public partial class OLDemoContext : DbContext
{
    public OLDemoContext(DbContextOptions<OLDemoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<to_do_list> to_do_list { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<to_do_list>(entity =>
        {
            entity.HasKey(e => e.list_id).HasName("PK_todolist");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}