import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';
import { spawnSync } from 'child_process';
import * as ffmpeg from '@ffmpeg-installer/ffmpeg';

@Injectable()
export class ConverterService {
    async convertToAudio(fileName: string) {
        try {
            spawnSync(ffmpeg.path, [
                '-i',
                `video.mp4`,
                `mp3/${fileName}.mp3`
            ]);
            unlink('video.mp4', () => { });
        } catch (err) {
            return false;
        }

        return true;
    }
}
