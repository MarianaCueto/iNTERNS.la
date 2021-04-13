using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Services.Interfaces
{
    public interface IThreadsService
    {
        Thread Get(int id);
        Paged<Thread> Paginate(int pageIndex, int pageSize);
        Paged<Thread> Search(int pageIndex, int pageSize, string search);
        Paged<Thread> GetByCurrent(int pageIndex, int pageSize, int id);
        int Add(ThreadAddRequest model, int userId);
        void Update(ThreadUpdateRequest model);
        void Delete(int id);

    }
}
