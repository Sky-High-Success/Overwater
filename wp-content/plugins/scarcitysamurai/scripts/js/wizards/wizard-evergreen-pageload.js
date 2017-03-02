// Generated by CoffeeScript 1.6.3
/*

LEGAL COPYRIGHT NOTICE

Copyright (c) Noble Samurai Pty Ltd, 2008-2013. All Rights Reserved.

This software is proprietary to and embodies the confidential technology of Noble Samurai Pty Ltd.
Possession, use, dissemination or copying of this software and media is authorised only pursuant
to a valid written license from Noble Samurai Pty Ltd. Questions or requests regarding permission may
be sent by email to legal@noblesamurai.com or by post to PO Box 477, Blackburn Victoria 3130, Australia.
*/


(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery(function($) {
    var ScarcitySamuraiWizardEvergreenPageload;
    ScarcitySamuraiWizardEvergreenPageload = (function() {
      function ScarcitySamuraiWizardEvergreenPageload() {
        this.securityParams = {
          security_token: $('[name="security_token"]').val(),
          _wp_http_referer: $('[name="_wp_http_referer"]').val()
        };
        this.ajaxAction = scarcitySamuraiData.ajax_action;
        this.existingCampaigns = scarcitySamuraiData.campaigns;
        this.$wizardWrapper = $('.menu-edit');
        this.page = 0;
        this.lastPage = 4;
        this.campaignCreated = false;
        this.errors = [];
        this.$progressBar = $('.scarcity-samurai-wizard-progress-bar');
        this.$content = $('.scarcity-samurai-wizard-content');
        this.$backButton = $('.scarcity-samurai-wizard-buttons .back');
        this.$continueButton = $('.scarcity-samurai-wizard-buttons .continue');
        this.$finishButton = $('.scarcity-samurai-wizard-buttons .finish');
        this.$viewCampaignButton = $('.scarcity-samurai-wizard-buttons .view_campaign');
        this.$campaignName = $('[name="ss-wizard-evergreen-pageload-campaign-name"]');
        this.$pageId = $('[name="ss-wizard-evergreen-pageload-page-id"]');
        this.$days = $('[name="ss-wizard-evergreen-pageload-days"]');
        this.$hours = $('[name="ss-wizard-evergreen-pageload-hours"]');
        this.$minutes = $('[name="ss-wizard-evergreen-pageload-minutes"]');
        this.$seconds = $('[name="ss-wizard-evergreen-pageload-seconds"]');
        this.$tooLateAction = $('[name="ss-wizard-evergreen-pageload-timer-expired"]');
        this.$tooLateActionRedirectPageId = $('[name="ss-wizard-evergreen-pageload-timer-expired-redirect-page-id"]');
        this.$tooLateActionRedirectUrl = $('[name="ss-wizard-evergreen-pageload-timer-expired-redirect-url"]');
        this.$bannerPosition = $('[name="ss-wizard-evergreen-pageload-banner-position"]');
        this.$bannerId = $('[name="ss-wizard-evergreen-pageload-banner-id"]');
        this.$bannerShowType = $('[name="ss-wizard-evergreen-pageload-banner-show-type"]');
        this.$bannerShowValue = $('.ss-show-value-input');
        this.$bannerClickActionWrapper = $('.ss-wizard-evergreen-pageload-banner-click-action-wrapper');
        this.$bannerAction = $('[name="ss-wizard-evergreen-pageload-banner-action"]');
        this.$bannerActionRedirectPageId = $('[name="ss-wizard-evergreen-pageload-banner-action-redirect-page-id"]');
        this.$bannerActionRedirectUrl = $('[name="ss-wizard-evergreen-pageload-banner-action-redirect-url"]');
        this.$unpublishedPageWarning = $('.ss-wizard-evergreen-pageload-unpublished-page-warning');
        this.$publishItNowButton = this.$unpublishedPageWarning.find('.button');
        this.$unpublishedPage = this.$unpublishedPageWarning.find('ul');
        this.$pageLink = $('.ss-wizard-evergreen-pageload-page-link');
        this.$pageTitle = $('.ss-wizard-evergreen-pageload-page-title');
        this.$pageEditLink = $('.ss-wizard-evergreen-pageload-page-edit-link');
        this.$pageViewLink = $('.ss-wizard-evergreen-pageload-page-view-link');
        this.$pageEmailURL = $('.ss-wizard-evergreen-pageload-page-email-url');
        this.$copyToClipboardButton = $('.ss-wizard-evergreen-pageload-copy-to-clipboard-button');
        this.$copyToClipboardConfirmation = this.$copyToClipboardButton.siblings('.ss-copy-to-clipboard-confirmation-message');
        $('.ss-page-select').select2({
          placeholder: 'Select a page...',
          width: '300px'
        });
        $('.ss-banner-select').select2({
          width: '300px'
        });
        this.createBindings();
        this.update();
        this.$wizardWrapper.show();
        this.setFocus();
      }

      ScarcitySamuraiWizardEvergreenPageload.prototype.createBindings = function() {
        var self,
          _this = this;
        self = this;
        this.$pageId.change(function() {
          return ScarcitySamuraiHelper.loadPageToEditor({
            page_id: parseInt($(this).val()),
            security_params: self.securityParams
          });
        });
        $.each([this.$tooLateAction, this.$bannerAction], function(index, $el) {
          return $el.change(function() {
            if (!this.checked) {
              return;
            }
            $(this).closest('ul').find('.ss-opts').hide();
            return $(this).closest('li').find('.ss-opts').show().find('input').eq(0).focus();
          }).change();
        });
        this.$bannerPosition.change(function() {
          if (!this.checked) {
            return;
          }
          $(".ss-banner-pos-opts:not(." + this.value + ")").hide();
          return $(".ss-banner-pos-opts." + this.value).show();
        }).change();
        this.$bannerId.change(function() {
          return self.$bannerClickActionWrapper.toggle(this.value !== '');
        });
        this.$bannerShowValue.click(function() {
          return $(this).siblings('[type="radio"]').click();
        });
        this.$progressBar.find('li').click(function() {
          if ($(this).is('.done') && !self.campaignCreated) {
            self.page = $(this).index();
            return self.update();
          }
        });
        this.$backButton.click(function() {
          _this.page -= 1;
          return _this.update();
        });
        this.$continueButton.click(function() {
          if (!_this.validate()) {
            return;
          }
          _this.page += 1;
          return _this.update();
        });
        this.$finishButton.click(function() {
          if (!_this.validate()) {
            return;
          }
          return _this.createCampaign();
        });
        this.$viewCampaignButton.click(function() {
          return window.location = "?page=scarcitysamurai/campaigns&action=edit&id=" + _this.campaignId;
        });
        this.$campaignName.keyup(function(event) {
          if (event.keyCode === 13) {
            return _this.$continueButton.click();
          }
        });
        this.$publishItNowButton.click(function() {
          return _this.publishItNow();
        });
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.update = function() {
        this.updateProgressBar();
        this.updateContent();
        this.updateButtons();
        if (this.page === this.lastPage) {
          return this.bindCopyToClipboardButton();
        }
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.updateProgressBar = function() {
        var _this = this;
        return this.$progressBar.find('li').each(function(index, menuItem) {
          if (index < _this.page) {
            return $(menuItem).removeClass('current').addClass('done');
          } else if (index === _this.page) {
            return $(menuItem).removeClass('done').addClass('current');
          } else {
            return $(menuItem).removeClass('done current');
          }
        });
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.updateContent = function() {
        var _this = this;
        return this.$content.find('> div').each(function(index, contentPage) {
          if (index === _this.page) {
            $(contentPage).show();
            _this.$validationErrorsWrapper = $(contentPage).find('.ss-wizard-validation-errors');
            return _this.$validationErrors = _this.$validationErrorsWrapper.find('ul');
          } else {
            return $(contentPage).hide();
          }
        });
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.updateButtons = function() {
        this.$backButton.toggle(this.page > 0 && this.page < this.lastPage);
        this.$continueButton.toggle(this.page < this.lastPage - 1);
        this.$finishButton.toggle(this.page === this.lastPage - 1);
        return this.$viewCampaignButton.toggle(this.page === this.lastPage);
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.setFocus = function() {
        return this.$content.find('input:visible:first').focus();
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.validate = function() {
        var bannerId, error, pageId, redirectUrl, showValue, _i, _len, _ref, _ref1, _ref2;
        this.errors = [];
        switch (this.page) {
          case 0:
            this.campaignName = $.trim(this.$campaignName.val());
            if (this.campaignName === '') {
              this.errors.push('Campaign name cannot be blank.');
            } else if (_ref = this.campaignName, __indexOf.call(this.existingCampaigns, _ref) >= 0) {
              this.errors.push('Campaign name already exists.');
            }
            break;
          case 1:
            this.pageId = this.$pageId.val();
            this.pageId = this.pageId === '' ? null : parseInt(this.pageId, 10);
            if (this.pageId === null) {
              this.errors.push('Page must be selected.');
            }
            break;
          case 2:
            this.days = $.trim(this.$days.val());
            if (this.days === '' || ScarcitySamuraiHelper.isNumber(this.days)) {
              this.days = +this.days;
            } else {
              this.errors.push('Days must be a valid number.');
            }
            this.hours = $.trim(this.$hours.val());
            if (this.hours === '' || ScarcitySamuraiHelper.isNumber(this.hours)) {
              this.hours = +this.hours;
            } else {
              this.errors.push('Hours must be a valid number.');
            }
            this.minutes = $.trim(this.$minutes.val());
            if (this.minutes === '' || ScarcitySamuraiHelper.isNumber(this.minutes)) {
              this.minutes = +this.minutes;
            } else {
              this.errors.push('Minutes must be a valid number.');
            }
            this.seconds = $.trim(this.$seconds.val());
            if (this.seconds === '' || ScarcitySamuraiHelper.isNumber(this.seconds)) {
              this.seconds = +this.seconds;
            } else {
              this.errors.push('Seconds must be a valid number.');
            }
            if ((this.errors.length === 0) && (this.days + this.hours + this.minutes + this.seconds === 0)) {
              this.errors.push('Time period cannot be 0.');
            }
            this.tooLateAction = {
              action: this.$tooLateAction.filter(':checked').val()
            };
            switch (this.tooLateAction.action) {
              case 'redirect_to_page':
                pageId = this.$tooLateActionRedirectPageId.val();
                pageId = pageId === '' ? null : parseInt(pageId, 10);
                if (pageId === null) {
                  this.errors.push('Redirect page must be selected.');
                }
                this.tooLateAction.page_id = pageId;
                break;
              case 'redirect_to_url':
                redirectUrl = $.trim(this.$tooLateActionRedirectUrl.val());
                if (redirectUrl === '') {
                  this.errors.push('Redirect URL must be specified.');
                } else if (!ScarcitySamuraiHelper.isValidURL(redirectUrl)) {
                  this.errors.push("Redirect URL is invalid.");
                }
                this.tooLateAction.url = redirectUrl;
            }
            break;
          case 3:
            this.banner = {
              position: this.$bannerPosition.filter(':checked').val()
            };
            if ((_ref1 = this.banner.position) !== 'header' && _ref1 !== 'footer') {
              break;
            }
            bannerId = this.$bannerId.val();
            this.banner.banner_id = bannerId === '' ? null : parseInt(bannerId, 10);
            if (this.banner.banner_id === null) {
              this.errors.push('Banner must be selected.');
            }
            this.banner.show = {
              type: this.$bannerShowType.filter(':checked').val()
            };
            if (this.banner.show.type === 'page_load') {
              showValue = $.trim(this.$bannerShowValue.val());
              if (ScarcitySamuraiHelper.isNumber(showValue)) {
                this.banner.show.value = parseInt(showValue, 10);
              } else {
                this.errors.push("Banner's reveal time must be a valid number.");
              }
            }
            this.banner.click_action = {
              action: this.$bannerAction.filter(':checked').val()
            };
            switch (this.banner.click_action.action) {
              case 'redirect_to_page':
                pageId = this.$bannerActionRedirectPageId.val();
                pageId = pageId === '' ? null : parseInt(pageId, 10);
                if (pageId === null) {
                  this.errors.push("Banner's redirect page must be selected.");
                }
                this.banner.click_action.page_id = pageId;
                break;
              case 'redirect_to_url':
                redirectUrl = $.trim(this.$bannerActionRedirectUrl.val());
                if (redirectUrl === '') {
                  this.errors.push("Banner's redirect URL must be specified.");
                } else if (!ScarcitySamuraiHelper.isValidURL(redirectUrl)) {
                  this.errors.push("Banner's redirect URL is invalid.");
                }
                this.banner.click_action.url = redirectUrl;
            }
        }
        if (this.errors.length === 0) {
          this.$validationErrorsWrapper.hide();
          return true;
        }
        this.$validationErrors.empty();
        _ref2 = this.errors;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          error = _ref2[_i];
          this.$validationErrors.append("<li>" + error + "</li>");
        }
        this.$validationErrorsWrapper.show();
        return false;
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.createCampaign = function() {
        var data, params,
          _this = this;
        params = {
          campaign_name: this.$campaignName.val(),
          page_id: this.pageId,
          page_expiry: {
            value: 86400 * this.days + 3600 * this.hours + 60 * this.minutes + this.seconds,
            too_late_action: this.tooLateAction
          },
          banner: this.banner
        };
        if (this.banner.position === 'content') {
          params.content = ScarcitySamuraiHelper.getEditorContent();
        }
        data = {
          action: this.ajaxAction,
          data: JSON.stringify(params)
        };
        data = _.extend(data, this.securityParams);
        return $.ajax({
          type: "POST",
          url: ajaxurl,
          data: data,
          dataType: 'json'
        }).done(function(result) {
          if (result.success) {
            return _this.showLastPage(result.data);
          } else {
            return ScarcitySamuraiHelper.error(result.data);
          }
        });
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.showLastPage = function(result) {
        var page;
        this.result = result;
        this.campaignCreated = true;
        this.campaignId = result.campaign_id;
        this.$progressBar.find('li').css('cursor', 'auto');
        page = result.page;
        if (!page.published) {
          this.$unpublishedPage.append("<li><a href='" + page.edit_url + "'>" + page.title + "</a></li>").show();
          this.$unpublishedPageWarning.show();
        }
        this.$pageTitle.closest('li').addClass("ss-page-" + result.page.id).toggleClass('ss-page-status-publish', result.page.published);
        this.$pageTitle.text(result.page.title);
        this.$pageEditLink.attr('href', result.page.edit_url);
        this.$pageViewLink.attr('href', result.page.view_url);
        this.$pageEmailURL.val(result.page.email_url);
        this.$pageLink.show();
        this.page += 1;
        return this.update();
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.bindCopyToClipboardButton = function() {
        var _this = this;
        this.$copyToClipboardButton.zclip('remove');
        if (this.$copyToClipboardButton.closest('.ss-page-status-publish').length === 0) {
          return;
        }
        return this.$copyToClipboardButton.zclip({
          path: '../wp-content/plugins/scarcitysamurai/vendor/zclip/ZeroClipboard.swf',
          zIndex: 1100,
          copy: function() {
            return _this.$copyToClipboardButton.siblings('input').val();
          },
          afterCopy: function() {
            _this.$copyToClipboardConfirmation.show();
            setTimeout(function() {
              return _this.$copyToClipboardConfirmation.fadeOut(1000);
            }, 5000);
          }
        });
      };

      ScarcitySamuraiWizardEvergreenPageload.prototype.publishItNow = function() {
        var data, publishItNowRequest,
          _this = this;
        data = {
          action: 'ss_publish_pages',
          data: JSON.stringify({
            campaign_id: this.campaignId
          })
        };
        data = _.extend(data, this.securityParams);
        publishItNowRequest = $.ajax({
          type: "POST",
          url: ajaxurl,
          data: data,
          dataType: 'json'
        });
        return publishItNowRequest.done(function(result) {
          var emailUrl, pageId, _ref;
          if (result.success) {
            _this.$unpublishedPageWarning.hide();
            _ref = result.data.email_urls;
            for (pageId in _ref) {
              emailUrl = _ref[pageId];
              $(".ss-page-" + pageId).addClass('ss-page-status-publish').find('.ss-page-url').val(emailUrl);
            }
            return _this.bindCopyToClipboardButton();
          } else {
            return ScarcitySamuraiHelper.error(result.data);
          }
        });
      };

      return ScarcitySamuraiWizardEvergreenPageload;

    })();
    return new ScarcitySamuraiWizardEvergreenPageload();
  });

}).call(this);
