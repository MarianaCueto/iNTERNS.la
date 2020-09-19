namespace Sabio.Web.Api.Controllers
{
    [Route("api/email")]
    [ApiController]
    public class EmailApiController : BaseApiController
    {
        private IEmailService _mailService = null;

        public EmailApiController(
           IEmailService mailService, ILogger<EmailApiController> logger
          ) : base(logger)
        {
            _mailService = mailService;
        }

        [HttpPost]
        public ActionResult<SuccessResponse> SendEmailAsync(string toEmail,int id)
        {
            BaseResponse result;
            int statusCode = 200;
            Guid token = Guid.NewGuid();
            try
            {
                _mailService.SendConfirmation(toEmail,id, token);

                result = new SuccessResponse();
            }
            catch (Exception ex)
            {
                result = new ErrorResponse(ex.Message);
                statusCode = 500;
            }
            return StatusCode(statusCode, result);
        }

        [AllowAnonymous]
        [HttpPost("contact")]
        public ActionResult<SuccessResponse> ContactUs(ContactUs model)
        {
            BaseResponse result;
            int statusCode = 200;
            try
            {
              
                _mailService.ContactUs(model);
                result = new SuccessResponse();
            }
            catch (Exception ex)
            {
                result = new ErrorResponse(ex.Message);
                statusCode = 500;
            }
            return StatusCode(statusCode, result);
        }

    }


}
