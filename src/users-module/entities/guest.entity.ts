import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: false })
  confirmed_presence: boolean;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 1 })
  guest_count: number;

  @Column({ type: 'text', nullable: true })
  companion_names: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date;
}

