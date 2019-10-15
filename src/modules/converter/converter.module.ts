import { Module } from '@nestjs/common';
import { ConverterGateway } from './converter.gateway';
import { FetcherService } from 'src/services/fetcher/fetcher.service';
import { ConverterService } from 'src/services/converter/converter.service';
import { TrackModule } from 'src/db/track/track.module';

@Module({
    imports: [TrackModule],
    providers: [
        ConverterGateway,
        FetcherService,
        ConverterService
    ]
})
export class ConverterModule { }
