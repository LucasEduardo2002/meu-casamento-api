import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  firstname: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  lastname: string;

  @Column({ type: 'boolean', default: false })
  confirmed_presence: boolean;

  @Column({ type: 'boolean', default: false })
  has_absentees: boolean;

  @Column({ type: 'text', nullable: true })
  absent_names: string | null;

  @Column({ type: 'varchar', nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'int', default: 1 })
  guest_count: number;

  @Column({ type: 'text', nullable: true })
  companion_names: string | null;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date | null;
}
