using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class CoursesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

