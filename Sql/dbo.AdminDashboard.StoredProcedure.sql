USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[AdminDashboard]    Script Date: 9/19/2020 1:43:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[AdminDashboard] 

AS

/*
---Test Code---

	EXEC [dbo].[AdminDashboard] 	

*/

        BEGIN
            SELECT
            (
                SELECT COUNT(Id)
                FROM [dbo].[Users]
            ) AS UserCount, 
            (
			    SELECT COUNT(Id)
                FROM [dbo].[Openings]
				WHERE IsActive = 1
            ) AS TotalJobsCount,  
            (
                SELECT COUNT(Id)
                FROM [dbo].[Events]
            ) AS EventCount, 
            (
                SELECT COUNT(Id)
                FROM [dbo].[Organizations]
            ) AS OrganizationsCount;
			
        END;
