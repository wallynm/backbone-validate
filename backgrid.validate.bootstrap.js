_.extend(Backbone.Validation.callbacks, {

  valid: function ( view, attr, selector )
  {
    var control = view.$('[name=' + attr + ']');
    var group   = control.parents("div").eq(0);
    group.removeClass("has-error");
    group.find('div#errorMsg').remove();
  },

  invalid: function ( view, attr, error, selector )
  {
    var control      = view.$('[name='+attr+']');

    if( !_.isUndefined(control.parent()[0]) ){

      var group = control.parents('div').eq(0);

      // seta o with do elemento que será exibido a mensagem de erro
      // tento um espaço mínimo para a apresentação da mensagem
      var width        = group.attr('width-child-error');
      var parentWidth  = control.parent()[0].clientWidth;

      if(width != undefined && parseInt(width) > parentWidth)
      {
        width = 'width: '+width+'px';
      }
      var msgError = "<div id='errorMsg' style='color: red;"+width+"'></div>";

      group.addClass("has-error")

      // tooltip does not used
      if (control.data("error-style") === "tooltip")
      {
        var position = control.data("tooltip-position") || "right";
        control.tooltip({
          placement: position,
          trigger: "manual",
          title: error
        });
        control.tooltip("show");
      }
      else
      {
        if (group.find("#errorMsg").length === 0)
        {
          group.append(msgError)
        }
        var target = group.find("#errorMsg");
        target.text(error);
      }
    }
  }

});
