USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Users_RecoverPassword]    Script Date: 9/19/2020 1:45:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Users_RecoverPassword] @Email  NVARCHAR(100), 
                                              @Token  VARCHAR(200), 
                                              @UserId INT OUTPUT
AS

/*
DECLARE @Email nvarchar(100) = 'dd000@dispostable.com',
		@Token varchar(200) = 'somenewtoken',
		@UserId int
		
EXECUTE dbo.Users_RecoverPassword
		@Email
		,@Token
		,@UserId

		SELECT @UserId

*/

    BEGIN
        SET @UserId =
        (
            SELECT [Id]
            FROM [dbo].[Users]
            WHERE Email = @Email
        );
        IF @UserId IS NOT NULL
            BEGIN
                EXECUTE dbo.UserToken_Insert 
                        @Token, 
                        @UserId, 
                        3;
        END;
    END;
