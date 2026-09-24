using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
