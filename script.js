// Variable to keep track of SOS counts for each disaster
let sosCounts = {
    Floods: 0,
    Earthquakes: 0,
    Hurricanes: 0,
    Tsunamis: 0,
    Wildfires: 0,
    Volcanoes: 0
};

// Variable to keep track of SOS locations
let sosLocations = {
    Floods: [],
    Earthquakes: [],
    Hurricanes: [],
    Tsunamis: [],
    Wildfires: [],
    Volcanoes: []
};

// Function to navigate to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Function to get the current location
function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            callback({ latitude, longitude });
        }, () => {
            alert('Unable to retrieve your location.');
            callback(null);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
        callback(null);
    }
}

// Function to increment SOS count and record the location
function sendSOS(disasterType) {
    if (sosCounts[disasterType] !== undefined) {
        getCurrentLocation(location => {
            if (location) {
                sosCounts[disasterType]++;
                sosLocations[disasterType].push(location);
                alert('SOS sent for ' + disasterType + '!');
                saveSOSCounts();  // Save updated SOS counts and locations to local storage
            }
        });
    }
}

// Function to save SOS counts and locations to localStorage
function saveSOSCounts() {
    localStorage.setItem('sosCounts', JSON.stringify(sosCounts));
    localStorage.setItem('sosLocations', JSON.stringify(sosLocations));
}

// Function to load SOS counts and locations from localStorage
function loadSOSCounts() {
    const savedCounts = localStorage.getItem('sosCounts');
    const savedLocations = localStorage.getItem('sosLocations');
    if (savedCounts) {
        sosCounts = JSON.parse(savedCounts);
    }
    if (savedLocations) {
        sosLocations = JSON.parse(savedLocations);
    }
}

// Function to display SOS counts and locations on the SOS page
function displaySOSCount() {
    // Make sure the counts and locations are loaded first
    loadSOSCounts();

    // Update the count display elements with the correct values
    document.getElementById('floodCount').textContent = sosCounts.Floods;
    document.getElementById('earthquakeCount').textContent = sosCounts.Earthquakes;
    document.getElementById('hurricaneCount').textContent = sosCounts.Hurricanes;
    document.getElementById('tsunamiCount').textContent = sosCounts.Tsunamis;
    document.getElementById('wildfireCount').textContent = sosCounts.Wildfires;
    document.getElementById('volcanoCount').textContent = sosCounts.Volcanoes;

    // Display the locations for each disaster
    document.getElementById('floodLocations').textContent = formatLocations(sosLocations.Floods);
    document.getElementById('earthquakeLocations').textContent = formatLocations(sosLocations.Earthquakes);
    document.getElementById('hurricaneLocations').textContent = formatLocations(sosLocations.Hurricanes);
    document.getElementById('tsunamiLocations').textContent = formatLocations(sosLocations.Tsunamis);
    document.getElementById('wildfireLocations').textContent = formatLocations(sosLocations.Wildfires);
    document.getElementById('volcanoLocations').textContent = formatLocations(sosLocations.Volcanoes);

    // Display the SOS count section
    document.getElementById('sosCountDisplay').style.display = 'block';
}

// Function to format locations array for display
function formatLocations(locations) {
    if (locations.length === 0) {
        return 'No locations recorded.';
    }
    return locations.map(loc => `Lat: ${loc.latitude.toFixed(2)}, Lon: ${loc.longitude.toFixed(2)}`).join('; ');
}

// Function to reset SOS counts and locations to 0
function resetSOSCount() {
    if (confirm('Are you sure you want to reset all SOS counts?')) {
        sosCounts = {
            Floods: 0,
            Earthquakes: 0,
            Hurricanes: 0,
            Tsunamis: 0,
            Wildfires: 0,
            Volcanoes: 0
        };
        sosLocations = {
            Floods: [],
            Earthquakes: [],
            Hurricanes: [],
            Tsunamis: [],
            Wildfires: [],
            Volcanoes: []
        };
        saveSOSCounts();
        displaySOSCount();
        alert('SOS counts and locations have been reset.');
    }
}

// Call the load function on page load to ensure the data persists
window.onload = function() {
    loadSOSCounts();
};
