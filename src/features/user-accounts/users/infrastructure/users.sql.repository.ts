import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/user.sql.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersSqlRepository {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async create(newUser: User): Promise<number> {
    const result = await this.dataSource.query(
      `INSERT INTO "users" (id, "login", "password", "email", "createdAt", "confirmationCode", "expirationDate",
                            "isConfirmed")
       values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        newUser.id,
        newUser.login,
        newUser.password,
        newUser.email,
        newUser.createdAt,
        newUser.confirmationCode,
        newUser.expirationDate,
        newUser.isConfirmed,
      ],
    );
    return result[0].id;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.dataSource.query(
      `DELETE
       FROM "users"
       WHERE id = $1`,
      [id],
    );
    return result[1] === 1;
  }

  async findByLoginOrEmail(loginOrEmail: string) {
    const result = await this.dataSource.query(
      `SELECT *
       FROM "users"
       WHERE login = $1
          or email = $1`,
      [loginOrEmail],
    );
    return result.length > 0 ? result[0] : null;
  }

  async findByConfirmationCode(inputCode: string) {
    const result = await this.dataSource.query(
      `SELECT *
       FROM "users"
       WHERE "confirmationCode" = $1
         AND "expirationDate" > NOW()
         AND "isConfirmed" = FALSE`,
      [inputCode],
    );
    return result.length > 0 ? result[0] : null;
  }

  async updateEmailConfirmation(id: string, isConfirmed: boolean) {
    const result = await this.dataSource.query(
      `UPDATE "users"
       SET "isConfirmed" = $1
       WHERE "id" = $2`,
      [isConfirmed, id],
    );
    return result.rowCount !== 0;
  }

  async updateRegistrationConfirmation(
    id: string,
    code: string,
    expirationDate: Date,
  ) {
    const result = await this.dataSource.query(
      `UPDATE "users"
       SET "confirmationCode" = $1,
           "expirationDate"   = $2
       WHERE "id" = $3`,
      [code, expirationDate, id],
    );
    return result.rowCount !== 0;
  }

  async updatePassword(id: string, newPasswordHash: string) {
    const result = await this.dataSource.query(
      `UPDATE "users"
       SET "password" = $1
       WHERE "id" = $2`,
      [newPasswordHash, id],
    );
    return result.rowCount !== 0;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.dataSource.query(
      `SELECT *
       FROM "users" u
       WHERE u.id = $1
      `,
      [id],
    );
    return result[0];
  }

  async findByIdOrNotFoundFail(id: string) {
    const foundUser = await this.findById(id);
    if (!foundUser) {
      throw new UnauthorizedException(`User with id ${id} not found`);
    }
    return foundUser;
  }
}
