using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
