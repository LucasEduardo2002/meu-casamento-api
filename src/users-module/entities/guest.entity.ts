import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, default: '' })
  firstname: string;

  @Column({ nullable: true, default: '' })
  lastname: string;

  @Column({ default: false })
  confirmed_presence: boolean;

  @Column({ default: false })
  has_absentees: boolean;

  @Column({ type: 'text', nullable: true })
  absent_names: string | null;

  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ default: 1 })
  guest_count: number;

  @Column({ type: 'text', nullable: true })
  companion_names: string | null;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date | null;
}
