import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEntity } from '../status/status.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column({
    
  })
  @OneToOne(()=>StatusEntity,StatusEntity=>StatusEntity.id)
  @JoinColumn()
  status: number;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.tasks)
  user: number;
}
