import { Entity, Column, PrimaryGeneratedColumn, IsNull } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  jobType: string;

  @Column()
  presence: string;

  @Column('json')
  salary: {
    min: number;
    max: number;
    currency: string;
  };

  @Column({ nullable: true })
  createdAt: Date;

  @Column()
  location: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  skills: string[];

  @Column('json')
  company: {
    picture: string;
    name: string;
    email: string;
    about: string;
    phone: string;
    location: string;
    employees: string;
    industry: string;
  };
}
