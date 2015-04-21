using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orc.ReactExample.Models
{
    public class ArticleFolderViewModel
    {
        public ArticleFolderViewModel()
        {
            Articles = new List<ArticleViewModel>();
        }
        public List<ArticleViewModel> Articles { get; set; }
    }

  
}