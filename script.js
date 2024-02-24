
mapboxgl.accessToken = 'pk.eyJ1IjoibmlubGluIiwiYSI6ImNqanR0Zzc4bzI5b2Ezd2xlb2ZmbzdrOHMifQ.nhMfjVcApf7oZVzhlMnRLA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ninlin/clhzdige402e001pgf3y39h9y',
  zoom: 10,
  maxZoom: 15,
  minZoom: 9
});

const city = 'Stockholm'
$("#title").text(city);


// Function to set the center of the map based on a location name
function setMapCenter(locationName) {
    // Use Mapbox Geocoding API to fetch the coordinates
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${mapboxgl.accessToken}`;
  
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features.length > 0) {
          const centerLngLat = data.features[0].center;
  
          // Update the center of the map
          map.setCenter(centerLngLat);
        } else {
          console.error('Location not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



map.on('load', () => {

    setMapCenter(city + ', Sweden');

   // Add a source for the street geometries
   map.addSource('streets', {
    type: 'geojson',
    data: 'data/'+city.toLowerCase() + '_roads.geojson'
  });

  const layers = [
    {
      id: 'väg',
      category: ['väg']
    },
     {
      id: 'gata',
      category: ['gata', 'gränd' ]
    },
    {
        id: 'led-lanken-tunnel',
        category: [
          'fart',
          'led',
          'länk',
          'tunnel',
          'rondell',
          'viadukt'
        ]
      },
      {
        id: 'bro',
        category: ['hamn', 'strand', 'bro', 'kaj', 'udde']
      },
   
/*
    {
      id: 'gränd',
      category: [
        'slinga',
        'gång',
        'backe',
        'stig',
        'höjd',
        'spår',
        'terrass',
        'gränd'
      ]
    },
    {
        id: 'promenad',
        category: ['promenad', 'allé']
      },

   {
        id: 'torg',
        category: [
            'torg',
            'plan',
            'park',
            'plats'
        ]
      } */
  ];

  const layers2 = [
    {
        id: 'väg2',
        category: ['väg']
      },
      {
        id: 'gata2',
        category: ['gata', 'gränd' ]
      },
      {
        id: 'led-lanken-tunnel2',
        category: [
          'fart',
          'led',
          'länk',
          'tunnel',
          'rondell',
          'viadukt'
        ]
      } ,
      {
        id: 'bro2',
        category: ['hamn', 'strand', 'bro', 'kaj', 'udde']
      }, 
  ];

  const layers3 = [
    {
        id: 'väg3',
        category: ['väg']
      },
      {
        id: 'gata3',
        category: ['gata',  'gränd' ]
      },
      {
        id: 'led-lanken-tunnel3',
        category: [
          'fart',
          'led',
          'länk',
          'tunnel',
          'rondell',
          'viadukt'
        ]
      },
      {
        id: 'bro3',
        category: ['hamn', 'strand', 'bro', 'kaj', 'udde']
      },
   
  ];

  const colors = [
    '#4C44E3',//'#722bb3',//'#45A5B0', // väg
    '#E07F2C',//'#FFE45E', // gata
    '#BF3727',    // '#bd0000', // led
    //'#FFE45E', //'#F9A677', // gränd
    //'#0543B5',//'#FF9472', // promenad
    '#71B5EA', // bro
    //'#45A5B0'//'#E847ae' // park, square
  ];

  const colors2 = [
      '#8158ED',
      '#FEF342',
      '#ED4744',
      '#3197F7'
  ];

  const colors3 = [
    '#FEF9FD',
    '#FEF9FD' , 
    '#ED4744' ,
    '#FEF9FD'
    ] ;

  layers.forEach((layer, index) => {
    map.addLayer({
      id: layer.id,
      type: 'line',
      source: 'streets',
      filter: ['in', 'category', ...layer.category],
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
        
      },
      paint: {
        'line-color': colors[index],
        'line-width': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            9, 1,
            10, 2,
            13, 5,
            16, 20
        ],
        'line-blur': 5,
        'line-opacity': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            9, 0.6,
            13, 0.5,
            16, 0.3
        ]
      }
    });
  });

  layers2.forEach((layer, index) => {
    map.addLayer({
      id: layer.id,
      type: 'line',
      source: 'streets',
      filter: ['in', 'category', ...layer.category],
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
        
      },
      paint: {
        'line-color': colors2[index],
        'line-width': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            9, 0.5,
            10, 1.5,
            13, 2.5,
            16, 10
        ],
        'line-blur': 3,
        'line-opacity': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            10, 0.8,
            13, 0.5,
            16, 0.3
        ]
      }
    });
  });

  layers3.forEach((layer, index) => {
    map.addLayer({
      id: layer.id,
      type: 'line',
      source: 'streets',
      filter: ['in', 'category', ...layer.category],
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
        
      },
      paint: {
        'line-color': colors3[index],
        'line-width': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            9, 0.2,
            10, 0.3,
            13, 1,
            16, 1
        ],
        'line-blur': 1,
        'line-opacity': [
            'interpolate', 
            ['exponential', 2], 
            ['zoom'],
            9, 0.2,
            10, 0.5,
            13, 0.5,
            16, 0.5
        ]
      }
    });
  });


  // create legend

    const names = [
        'väg',
        'gata',
       // 'gränd, stig',
       // 'allé, promenad',
       'led, tunnel',
        'bro, kaj, strand',
        
       // 'park, torg, plan'
      ];


    const legend = document.getElementById('legend');

    names.forEach((layer, i) => {
    const color = colors2[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    });

    const stateLegendEl = document.getElementById('state-legend');
    stateLegendEl.style.display = 'block';
    
});

