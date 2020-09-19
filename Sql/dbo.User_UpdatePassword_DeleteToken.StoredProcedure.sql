SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Users_UpdateStatus_DeleteToken] @Id    INT, 
                                                       @Token VARCHAR(200)
AS

/*
DECLARE @Id INT = 96,
		@Token VARCHAR(200) = '1258acb15551223423sdfgczxc'

SELECT *
FROM [dbo].[Users]
WHERE Id = @Id

EXECUTE [dbo].[Users_UpdateStatus_DeleteToken]
		@Id,
		@Token

SELECT *
FROM [dbo].[Users]
WHERE Id = @Id
*/

    BEGIN
        DECLARE @IsConfirmed BIT= 1, @UserStatusId INT= 1;
        UPDATE [dbo].[Users]
          SET 
              [IsConfirmed] = @IsConfirmed, 
              [UserStatusId] = @UserStatusId
        WHERE Id = @Id;
        DELETE FROM dbo.UserToken
        WHERE(UserId = @Id
              AND Token = @Token);
    END;
