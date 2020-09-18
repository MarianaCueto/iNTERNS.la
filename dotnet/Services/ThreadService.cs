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

namespace Sabio.Services
{
    public class ThreadsService : IThreadsService
    {
        IDataProvider _data = null;
        public ThreadsService(IDataProvider data)
        {
            _data = data;
        }
        public Thread Get(int id)
        {
            string procName = "[dbo].[Threads_SelectById_V3]";
            Thread t = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                 t = MapperSelect(reader);

            }
            );
            return t;
        }
        public Paged<Thread> Paginate(int pageIndex, int pageSize)
        {
            Paged<Thread> pagedResult = null;

            List<Thread> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Threads_SelectAll_V5]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                 
                  
                     Thread t = MapperSelect(reader);


                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(10);
                    }

                    if (result == null)
                    {
                        result = new List<Thread>();
                    }

                    result.Add(t);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Thread>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public Paged<Thread> GetByCurrent(int pageIndex, int pageSize, int id)
        {
            Paged<Thread> pagedResult = null;

            List<Thread> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Threads_SelectByCreatedBy_V2]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@CreatorId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    Thread t = MapperSelect(reader);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(10);
                    }
                    if (result == null)
                    {
                        result = new List<Thread>();
                    }
                    result.Add(t);
                }
            );
            if (result != null)
            {
                pagedResult = new Paged<Thread>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Thread> Search(int pageIndex, int pageSize, string search)
        {
            Paged<Thread> pagedResult = null;

            List<Thread> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Threads_Search_V2]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Search", search);
                },
               singleRecordMapper: delegate (IDataReader reader, short set)
               {


                   Thread t = MapperSelect(reader);


                   if (totalCount == 0)
                   {
                       totalCount = reader.GetSafeInt32(10);
                   }

                   if (result == null)
                   {
                       result = new List<Thread>();
                   }

                   result.Add(t);
               }

            );
            if (result != null)
            {
                pagedResult = new Paged<Thread>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
    
        public int Add(ThreadAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Threads_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
                col.AddWithValue("@Subject", model.Subject);
                col.AddWithValue("@IsActive", model.IsActive);
                col.AddWithValue("@createdBy", userId);

            },
             returnParameters: delegate (SqlParameterCollection returncollection)
             {
                 object oid = returncollection["@id"].Value;
                 int.TryParse(oid.ToString(), out id);
             });
            return id;
        }
        public void Update(ThreadUpdateRequest model)
        {
            string procName = "[dbo].[Threads_Update_V2]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@Subject", model.Subject);
                    col.AddWithValue("@IsActive", model.IsActive);
                },
            returnParameters: null);
        }
        public void Delete(int id)

        {
            string procName = "[dbo].[Threads_Delete_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);

                },
                    returnParameters: null);
        }
        private static Thread MapperSelect(IDataReader reader)
        {
           Thread thread = new Thread();
            int index = 0;
            thread.Id = reader.GetSafeInt32(index++);
            thread.Subject = reader.GetSafeString(index++);
            thread.IsActive = reader.GetSafeBool(index++);
            thread.CreatedBy = reader.GetSafeInt32(index++);
            thread.FirstName = reader.GetSafeString(index++);
            thread.Mi = reader.GetSafeString(index++);
            thread.LastName = reader.GetSafeString(index++);
            thread.AvatarUrl = reader.GetSafeString(index++);
            thread.DateCreated = reader.GetSafeDateTime(index++);
            thread.PostCount = reader.GetSafeInt32(index++);
            return thread;
        }

    }
}
