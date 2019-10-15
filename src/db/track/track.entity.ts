import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    artist: string;

    @Column()
    category: string;

    @Column()
    date: string;

    @Column()
    path: string;

    @Column()
    length: string;
}