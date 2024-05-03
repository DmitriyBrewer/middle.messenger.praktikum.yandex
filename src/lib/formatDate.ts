export function formatDate(dateStr:string) {
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const daysOfWeek = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

    const date = new Date(dateStr);
    const now = new Date();
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];

    if (date.toDateString() === now.toDateString()) {
        return `Сегодня, ${hours}:${minutes}`;
    } else {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        if (date.toDateString() === tomorrow.toDateString()) {
            return `Завтра, ${hours}:${minutes}`;
        } else {
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            if (date.toDateString() === yesterday.toDateString()) {
                return `Вчера, ${hours}:${minutes}`;
            } else {
                return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}, ${dayOfWeek}`;
            }
        }
    }
}
