import {Column,Entity,OneToOne,PrimaryGeneratedColumn} from 'typeorm';
import { TaskEntity } from '../task/task.entity';

@Entity()
export class StatusEntity {

  @PrimaryGeneratedColumn()
  @OneToOne(() => TaskEntity, (TaskEntity) => TaskEntity.status)
  id: number;

  @Column({ default: 'pending'})
  title: string;
}
