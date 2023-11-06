import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Transaction } from '../transactions/transaction.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.usersService.create(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(+id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(+id);
    }

    @Get(':id/transactions')
    findTransactions(@Param('id') id: string): Promise<Transaction[]> {
        return this.usersService.findTransactions(+id);
    }

}
