//sets up click event listenr on calc button to trigger calculateSplits function
document.getElementById('calculate').addEventListener('click', calculateSplits);

function calculateSplits() {
    // Get input values
    const distance = parseFloat(document.getElementById('distance').value); //assigns distance to float number converted from String
    const distanceUnit = document.getElementById('distance-unit').value;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    
    // Calculate total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Calculate pace as seconds per mile or km(unit)
    const pacePerKilo = totalSeconds / distance;
    const pacePerMile = totalSeconds / distance*1.609;
    
    // Calculate number of splits needed based on total distance rounded up
    
    // Generate splits
    const splitsBody = document.getElementById('splits-body');
    splitsBody.innerHTML = '';
    
    let remainingDistance = distance;
    let remainingDistanceM = distance * 1.609; 
    let accumulatedTime = 0;
    let accumulatedTimeM = 0;
    
    for (let i = 0; i < Math.ceil(distance); i++) {
        const row = document.createElement('tr');
        
        // Calculate time for this split
        const splitTime = pacePerKilo;
        accumulatedTime += splitTime;

        const splitTimeM = pacePerMile;
        accumulatedTimeM += splitTime;
        
        // Format distance
        const formattedTotalDistance = `${(distance - remainingDistance + 1).toFixed(2)} ${distanceUnit}`;
        
        // Add cells
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${formatTime(accumulatedTime)}</td>
        `;
        
        splitsBody.appendChild(row);
        
        remainingDistance -= 1;
        if (remainingDistance <= 0) break;
    }
    
    // Display summary information
    document.getElementById('overall-pace').textContent = `Overall Pace: ${formatPace(pacePerKilo, distanceUnit)}`;
    document.getElementById('total-time').textContent = `Total Time: ${formatTime(totalSeconds)}`;
    document.getElementById('total-distance').textContent = `Total Distance: ${distance} ${distanceUnit}`;
    
    // Show results
    document.getElementById('results').style.display = 'block';
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    let timeString = '';
    
    if (hrs > 0) {
        timeString += `${hrs}:`;
        timeString += `${mins < 10 ? '0' : ''}${mins}:`;
    } else {
        timeString += `${mins}:`;
    }
    
    timeString += `${secs < 10 ? '0' : ''}${secs}`;
    
    return timeString;
}

function formatPace(paceInSeconds, unit) {
    const mins = Math.floor(paceInSeconds / 60);
    const secs = Math.floor(paceInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs} per ${unit === 'miles' ? 'mile' : 'km'}`;
}