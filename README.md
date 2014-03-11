GoogleCalendarTimezoneSwitcher
==============================

A userscript/content script that allows fast switching of the alternate timezone
displayed in Google Calendar. Helpful if you are scheduling meetings with folks
in 2 or more remote time zones, as you can more easily change the display among
a set of remote timezones.

Requirements
------------

This script works with Google Calendar and assumes you have the "Additional time
zone" display enabled ("Settings" -> "Your current time zone" -> check the
"Display all time zones" box).

Installation
------------

In Chrome, visit chrome://chrome/extensions page and then drag-and-drop
gctzs.user.js onto that page.

See
http://stackoverflow.com/questions/5258989/manually-adding-a-userscript-to-google-chrome
for more details.

This script may also work in Firefox via Greasemonkey, but I haven't tested
that.

Modifying
---------

You can modify the list of timezones that are displayed with these steps:

1. Visit http://momentjs.com/timezone/data/, select the timezones, and copy the *Browser* output into the script where it says *EDITING STEP 1*.
2. Edit the *TZ_OF_LABEL* dictionary (where the script says *EDITING STEP 2*) to include your new timezones and/or abbreviations.
3. Reload your updates by un-checking and then re-checking the *Enabled* checkbox for the script on the Chrome extensions page (chrome://chrome/extensions).