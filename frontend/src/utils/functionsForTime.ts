
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

    return date.toLocaleDateString([], {
        month: 'long',
        day: '2-digit'
    });
}

export function calculateDuration(departureTime: string, arrivalTime: string): string  {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    const diffMs = arrival.getTime() - departure.getTime();

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}:${diffMinutes} hours`;
}
