namespace Web.Api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserService _service = null;
        private IAuthenticationService<int> _authService = null;
        private IEmailService _mailService = null;
        private IUserProfileService _userProfile = null;
        public UserApiController(IUserService service,
            IEmailService mailService,
            IUserProfileService userProfileService,
            ILogger<UserApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
            _mailService = mailService;
            _userProfile = userProfileService;
        }


        [HttpGet("current")]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrrent()
        {
            IUserAuthData user = _authService.GetCurrentUser();
            ItemResponse<IUserAuthData> response = new ItemResponse<IUserAuthData>();
            response.Item = user;
            return Ok200(response);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<ItemResponse<Login>> Login(LoginAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                bool emailExist = _service.EmailExist(model.Email);
                if (emailExist == false)
                {
                    code = 405;
                    response = new ErrorResponse("Email Not Found in our Records");
                }
                else
                {
                    bool isConfirmed = _service.IsConfirmed(model.Email);
                    if (isConfirmed == false)
                    {
                        code = 401;
                        response = new ErrorResponse("User must be confirmed");
                    }
                    else
                    {
                        Task<bool> signedUp = _service.LogInAsync(model.Email, model.Password);
                        if (signedUp.Result == false)
                        {
                            code = 404;
                            response = new ErrorResponse("Email and Password Combination Not Found");
                        }
                        else
                        {
                            Login createdProfile = _userProfile.Check(model.Email);
                            response = new ItemResponse<Login>() { Item = createdProfile };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                Guid token = Guid.NewGuid();
                int id = _service.Create(model, token.ToString());
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                _mailService.SendConfirmation(model.Email, id, token);
                result = Ok(response);

            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [AllowAnonymous]
        [HttpPut("{id:int}")] 
        public ActionResult<SuccessResponse> UserStatusUpdate(UserConfirmRequest model)
        {
           
            ObjectResult result = null;
            try
            {
                _service.UserStatusUpdate(model.Id, model.Token);

                SuccessResponse response = new SuccessResponse();

                result = StatusCode(200, response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
        
        [AllowAnonymous]
        [HttpGet("recover")]
        public ActionResult<ItemResponse<Recover>> RecoverPassword(string email)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                string token = Guid.NewGuid().ToString();
                int id = _service.RecoverPassword(email, token);
                _mailService.RecoverPassword(email, token);

                if (id > 0)
                {
                    response = new ItemResponse<Recover> {Item = new Recover(token, id, email)};
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("Not a valid user found.");
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }
       
        [AllowAnonymous]
        [HttpPut("reset")]
        public ActionResult<ItemResponse<int>> ResetPassword(UserUpdateRequest model)
        
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int id = _service.ResetPassword(model);


                if (id > 0)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("logout")]
        public ActionResult<SuccessResponse> Logout()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.LogOutUser(); 
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
    }


