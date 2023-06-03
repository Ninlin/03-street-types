from osmnx import geometries_from_place
from shapely.geometry import Polygon
import numpy as np

# get OSM data for the specified city 
city = "Stockholm"
place = city + ", Sweden"
tags = {'highway': ['residential','primary','secondary','tertiary', 'motorway', 'trunk', 
                    'unclassified', 'footway', 'pedestrian', 'living_street']}
roads = geometries_from_place(place, tags=tags)

# Select only relevant columns and view the first rows in the data frame
roads_small = roads[['name','geometry', 'highway', 'ref']]
print(roads_small.head())

# Create a list of conditions 
types = ['slingan','farten','fart','gången','gång','backen','backe','stigen','stig','höjden',
          'höjd','spåret','spår','terrassen','terrass','hamnen','hamn','gatan','gata','leden',
          'led','gränden','gränd','vägen','väg','länken','länk','stranden','strand','bron','bro',
          'kajen','kaj','allén','allé','tunneln','tunnel','plan', 'planen', 'torget','torg',
         'platsen','plats', 'viadukten', 'brinken', 'rondellen', 'rondell', 'promenaden', 'promenad', 
         'udden', 'udde', 'park', 'parken', 'ring', 'ringen']

values = ['slinga','fart','fart','gång','gång','backe','backe','stig','stig','höjd',
          'höjd','spår','spår','terrass','terrass','hamn','hamn','gata','gata','led',
          'led','gränd','gränd','väg','väg','länk','länk','strand','strand','bro','bro',
          'kaj','kaj','allé','allé','tunnel','tunnel','plan', 'plan', 'torg','torg',
          'plats','plats','viadukt', 'brink', 'rondell', 'rondell', 'promenad', 'promenad',
           'udde', 'udde', 'park', 'park', 'ring', 'ring']

roads_small.loc[:, 'name_lower'] = roads_small['name'].astype(str).map(str.lower)
conditions = [roads_small['name_lower'].str.endswith(i, na=False) for i in types]

# Use the numpy select() method to create the category column
roads_small['category'] = np.select(conditions, values)

# Assign unnamed motorways to "led" category 
roads_small.loc[(roads_small['highway'] == 'motorway') & (roads_small['name_lower'] == "nan"), 'category'] = 'led'

# save as geojson
roads_small.to_file("mmdata/" + city.lower() + "_roads.geojson", driver='GeoJSON')b.v 