using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Orc.SuperchargedReact.Web;
using Umbraco.Core;

namespace Orc.ReactExample
{
    public class RegisterEvents : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            ReactConfiguration.Current = new ReactConfiguration()
            {
                FilePath = "~/assets/bundle.js", 
                SerializerSettings = Constants.JsonSettings
            };
        }
    }
}