
namespace Web.Api.Controllers
{
    [Route("api/admin/dashboard")]
    [ApiController]
    public class AdminDashboardApiController : BaseApiController
    {
        private IAdminDashboardService _service = null;
        private IAuthenticationService<int> _authService = null;
        public AdminDashboardApiController(IAdminDashboardService service
            , ILogger<AdminDashboardApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet()]
        public ActionResult<ItemResponse<List<AdminDashboard>>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<AdminDashboard> list = _service.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<AdminDashboard>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }

        [HttpGet("recentMetrics")]
        public ActionResult<ItemResponse<List<AdminDashboardRecentMetrics>>> AdminDashboardRecentMetrics()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<AdminDashboardRecentMetrics> list = _service.AdminDashboardRecentMetrics();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<AdminDashboardRecentMetrics>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }


    }
}
