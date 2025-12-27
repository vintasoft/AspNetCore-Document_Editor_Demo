using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreDocumentEditorDemo.Controllers
{
    public class DefaultController : Controller
    {

        public DefaultController()
        {
        }



        public IActionResult Index()
        {
            return View();
        }

    }
}
