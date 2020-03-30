using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class AdminDashboard
    {
        public int JobsAppliedForCount { get;set;}
        public int TotalJobsCount { get;set;}
        public int EventCount {get;set;}
        public int OrganizationsCount { get;set;}
    }
}
