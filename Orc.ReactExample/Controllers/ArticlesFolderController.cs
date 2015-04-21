using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Orc.ReactExample.Helpers;
using Orc.ReactExample.Models;
using Umbraco.Web;
using Umbraco.Web.Models;

namespace Orc.ReactExample.Controllers
{
    public class ArticlesFolderController : Umbraco.Web.Mvc.RenderMvcController
    { 
        public override ActionResult Index(RenderModel model)
        {
            var articles = model.Content.Children();
            var viewModel = new ArticleFolderViewModel();
            
            foreach (var articleContent in articles)
            {
                var articleModel = new ArticleViewModel();

                articleModel.Content= articleContent.GetPropertyValue<string>("bodyText")
                    .ScrubHtml()
                    .Truncate(200, true, true);

                articleModel.UrlName = articleContent.UrlName;
                articleModel.Title = articleContent.Name;
                articleModel.NumberOfComments = articleContent.Descendants("Comment").Count();
                viewModel.Articles.Add(articleModel);
            }

            if (Request.IsAjaxRequest())
            {
                return Json(viewModel);
            }

            ViewBag.Model = viewModel;
            
            //Do some stuff here, then return the base method
            return base.Index(model);
        }

    }
}