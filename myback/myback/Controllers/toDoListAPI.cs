using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using myback.Models;

namespace myback.Controllers
{
    [Route("vue3API/[controller]")]
    [ApiController]
    public class toDoListAPI : ControllerBase
    {
        private readonly OLDemoContext _context;
        public toDoListAPI(OLDemoContext context)
        {
            _context = context;
        }
        [HttpPost("search")]
        public async Task<ActionResult<object>> search(serchAPIType search)
        {
            try
            {
                string aString = "0";
                _ = aString + 1;

                string? list_name = search.parameter.list_name;
                string? description = search.parameter.description;
                string? done_yn = search.parameter.done_yn;

                if (done_yn != "Y" && done_yn != "N" && !string.IsNullOrWhiteSpace(done_yn))
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "錯誤 done_yn 只能是Y或N或空值");
                }

                var result = await (from e in _context.to_do_list
                                    where (string.IsNullOrWhiteSpace(list_name) || e.list_name.Contains(list_name)) &&
                                    (string.IsNullOrWhiteSpace(description) || e.description.Contains(description)) &&
                                    (string.IsNullOrWhiteSpace(done_yn) || e.done_yn.Contains(done_yn))
                                    select e).ToListAsync();

                //var result = await _context.to_do_list.
                //    Where(data => (string.IsNullOrWhiteSpace(list_name) || data.list_name.Contains(list_name))
                //               && (string.IsNullOrWhiteSpace(description) || data.description.Contains(description)))
                //    .Select(data => new { data.list_name, data.description })
                //    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, result);
            }
            catch (Exception err)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
            }
        }

        [HttpPost("insert")]
        public async Task<ActionResult<object>> insert(insertAPIType data)
        {
            try
            {
                string list_name = data.parameter.list_name;
                string done_yn = data.parameter.done_yn;
                string? description = data.parameter.description;

                if (string.IsNullOrEmpty(list_name))
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "清單名稱為必填");
                }
                if (done_yn != "Y" && done_yn != "N" && !string.IsNullOrWhiteSpace(done_yn))
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "錯誤");
                }

                if (done_yn != "Y")
                {
                    done_yn = "N";
                }
                var to_do_list = new to_do_list();
                to_do_list.list_name = list_name;
                to_do_list.done_yn = done_yn;
                to_do_list.description = description;
                to_do_list.createdate_time = DateTime.Now;
                to_do_list.update_time = DateTime.Now;
                _context.to_do_list.Add(to_do_list);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception err)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
            }
        }

        [HttpPut("modify")]
        public async Task<ActionResult<object>> modify(modifyAPIType data)
        {
            try
            {
                int list_id = data.parameter.list_id;
                string list_name = data.parameter.list_name;
                string done_yn = data.parameter.done_yn;
                string? description = data.parameter.description;

                if (string.IsNullOrEmpty(list_name))
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "清單名稱為必填");
                }
                if (done_yn != "Y" && done_yn != "N")
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "錯誤");
                }

                var upDateList = await (from e in _context.to_do_list where e.list_id.Equals(list_id) select e).FirstOrDefaultAsync();

                if (upDateList == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

                //foreach (var item in upDateList)
                //{
                upDateList.list_name = list_name;
                upDateList.description = description;
                upDateList.done_yn = done_yn;
                upDateList.update_time = DateTime.Now;
                //}

                _context.to_do_list.Update(upDateList);

                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception err)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<object>> delete(deleteAPIType data)
        {
            try
            {
                int list_id = data.parameter.list_id;

                var upDateList = await (from e in _context.to_do_list where e.list_id.Equals(list_id) select e).FirstOrDefaultAsync();

                if (upDateList == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, "是想找到甚麼!??");
                }

                _context.to_do_list.Remove(upDateList);

                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception err)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, err.Message);
            }
        }

        // 搜尋API型別
        public record serchAPIType(toDoListType parameter);
        public record toDoListType(string? list_name, string? description, string? done_yn);

        // 新增API型別
        public record insertAPIType(insertAPIToDoListType parameter);
        public record insertAPIToDoListType(string list_name, string? description, string done_yn, DateTime? sdate_time, DateTime? edate_time);

        // 編輯API型別
        public record modifyAPIType(modifyAPIToDoListType parameter);
        public record modifyAPIToDoListType(int list_id, string list_name, string? description, string done_yn);

        // 刪除API型別
        public record deleteAPIType(deleteAPIToDoListType parameter);
        public record deleteAPIToDoListType(int list_id);
    }
}
