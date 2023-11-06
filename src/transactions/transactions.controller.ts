import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Get()
    findAll(): Promise<Transaction[]> {
        return this.transactionsService.findAll();
    }

    @Post()
    async create(
        @Body() createTransactionDto: Transaction,
        @Body('userId') userId: number,
    ): Promise<Transaction> {
        return this.transactionsService.create(createTransactionDto, userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Transaction> {
        return this.transactionsService.findOne(+id);
    }


    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() transaction: Transaction,
        @Query('userId') userId: number
    ): Promise<Transaction> {
        return this.transactionsService.update(+id, transaction, userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.transactionsService.remove(+id);
    }
}
