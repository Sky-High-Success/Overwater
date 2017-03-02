// Generated by CoffeeScript 1.4.0

/*

LEGAL COPYRIGHT NOTICE

Copyright (c) Noble Samurai Pty Ltd, 2008-2013. All Rights Reserved.

This software is proprietary to and embodies the confidential technology of Noble Samurai Pty Ltd.
Possession, use, dissemination or copying of this software and media is authorised only pursuant
to a valid written license from Noble Samurai Pty Ltd. Questions or requests regarding permission may
be sent by email to legal@noblesamurai.com or by post to PO Box 477, Blackburn Victoria 3130, Australia.
*/


(function() {

  (function($) {
    tinymce.PluginManager.requireLangPack('ss_inline_timer');
    tinymce.create('tinymce.plugins.SSInlineTimerPlugin', {
      /*
             Initializes the plugin, this will be executed after the plugin has been
             created. This call is done before the editor instance has finished it's
             initialization so use the onInit event of the editor instance to
             intercept that event.
      
             @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
             @param {string} url Absolute URL to where the plugin is located.
      */

      init: function(ed, url) {
        var timerHTML,
          _this = this;
        this.url = url;
        this.editor = ed;
        timerHTML = function(args) {
          var attributes;
          attributes = ScarcitySamuraiHelper.buildAttributesHTML({
            'class': 'ss-inline-timer-placeholder mceItemNoResize',
            'src': "" + url + "/../../../images/tinymce/inline-timer-placeholder.png",
            'data-ss-timer-timestamp': args != null ? args.timer_timestamp : void 0,
            'data-ss-timer-format': args != null ? args.timer_format : void 0
          });
          return "<img " + attributes + " />";
        };
        ed.addCommand('ssInsertInlineTimer', function(ui) {
          return ed.execCommand('mceInsertContent', ui, timerHTML());
        });
        this._createButtons();
        ed.onMouseDown.add(function(ed, e) {
          return _this._showButtons(e);
        });
        ed.onBeforeExecCommand.add(function() {
          return _this._hideButtons();
        });
        ed.onSaveContent.add(function() {
          return _this._hideButtons();
        });
        ed.onKeyDown.add(function(ed, e) {
          if (e.which === tinymce.VK.DELETE || e.which === tinymce.VK.BACKSPACE) {
            return _this._hideButtons();
          }
        });
        ed.onPostRender.add(function() {
          if (!ed.theme.onResolveName) {
            return;
          }
          return ed.theme.onResolveName.add(function(th, o) {
            if ($(o.node).is('img.ss-inline-timer-placeholder')) {
              return o.name = 'ss-timer';
            }
          });
        });
        ed.onPostProcess.add(function(ed, o) {
          var $wrapper;
          if (o.get) {
            $wrapper = $('<div />').html(o.content);
            $('.ss-inline-timer-placeholder', $wrapper).each(function() {
              return $(this).replaceWith(ScarcitySamuraiHelper.inlineTimerHTMLComment({
                timer_timestamp: $(this).data('ss-timer-timestamp'),
                timer_format: $(this).data('ss-timer-format')
              }));
            });
            return o.content = $wrapper.html();
          }
        });
        return ed.onBeforeSetContent.add(function(ed, o) {
          var regex;
          if (!o.content) {
            return;
          }
          regex = /<!--\s*ss-timer\s+(.*?)\s*-->/g;
          return o.content = o.content.replace(regex, function(match, attributes) {
            var $element;
            $element = $("<element " + attributes + " />");
            return timerHTML({
              timer_timestamp: $element.attr('timestamp'),
              timer_format: $element.attr('format')
            });
          });
        });
      },
      _createButtons: function() {
        var $buttons, $deleteButton, isRetina, x2,
          _this = this;
        if ($('#ss-inline-timer-edit-buttons').length) {
          return;
        }
        isRetina = (window.devicePixelRatio && window.devicePixelRatio > 1) || (window.matchMedia && window.matchMedia('(min-resolution:130dpi)').matches);
        x2 = isRetina ? '-x2' : '';
        $buttons = $('<div />').attr({
          id: 'ss-inline-timer-edit-buttons'
        }).addClass('ss-placeholder').hide();
        $deleteButton = $('<img />').attr({
          src: "" + this.url + "/img/delete" + x2 + ".png",
          width: 24,
          height: 24
        });
        $deleteButton.click(function() {
          return _this._deleteTimer();
        });
        $buttons.append($deleteButton);
        return $(document.body).append($buttons);
      },
      _showButtons: function(e) {
        this._hideButtons();
        if (!$(e.target).is('img.ss-inline-timer-placeholder')) {
          return;
        }
        return this.editor.plugins.wordpress._showButtons(e.target, 'ss-inline-timer-edit-buttons');
      },
      _hideButtons: function() {
        return $('#ss-inline-timer-edit-buttons').hide();
      },
      _deleteTimer: function() {
        var ed, el;
        ed = tinymce.activeEditor;
        el = ed.selection.getNode();
        if (!$(el).is('img.ss-inline-timer-placeholder')) {
          return;
        }
        this._hideButtons();
        return $(el).remove();
      },
      /*
             Returns information about the plugin as a name/value array.
             The current keys are longname, author, authorurl, infourl and version.
      
             @return {Object} Name/value array containing information about the plugin.
      */

      getInfo: function() {
        return {
          longname: 'Scarcity Samurai Inline Timer Plugin',
          author: 'Noble Samurai',
          authorurl: 'http://scarcitysamurai.com',
          infourl: 'http://scarcitysamurai.com',
          version: '1.0'
        };
      }
    });
    return tinymce.PluginManager.add('ss_inline_timer', tinymce.plugins.SSInlineTimerPlugin);
  })(jQuery);

}).call(this);
