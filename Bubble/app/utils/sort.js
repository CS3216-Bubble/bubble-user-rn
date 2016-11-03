export default function roomByTypeLastActive(a, b) {
    // Sticky chat first
    if (a.roomType == 'HOT' && b.roomType != 'HOT') {
        return -1;
    } else if ((b.roomType == 'HOT' && a.roomType != 'HOT')) {
        return 1;
    } else {
        // Chat types are the same, sort by time
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    }
}
