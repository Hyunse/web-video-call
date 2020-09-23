import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text', nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: 'text', nullable: true })
  profilePhoto: string;

  @Column({ type: 'text', nullable: true })
  fbId: String;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashPassword = await this.hassPassword(this.password);
      this.password = hashPassword;
    }
  }

  private hassPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;