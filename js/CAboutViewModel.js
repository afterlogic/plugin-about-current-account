function CAboutViewModel()
{
	this.count = ko.observable(0);

	this.version = ko.observable('');
	this.version.loading = ko.observable(false);
	
	this.currentEmail = ko.observable('');
	this.currentFriendlyName = ko.observable('');
	this.currentID = ko.observable('');

	this.currentUserLink = ko.computed(function () {
		var sEmail = this.currentEmail(), sID = this.currentID(), sFriendlyName = this.currentFriendlyName();
		return '' === sEmail ? '' :
			'http://afterlogic.com/?userid=' + encodeURIComponent(sID) +
				'&usermail=' + encodeURIComponent(sEmail) +
				'&username=' + encodeURIComponent(sFriendlyName);
	}, this);
}

CAboutViewModel.prototype.TemplateName = 'Plugin_AboutTemplate';
CAboutViewModel.prototype.TabName = 'about';
CAboutViewModel.prototype.TabTitle = AfterLogicApi.i18n('PLUGIN_ABOUT/TAB_NAME');

CAboutViewModel.prototype.clickSampleButton = function ()
{
	this.count(this.count() + 1);
};

CAboutViewModel.prototype.clickOtherButton = function ()
{
//	var mData = AfterLogicApi.getPrimaryAccountData();
	var mData = AfterLogicApi.getCurrentAccountData();

	if ('' === this.currentEmail())
	{
		this.currentEmail(mData['Email'] || '');
		this.currentFriendlyName(mData['FriendlyName'] || '');
		this.currentID(mData['Id'] || '');
	}
	else
	{
		this.currentEmail('');
		this.currentFriendlyName('');
		this.currentID('');
	}
};

CAboutViewModel.prototype.getAjaxData = function ()
{
	if (!this.version.loading())
	{
		this.version.loading(true);

		AfterLogicApi.sendAjaxRequest({
			'Action': 'PluginGetAjaxData',
			'Input': 'CustomClientData'
		}, function (oData) {
			this.version.loading(false);
			if (oData && oData['Data'])
			{
				this.version(oData['Data']);
			}
		}, this);
	}
};

AfterLogicApi.addSettingsTab(CAboutViewModel);
