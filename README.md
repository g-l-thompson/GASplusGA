# GAS plus GA
Using Google Apps Script **(GAS)** to retrieve Google Analytics **(GA)** data.

## Context
GA provides reports about website usage: the number of visitors, pageviews, browser, platform, and much more. Each report is linked to a property -- that is, a web site (or multple web sites) that are configured to share the same GA tracking code.

An organization that has many web site might define a separate property for each site. For example, bigtime.com might have two sites:
* www.bigtime.com - open to the world
* staff.bigtime.com - limied to staff
To keep public use analytics separate from staff use, two different properties are created.

The GA manager for bigtime.com, Middle Mgr, might also manage the GA configuration for a sibling company, smalltime.com, which may have one or more sites. These sites are completely separate from bigtime.com.

In this example, there are two GA profiles, one for bigtime, another for smalltime. But Middle Mgr has a single GA account associated with the two profiles.

To summarize:
* Middle Mgr has a GA **account**
    * ... which is associated  with the bigtime.com **profile**.
        * ... which is also associated with the www.bigtime.com **property**.
        * ... which is also associated with the staff.bigtime.com **property**.
    * ... which is associated  with the smalltime.com **profile**.
        * ... which is also associated with any smalltime.com **properties**.

## The Problem
GA shows reports for a property -- the lowest level in the hierarchy shown above. But there are times when the numbers for multiple properties for a simgle profile need to be combined for analysis. GA doesn't provide a way to do that within the GA interface.

## A solution: Google Apps Script (GAS)
Google provides a javascript framework at [script.google.com](https://script.google.com/). A script can be linked to a spreadsheet or other document.

This project pulls GA data from **multiple properties linked to a single profile** and combines the results into a spreadsheet on Google Drive.

This project does **not** combine data from **multiple profiles**.
