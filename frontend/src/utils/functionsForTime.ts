
export function formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }).replace(/ /g, '.').replace(',', '');
}

export function calculateDuration(departureTime: string, arrivalTime: string): string  {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    const diffMs = arrival.getTime() - departure.getTime();

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}:${diffMinutes} hours`;
}

export function parseDuration(duration: string): string {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?$/;
    const match = duration.match(regex);

    if (!match) {
        throw new Error("Invalid duration format");
    }

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return `${hours}:${minutes} hours`;
}