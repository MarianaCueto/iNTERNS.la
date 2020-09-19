USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Threads_Search_V2]    Script Date: 9/19/2020 1:32:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[Threads_Search_V2]
(@PageIndex INT, 
 @PageSize  INT,
 @Search NVARCHAR(255)
)
AS

/* 
	DECLARE @testPageIndex int = 0,
			@testPageSize int = 30,
			@Search NVARCHAR(255) = 'TONY'
	EXEC dbo.Threads_Search_V2
			@testPageIndex,
			@testPageSize,
			@Search
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
			   WHERE P.ThreadId = T.Id ) AS PostCount,
               [Total Count] = COUNT(1) OVER()
        FROM dbo.Threads as T
		LEFT JOIN UserProfiles AS UP ON T.CreatedBy = UP.UserId
		WHERE([Subject] LIKE '%' + @Search + '%' or [FirstName] LIKE '%' + @Search + '%' or [LastName] LIKE '%' + @Search + '%' )
        ORDER BY DateCreated DESC
        OFFSET(@PageIndex * @PageSize) ROWS FETCH NEXT @PageSize ROWS ONLY;
    END;
