# leaflet-challenge

## Background

The United States Geographical Survey, or USGS, is responsible for providing scientific data about natural hazrds, the health of our ecosystems and environment and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant and useful information about the Earth and its processes. 

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Part 1: Create the EArthquake Visualization

Your first task is to visualize an earthquake data set. Complete the following steps:

1. Get your dataset. To do so, follow these steps:
   * The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a data set to visualize.
   * When you click a dataset (such as "All EArthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. 

I decided to use the USGS earthquake data that shows earthquakes of [2.5 magnitude or more over the past 30 days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson).

![image](https://user-images.githubusercontent.com/115905663/230743793-cdc91c92-3133-4f8e-8e63-21a2bcdcb966.png)

2. Import and visualize the data by doing the following:
   
   ![image](https://user-images.githubusercontent.com/115905663/230743865-45174f3f-86c0-41f9-b158-e377ca80c9e0.png)

   * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude. 
     
     ![image](https://user-images.githubusercontent.com/115905663/230743935-6c2ea371-c2af-488b-80df-b9076e1321fc.png)

     * Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color. (The depth of the earth can be found as the third coordinate for each earthquake)
  
     ![image](https://user-images.githubusercontent.com/115905663/230743982-b8bc7cf8-6e93-430a-ac28-ccba9a1f4a54.png)

  * Include popups that provide additional information about the earthquake when its associated marker is clicked. 
   * Create a legend that will provide context for your map data. 
   
   




