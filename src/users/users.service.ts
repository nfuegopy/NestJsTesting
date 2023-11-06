import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'; //importo bcrypt para el encryptado de la contraseña
import { Transaction } from '../transactions/transaction.entity';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(user: User): Promise<User> {
        // Genero un valor aleatorio
        const salt = await bcrypt.genSalt();
        // Cifrar la contraseña con el valor aleatorio
        user.password = await bcrypt.hash(user.password, salt);
        // Procedemos a guardar el registro
        return this.userRepository.save(user);
    }
    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: number, user: User): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new Error('User not found');
        }
        await this.userRepository.update(id, {
            username: user.username,
            password: user.password

        });
        return this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        const existingUser = await this.userRepository.findOne({ where: { id } });
        if (!existingUser) {
            throw new Error('User not found');
        }
        await this.userRepository.delete(id);
    }

    findOneByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findTransactions(userId: number): Promise<Transaction[]> {
        const userWithTransactions = await this.userRepository.find({
            where: { id: userId },
            relations: ['transactions']
        });

        if (userWithTransactions.length === 0) {
            throw new Error('User not found');
        }

        return userWithTransactions[0].transactions;
    }

}
