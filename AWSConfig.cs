using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.AppSettings
{
    public class AWSConfig

    {
        public string AccessKey { get; set; }
        public string Secret { get; set; }
        public string Region { get; set; }
        public string Domain { get; set; }
        public string BucketName { get; set; }
    }
}

