import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { FetcherService } from 'src/services/fetcher/fetcher.service';
import { ConverterService } from 'src/services/converter/converter.service';
import { Socket } from 'dgram';
import { TrackService } from 'src/db/track/track.service';

@WebSocketGateway()
export class ConverterGateway {
    @WebSocketServer() server;

    constructor(
        private readonly fetcherService: FetcherService,
        private readonly converterService: ConverterService,
        private readonly trackService: TrackService,
    ) { }

    @SubscribeMessage('onConvert')
    async onConvert(client: Socket, videoUrl: string) {
        const meta = await this.fetcherService.downloadVideoById(videoUrl);
        if (meta) {
            await this.converterService.convertToAudio(meta.id);
            this.trackService.insertOne(meta);
            client.emit('onDone', meta);
        }
    }
}