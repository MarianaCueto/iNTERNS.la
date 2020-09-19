USE [C84_InternsLA]
GO
/****** Object:  StoredProcedure [dbo].[Threads_Update_V2]    Script Date: 9/19/2020 1:38:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[Threads_Update_V2]
(@Id        INT, 
 @Subject   NVARCHAR(250), 
 @IsActive  BIT
)
AS

/*
	DECLARE @testId int = 2,
			@testSubject nvarchar(250) = 'test string',
			@testIsActive bit = 0
	EXEC dbo.Threads_Update
			@testId,
			@testSubject,
			@testIsActive
*/

    BEGIN
        UPDATE dbo.Threads
          SET 
              [Subject] = @Subject, 
              [IsActive] = @IsActive
        WHERE [Id] = @Id;
    END;
