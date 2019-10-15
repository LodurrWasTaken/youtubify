export class Track {
    title: string;
    artist: string;
    category: string;
    length: string;
    date: string;
    path: string;
    id: string;

    constructor({
        title,
        artist,
        category,
        length,
        date,
        path,
        id,
    }) {
        this.title = title;
        this.artist = artist;
        this.category = category;
        this.length = length;
        this.date = date;
        this.path = path;
        this.id = id;
    }
}
