using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using myback.Models;

namespace myback.Controllers.aaaa
{
    [Route("trytrysee/[controller]")]
    [ApiController]
    public class aaaaController : ControllerBase
    {
        private readonly OLDemoContext _context;
        public aaaaController(OLDemoContext context)
        {
            _context = context;
        }

        [HttpPost("apple")]
        public async Task<ActionResult<object>> banana(aaaa search)
        {
            try
            {
                string? list_name = search.parameter.list_name;
                string? description = search.parameter.description;

                var result = await (from e in _context.to_do_list
                                    where (string.IsNullOrWhiteSpace(list_name) || e.list_name.Contains(list_name)) &&
                                    (string.IsNullOrWhiteSpace(description) || e.description.Contains(description))
                                    select new { e.description, e.list_name }).ToListAsync();

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

        public record aaaa(bbbb parameter);
        public record bbbb(string? list_name, string? description);

    }

}
