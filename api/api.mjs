import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { Server } from 'socket.io';

// Create a SerialPort instance
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });

// Create a parser to read lines from the serial port
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Create a WebSocket server using socket.io
const io = new Server(8080, {
    cors: {
        origin: '*', // Allow all origins (you can restrict this in production)
    },
});

// Object to hold the parsed GPS data
let gpsData = {
    latitude: null,
    longitude: null,
    speed: null,
    fixQuality: null,
    satellites: null,
    altitude: null,
    timestamp: null,
    bearing: null,
    fix: null,
    hdop: null,
    vdop: null,
    pdop: null,
};

// Function to parse NMEA sentences
function parseNMEASentence(sentence) {
    const type = sentence.substring(1, 6); // Extract the sentence type (e.g., GPGGA, GPVTG)

    if (type === 'GPGGA') {
        // Parse GPGGA sentence (Global Positioning System Fix Data)
        const parts = sentence.split(',');
        if (parts.length >= 10) {
            gpsData.timestamp = parts[1]; // UTC time
            gpsData.latitude = parseLatLong(parts.slice(2, 4).join(",")); // Latitude
            gpsData.longitude = parseLatLong(parts.slice(4, 6).join(",")); // Longitude
            gpsData.fixQuality = parseInt(parts[6]); // Fix quality
            gpsData.satellites = parseInt(parts[7]); // Number of satellites
            gpsData.altitude = parseFloat(parts[9]); // Altitude in meters
        }
    } else if (type === 'GPVTG') {
        // Parse GPVTG sentence (Track Made Good and Ground Speed)
        const parts = sentence.split(',');
        if (parts.length >= 9) {
            gpsData.speed = parseFloat(parts[7]); // Speed in kilometers per hour
            gpsData.bearing = parseFloat(parts[1]); // Bearing in degrees (true north)
        }
    } else if (type === 'GPGSA') {
        const parts = sentence.split(',');
        if (parts.length >= 17) {
            gpsData.fix = parseFloat(parts[2]); // HDOP value
            gpsData.hdop = parseFloat(parts[15]); // HDOP value
            gpsData.vdop = parseFloat(parts[16]); // HDOP value
            gpsData.pdop = parseFloat(parts[17]); // HDOP value
        }
    }
}

// Function to convert NMEA latitude/longitude format to decimal degrees

const parseLatLong = (nmeaString) => {
    console.log(nmeaString);
    // Extract numeric value and direction (N/S or E/W)
    const match = nmeaString.match(/^(\d+\.\d+),([NSWE])$/);
    if (!match) throw new Error("Invalid NMEA format");

    let [_, value, direction] = match;
    value = parseFloat(value);

    // Extract degrees and minutes
    let degrees = Math.floor(value / 100);
    let minutes = value % 100;

    // Convert to decimal degrees
    let decimalDegrees = degrees + (minutes / 60);

    // Apply negative sign for South or West
    if (direction === 'S' || direction === 'W') {
        decimalDegrees *= -1;
    }

    return decimalDegrees;

    // Example usage:
    // console.log(nmeaToDecimal("1332.31163,S")); // Output: -13.5385271667
    // console.log(nmeaToDecimal("07156.31614,W")); // Output: -71.9386023333
};


// Listen for data from the serial port
parser.on('data', (line) => {
    // console.log(`Received: ${line}`); // Log raw NMEA sentence
    try {
        parseNMEASentence(line); // Parse the sentence
        console.clear()
        console.log(gpsData);
        io.emit('gpsData', gpsData);
    } catch (error) {
        console.error('Error parsing NMEA sentence:', error);
    }
    // Emit the parsed data to WebSocket clients
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.emit('gpsData', gpsData); // Send current data to the new client

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Handle serial port errors
port.on('error', (err) => {
    console.error('Serial port error:', err);
});

console.log('Server on port 8080. Waiting for GPS data...');