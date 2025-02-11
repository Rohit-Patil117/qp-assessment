import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  @Exclude()
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
