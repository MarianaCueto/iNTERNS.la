USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Admin_Dashboard_SelectAll_RecentMetrics]    Script Date: 9/19/2020 1:42:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Admin_Dashboard_SelectAll_RecentMetrics]
AS

/*

EXECUTE [dbo].[Admin_Dashboard_SelectAll_RecentMetrics]

*/

    BEGIN
        SELECT
        (
            SELECT TOP 6 O.[Id], 
                         O.[Name], 
                         O.[Logo], 
                         O.[SiteUrl], 
                         O.[DateCreated], 
                         L.[City], 
                         S.[Name] AS StateName, 
                         S.[StateProvinceCode]
            FROM [dbo].[Organizations] AS O
                 JOIN [dbo].Locations AS L ON L.Id = O.LocationId
                 JOIN [dbo].States AS S ON L.StateId = S.Id
            ORDER BY O.DateCreated DESC FOR JSON PATH
        ) AS RecentOrganizations, 
        (
            SELECT TOP 6 UP.UserId, 
                         UP.FirstName, 
                         UP.LastName, 
                         UP.AvatarUrl, 
                         UP.DateCreated
            FROM [dbo].UserProfiles AS UP
            ORDER BY [UP].DateCreated FOR JSON PATH
        ) AS RecentUsers, 
        (
            SELECT TOP 8 O.[Id], 
                         O.[Title], 
                         JT.[Type] AS JobType, 
                         L.City, 
                         O.DateCreated
            FROM [dbo].[Openings] AS O
                 JOIN [dbo].JobType AS JT ON JT.Id = O.JobTypeId
                 LEFT JOIN [dbo].Locations AS L ON L.Id = O.LocationId
                                                   AND IsActive = 1
            ORDER BY O.DateCreated DESC FOR JSON PATH
        ) AS RecentJobs, 
        (
            SELECT TOP 6 E.[Id], 
                         E.[Name] AS EventName, 
                         E.DateStart, 
                         V.[Name] AS VenueName, 
                         L.City, 
                         S.[Name] AS StateName, 
                         S.[StateProvinceCode]
            FROM [dbo].[Events] AS E
                 JOIN [dbo].Venues AS V ON V.Id = E.VenueId
                 JOIN dbo.Locations AS L ON L.Id = V.Id
                 JOIN [dbo].States AS S ON L.StateId = S.Id
            ORDER BY E.DateStart DESC FOR JSON PATH
        ) AS RecentEvents;
    END;
