USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Users_ResetPassword_V2]    Script Date: 9/19/2020 1:46:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Users_ResetPassword_V2] @Password NVARCHAR(100), 
                                               @Token    VARCHAR(200), 
                                               @Id       INT OUTPUT
AS

/*
DECLARE @Password nvarchar(100) = 'Mariana1!',
		@Token varchar(200) = 'ed87e88c-d625-4343-b72b-4ad4e9ceb52c',
		@Id INT
		
		
EXECUTE dbo.Users_ResetPassword_v2
		@Password
		,@Token
		,@Id out


		SELECT @Id
		



*/

    BEGIN
        SET @Id =
        (
            SELECT [UserId]
            FROM [dbo].[UserToken]
            WHERE Token = @Token
        );
        IF @Id IS NOT NULL
            BEGIN
                UPDATE dbo.Users
                  SET 
                      [Password] = @Password
                WHERE [Id] = @Id;
        END;
    END;
