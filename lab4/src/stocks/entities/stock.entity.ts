import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    src: string;

    @Column()
    title: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    price: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    age_rating: string;
} 

