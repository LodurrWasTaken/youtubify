import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(Track)
        private readonly trackRepository: Repository<Track>,
    ) { }

    findAll(): Promise<Track[]> {
        return this.trackRepository.find();
    }

    insertOne(track: Track): Promise<InsertResult> {
        return this.trackRepository.insert(track);
    }

    deleteOneOrMany(ids: string[]): Promise<DeleteResult> {
        return this.trackRepository.delete(ids);
    }
}