<?php

/* -AFTERLOGIC LICENSE HEADER- */

class_exists('CApi') or die();

class CAboutPlugin extends AApiPlugin
{
	/**
	 * @param CApiPluginManager $oPluginManager
	 */
	public function __construct(CApiPluginManager $oPluginManager)
	{
		parent::__construct('1.0', $oPluginManager);
	}

	public function Init()
	{
		parent::Init();

		$this->SetI18N(true);
		$this->AddJsFile('js/CAboutViewModel.js');
		$this->AddTemplate('AboutTemplate', 'templates/AboutTemplate.html');

		$this->AddJsonHook('AjaxPluginGetAjaxData', 'AjaxPluginGetAjaxData');
	}

	public function AjaxPluginGetAjaxData()
	{
		// fake delay
		sleep(1);
		
		$oAccount = $this->oPluginManager->Actions()->GetCurrentAccount();
		$sInput = $this->oPluginManager->Actions()->getParamValue('Input', '');
		
		return array(
			'Email' => $oAccount->Email,
			'Input' => $sInput,
			'Data' => 'Version: '.PSEVEN_APP_VERSION
		);
	}
}

return new CAboutPlugin($this);
