import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: string;

  @Column({ default: 'pendiente' })
  estado: string; // "pendiente", "en progreso", "completado"
}

