// Dictionaries
var adjectives = require('../utils/adjectives');
var animals = require('../utils/animals');

// Default ID for offline cases
const defaultId = 1234567890;

// Hash function
function hashID(userId) {
    if (userId && userId != null) {
        var hash = 0;
        if (userId.length == 0) 
            return hash;
        for (i = 0; i < userId.length; i++) {
            char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    } else {
        return defaultId;
    }
}

// Name generator
export function generateName(userId) {
    var hashCode = hashID(userId);
    var adj = adjectives.adjectives;
    var ani = animals.animals;
    // Get adjective
    var adjective = adj[((hashCode % adj.length) + adj.length) % adj.length];
    // Get animal
    var animal = ani[((hashCode % ani.length) + ani.length) % ani.length];
    // Return result
    return adjective + " " + animal;
}

// Online profile generator
export function genOnlineProfImgSrc(id) {
    // Check validity
    if (id) {
        return 'http://flathash.com/' + id;
    } else {
        return 'http://flathash.com/' + defaultId;
    }
}

// Local profile generator
export function genLocalProfImg(id, height, width, props) {
    // TODO: Use real switch case and return image
}



