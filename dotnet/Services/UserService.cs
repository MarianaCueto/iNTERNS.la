using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.User;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }
            
            return isSuccessful;
        }

        public async Task<bool> LogOutUser()
        {
            await _authenticationService.LogOutAsync();
            bool isSuccessful = true;
            return isSuccessful;
        }
        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sab");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        public int Create(UserAddRequest model, string token)
        {
          

            int id = 0;
            _dataProvider.ExecuteNonQuery("[dbo].[UsersInsert_V3]", delegate (SqlParameterCollection col)
            {
                string salt = BCrypt.BCryptHelper.GenerateSalt();
                string hashPassword = BCrypt.BCryptHelper.HashPassword(model.Password, salt);
                col.AddWithValue("@Email", model.Email);
                col.AddWithValue("@Password", hashPassword);
                col.AddWithValue("@RoleId", model.RoleId);
                col.AddWithValue("@Token", token);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, delegate (SqlParameterCollection returnParams)
            {
                object oId = returnParams["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

    
        private IUserAuthData Get(string email, string password)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe
            string passwordFromDb = "";
            UserBase userAuth = null;
            User userInfo = null;
            List<Role> userRoles = null;

            _dataProvider.ExecuteCmd("[dbo].[Users_Login]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, delegate (IDataReader reader, short set)
            {
                userInfo = new User();
                int index = 0;
                userInfo.Id = reader.GetSafeInt32(index++);
                passwordFromDb = reader.GetSafeString(index++);
                string avatarUrl = reader.GetSafeString(index++);
                string roles = reader.GetSafeString(index++);
                userInfo.AvatarUrl =  avatarUrl ?? "";
                if (roles != null)
                {
                    if (userRoles == null)
                    {
                        userRoles = new List<Role>();
                    }
                    userRoles = JsonConvert.DeserializeObject<List<Role>>(roles);
                }
            });
            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, passwordFromDb);

            if (isValidCredentials)
            {

                userAuth = new UserBase();
                userAuth.Id = userInfo.Id;
                userAuth.Name = email;
                userAuth.Roles = userRoles.Select(r => r.Name).ToArray() ?? new[] { "Seeker" };
                userAuth.TenantId = userInfo.Id;
                userAuth.AvatarUrl = userInfo.AvatarUrl;
            }
            return userAuth;
        }
        public bool IsConfirmed(string email)
        {
            bool isConfirmed = false;
            _dataProvider.ExecuteCmd("[dbo].[Users_Select_IsConfirmed]", delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, delegate (IDataReader reader, short set)
            {
                isConfirmed = reader.GetSafeBool(0);
            });
            return isConfirmed;

        }
        public void UserStatusUpdate(int id, Guid token)
        {
            string procName = "[dbo].[Users_UpdateStatus_DeleteToken]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                    col.AddWithValue("@Token", token);
                },
                returnParameters: null);
        }
        public int RecoverPassword(string email, string token)
        {
            int id = 0;
            string procName = "[dbo].[Users_RecoverPassword]";

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
                paramCollection.AddWithValue("@Token", token);

                SqlParameter idOut = new SqlParameter("@UserId", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                paramCollection.Add(idOut);
            },
            delegate (SqlParameterCollection returnParams)
            {
                object oId = returnParams["@UserId"].Value;
                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }
        public int ResetPassword(UserUpdateRequest model) 

        {
            int id = 0;
            string procName = "[dbo].[Users_ResetPassword_V2]";
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashPassword = BCrypt.BCryptHelper.HashPassword(model.Password, salt);
           
            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Password", hashPassword);
                paramCollection.AddWithValue("@Token", model.Token);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                paramCollection.Add(idOut);

            },
           delegate (SqlParameterCollection returnParams)
           {
               object oId = returnParams["@Id"].Value;
               int.TryParse(oId.ToString(), out id);
           });

            return id;
        }
        public bool EmailExist(string email)

        {
            bool exist = false;
            string procName = "[dbo].[Users_Exist]";

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
            },
           delegate (IDataReader reader, short set)
           {
               int id = reader.GetSafeInt32(0);
               if(id != 0)
               {
                   exist = true;
               }
           });
            return exist;
        }
    }
}
