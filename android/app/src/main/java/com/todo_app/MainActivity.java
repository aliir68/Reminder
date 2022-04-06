package com.todo_app;

import android.os.Bundle; // here
import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
      sharedI18nUtilInstance.forceRTL(this,true);
      sharedI18nUtilInstance.allowRTL(this,true);
  }



  @Override
  protected String getMainComponentName() {
    return "todo_app";
  }
}
