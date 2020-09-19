USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Threads_SelectAll_V6]    Script Date: 9/19/2020 1:37:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[Threads_SelectAll_V6]
(@PageIndex INT, 
 @PageSize  INT
)
AS

/* 
	DECLARE @testPageIndex int = 0,
			@testPageSize int = 70

	EXEC dbo.Threads_SelectAll_V6
			@testPageIndex,
			@testPageSize
*/

    BEGIN

        SELECT T.[Id], 
               T.[Subject], 
               T.[IsActive], 
               UP.[FirstName],
			   UP.[Mi],
			   UP.[LastName],
			   UP.[AvatarUrl],
			   UP.Id AS CreatedById, 
               T.[DateCreated], 
			  (SELECT DISTINCT COUNT(1) OVER()  
			   FROM Dbo.Posts AS P
			   WHERE P.ThreadId = T.Id ) AS PostCount,
               [Total Count] = COUNT(1) OVER()
        FROM dbo.Threads as T
		LEFT JOIN UserProfiles AS UP ON T.CreatedBy = UP.UserId
		LEFT JOIN dbo.UserProfiles AS U ON T.CreatedBy = U.UserId
        ORDER BY DateCreated DESC
        OFFSET(@PageIndex * @PageSize) ROWS FETCH NEXT @PageSize ROWS ONLY;
    END;
