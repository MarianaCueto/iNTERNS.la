USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Threads_SelectById_V3]    Script Date: 9/19/2020 1:49:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Threads_SelectById_V3](@Id INT)
AS

/*
	DECLARE @testId int = 7
	EXEC dbo.Threads_SelectById_V3
		@testId
*/

    BEGIN
 SELECT T.[Id], 
               T.[Subject], 
               T.[IsActive], 
			   T.[CreatedBy],
               UP.[FirstName],
			   UP.[Mi],
			   UP.[LastName],
			   UP.[AvatarUrl],
               T.[DateCreated], 
			  (SELECT DISTINCT COUNT(1) OVER()  
			   FROM Dbo.Posts AS P
			   WHERE P.ThreadId = T.Id ) AS PostCount
        FROM dbo.Threads as T
		LEFT JOIN UserProfiles AS UP ON T.CreatedBy = UP.UserId
        WHERE T.[Id] = @Id
        ORDER BY DateCreated DESC;
    END;
