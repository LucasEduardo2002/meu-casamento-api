import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('gift')
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: ['available', 'claimed', 'confirmed'],
    default: 'available',
  })
  status: 'available' | 'claimed' | 'confirmed';

  @Column({ nullable: true })
  buyer_name: string;

  @Column({ nullable: true })
  buyer_phone: string;

  @Column({
    type: 'enum',
    enum: ['pix', 'external_purchase'],
    nullable: true,
  })
  payment_method: 'pix' | 'external_purchase';

  @Column({ type: 'timestamp', nullable: true })
  claimed_at: Date;
}
