using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services.Security
{
    public class AdminDashboardService : IAdminDashboardService
    {
        IDataProvider _data = null;
        public AdminDashboardService(IDataProvider data)
        {
            _data = data;
        }

        public List<AdminDashboard> GetAll()
        {
            List<AdminDashboard> list = null;
            string procName = "[dbo].[AdminDashboard]";

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    AdminDashboard adminDashboard = null;
                    adminDashboard = MapperDashboard(reader);

                    if (list == null)
                    {
                        list = new List<AdminDashboard>();
                    }
                    if (adminDashboard != null)
                    {
                        list.Add(adminDashboard);
                    }
                });
            return list;
        }

        public List<AdminDashboardRecentMetrics> AdminDashboardRecentMetrics()
        {
            List<AdminDashboardRecentMetrics> list = null;
            string procName = "[dbo].[Admin_Dashboard_SelectAll_RecentMetrics_V2]";

            _data.ExecuteCmd(procName, inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    AdminDashboardRecentMetrics adminDashboardRecentMetrics = null;
                    adminDashboardRecentMetrics = Mapper(reader);

                    if (list == null)
                    {
                        list = new List<AdminDashboardRecentMetrics>();
                    }
                    if (adminDashboardRecentMetrics != null)
                    {
                        list.Add(adminDashboardRecentMetrics);
                    }
                });
            return list;
        }
        private static AdminDashboard MapperDashboard(IDataReader reader)
        {
            AdminDashboard adminDashboard = new AdminDashboard();
            int index = 0;
            adminDashboard.JobsAppliedForCount = reader.GetSafeInt32(index++);
            adminDashboard.TotalJobsCount = reader.GetSafeInt32(index++);
            adminDashboard.EventCount = reader.GetSafeInt32(index++);
            adminDashboard.OrganizationsCount = reader.GetSafeInt32(index++);
            return adminDashboard;
        }

        private static AdminDashboardRecentMetrics Mapper(IDataReader reader)
        {
            int i = 0;
            AdminDashboardRecentMetrics dash = new AdminDashboardRecentMetrics();
            string temp = reader.GetSafeString(i++);
            if (temp != null)
            {
                dash.RecentOrganizations = JsonConvert.DeserializeObject<List<AdminDashRecentOrg>>(temp);
            }

            temp = reader.GetSafeString(i++);
            if (temp != null)
            {
                dash.RecentUsers = JsonConvert.DeserializeObject<List<AdminDashRecentUser>>(temp);
            }

            temp = reader.GetSafeString(i++);
            if (temp != null)
            {
                dash.RecentJobs = JsonConvert.DeserializeObject<List<AdminDashRecentJob>>(temp);
            }


            temp = reader.GetSafeString(i++);
            if (temp != null)
            {
                dash.RecentEvents = JsonConvert.DeserializeObject<List<AdminDashRecentEvent>>(temp);
            }
            return dash;
        }

    }
}
