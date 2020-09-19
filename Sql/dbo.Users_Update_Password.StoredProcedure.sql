USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update_PasswordV2]    Script Date: 9/19/2020 1:47:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Users_Update_PasswordV2] 
                                       @Id INT, 
									   @Password NVARCHAR(100),
									   @IsConfirmed NVARCHAR(100)
                                       

AS
 /*
	DECLARE @testId int = 7,
			@testPassword nvarchar(100) = 'test string',
			@testIsConfirmed bit = 1
			
	EXEC dbo.Threads_Update
			@testId
			@testPassword
			@testIsConfirmed
			
			
*/

    BEGIN
        UPDATE dbo.Users
          SET 
		     [Password] = @Password, 
			 [IsConfirmed] = @IsConfirmed
			 From dbo.Users AS U
			 LEFT JOIN UserToken AS UT ON U.Id = UT.UserId		
             WHERE [Id] = @Id
    END;
