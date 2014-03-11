GoogleCalendarTimezoneSwitcher
==============================

A userscript/content script that allows fast switching of the alternate timezone
displayed in Google Calendar. Helpful if you are scheduling meetings with folks
in 2 or more remote time zones, as you can more easily change the display among
a set of remote timezones.

More info, including screenshots, at http://linuxforlovers.wordpress.com/2014/03/11/google-calendar-timezone-switcher/.

Requirements
------------

This script works with Google Calendar and assumes you have the *Additional time
zone* display enabled (see https://support.google.com/calendar/answer/179200 for
how to do this).

Installation
------------

In Chrome, visit the chrome://chrome/extensions page and then drag-and-drop
gctzs.user.js onto that page. Click the *Add* button to install the
script. You'll need to refresh your Google Calendar tab(s) for the script to
take effect.

See
http://stackoverflow.com/questions/5258989/manually-adding-a-userscript-to-google-chrome
for more details.

This script may also work in Firefox via Greasemonkey, but I've only tested with
Chrome 33.0 on Mac OSX.

Modifying
---------

You can modify the list of timezones that are displayed with these steps:

1. Visit http://momentjs.com/timezone/data/, select the timezones, and copy the *Browser* output into the script where it says *EDITING STEP 1*.
2. Edit the *TZ_OF_LABEL* dictionary (where the script says *EDITING STEP 2*) to include your new timezones and/or abbreviations. Note that the timezone must be a standard timezone identifier string (see [Wikipedia](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) and [moment.js](http://momentjs.com/timezone/data/) for a list)
3. Reload your updates by un-checking and then re-checking the *Enabled* checkbox for the script on the Chrome extensions page (chrome://chrome/extensions).
4. Refresh your Google Calendar tab(s) for your changes to take effect.