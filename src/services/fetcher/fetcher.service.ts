import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import * as ytdl from 'ytdl-core';

@Injectable()
export class FetcherService {
    async downloadVideoById(videoUrl: string): Promise<any> {
        let meta;
        const id = videoUrl.split('?v=')[1];
        try {
            const metaData = await ytdl.getInfo(videoUrl);
            meta = {
                artist: metaData.media.artist || 'N/A',
                category: metaData.media.category || 'N/A',
                title: metaData.title,
                date: new Date().toLocaleDateString(),
                id,
                path: `http://localhost:3000/${id}.mp3`,
                length: new Date(Number(metaData.length_seconds) * 1000)
                    .toISOString()
                    .substr(11, 8)
                    .replace(/^[0:]+/, '')
            }
            const ytdlStream = ytdl.downloadFromInfo(metaData);
            const bufferArray = [];
            for await (const chunk of ytdlStream) {
                bufferArray.push(chunk)
            }
            const data = Buffer.concat(bufferArray);
            writeFileSync('video.mp4', data);
        } catch (err) {
            return null;
        }

        return meta;
    }
}
