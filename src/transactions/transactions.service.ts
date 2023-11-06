import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly usersService: UsersService,
    ) { }

    findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find();
    }

    async create(transactionDto: Transaction, userId: number): Promise<Transaction> {
        console.log('UserId:', userId);  // Debería imprimir el userId correcto ahora
        const user = await this.usersService.findOne(userId);
        console.log('User:', user);  // Debería imprimir el usuario correcto ahora
        if (!user) {
            throw new Error('User not found');
        }
        const transaction = new Transaction();
        transaction.description = transactionDto.description;
        transaction.amount = transactionDto.amount;
        transaction.date = transactionDto.date;
        transaction.user = user;
        return this.transactionRepository.save(transaction);
    }
    findOne(id: number): Promise<Transaction> {
        return this.transactionRepository.findOne({ where: { id } });
    }

    async update(id: number, transaction: Transaction, userId: number): Promise<Transaction> {
        const existingTransaction = await this.transactionRepository.findOne({ where: { id } });
        const user = await this.usersService.findOne(userId);
        if (!existingTransaction || !user) {
            throw new Error('Transaction or User not found');
        }
        existingTransaction.description = transaction.description;
        existingTransaction.amount = transaction.amount;
        existingTransaction.date = transaction.date;
        existingTransaction.user = user;
        return this.transactionRepository.save(existingTransaction);
    }

    async remove(id: number): Promise<void> {
        const existingTransaction = await this.transactionRepository.findOne({ where: { id } });
        if (!existingTransaction) {
            throw new Error('Transaction not found');
        }
        await this.transactionRepository.delete(id);
    }
}
