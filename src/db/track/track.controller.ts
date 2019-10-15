import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'app/src/app/models/track';


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) { }

    @Get()
    async getAll() {
        return await this.trackService.findAll();
    }

    @Post()
    async insertOne(@Body() track: Track) {
        const result = await this.trackService.insertOne(track);
        return result.identifiers['id'];
    }

    @Delete()
    async deleteTracks(@Query('ids') ids: string) {
        return await this.trackService.deleteOneOrMany(ids.split(','));
    }
}
