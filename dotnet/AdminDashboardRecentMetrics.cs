using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class AdminDashboardRecentMetrics
    {
    public List<AdminDashRecentOrg> RecentOrganizations { get; set; }
    public List<AdminDashRecentUser> RecentUsers { get; set; }
    public List<AdminDashRecentJob> RecentJobs{ get; set; }
    public List<AdminDashRecentEvent> RecentEvents { get; set; }
    }
}
