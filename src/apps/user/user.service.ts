import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from './repositories/user.repository';

/* import { UserRepository } from './repositories/user.repository';
import { RoleService } from '../role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocationPermissionService } from '../location-permission/location-permission.service';
import { RoleName } from '../../common/enums/roles.enum';
import { CodeService } from '../code/code.service';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UserStatus } from './enums/user-status.enum';
import { AmqpService } from '../../providers/amqp/amqp.service';
import { EmailService } from '../email/email.service';
import { EmailConfigService } from '../../configs/email/email.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ChurchService } from '../church/church.service'; */

@Injectable()
export class UserService {
  constructor(
     private readonly dataSource: DataSource,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    /*@InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly roleService: RoleService,
    private readonly amqpService: AmqpService,
    private codeService: CodeService,
    private locationPermissionService: LocationPermissionService,
    private readonly emailService: EmailService,
    private readonly emailConfigService: EmailConfigService,
    private readonly churchService: ChurchService, */
  ) {}
  async verifyRefreshToken(id: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        refreshToken: true,
        role: true,
      },
    });

    if (!user || !user.refreshToken.compareToken(refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token or credentials');
    }

    return user;
  }
/* 
  async findOne(id: string) {
    return this.userRepository.findById(id);
  }

  async createUser(dto: CreateUserDto, adminName: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userToSave = this.userRepository.create({
        ...dto,
        role: { id: dto.role },
      });

      const role = await this.roleService.findOneOrFail(dto.role);

      if (role.name !== RoleName.MASTER) {
        userToSave.locationPermission =
          await this.locationPermissionService.create(
            dto.statesId,
            queryRunner,
          );
      }

      const savedUser = await queryRunner.manager.save(userToSave);
      const code = await this.codeService.createCode({
        user: savedUser,
        queryRunner,
        expiresAt: {
          duration: 24,
          durationInput: 'hours',
        },
      });
      await queryRunner.commitTransaction();
      const user = await this.userRepository.findById(savedUser.id);
      this.amqpService.sendUserCreated(user);

      await this.emailService.sendCreatePasswordEmail({
        to: dto.email,
        name: dto.name,
        url: `${this.emailConfigService.createPasswordUrl}/${code}`,
        admin: adminName,
        role: role.name,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneByCriteriaOrFail({
      id: userId,
    });

    const currentLocationPermissions =
      await this.locationPermissionService.findByUserId(userId);

    const newChurch = await this.churchService.findOneOrFail(dto.church?.id);

    const newRole = await this.roleService.findOneOrFail(dto.role);

    if (newRole.name === RoleName.MASTER) {
      user.locationPermission = [];
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      user.locationPermission = await this.locationPermissionService.create(
        dto.statesId,
        queryRunner,
      );

      user.name = dto.name;
      user.role = newRole;
      user.church = newChurch;

      await this.locationPermissionService.remove(
        currentLocationPermissions,
        queryRunner,
      );

      const updatedUser = await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      const userToSend = await this.userRepository.findById(updatedUser.id);
      this.amqpService.sendUserCreated(userToSend);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createPassword(code: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { userId } = await this.codeService.checkCode(code);
      const user = await this.userRepository.findOneOrFail({
        where: { id: userId },
      });
      user.password = password;
      user.status = UserStatus.ACTIVE;

      await queryRunner.manager.update(User, user.id, user);
      await queryRunner.commitTransaction();

      const userToSend = await this.userRepository.findById(userId);
      this.amqpService.sendUserCreated(userToSend);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async resetPassword({
    oldPassword,
    password,
    userId,
  }: {
    password: string;
    oldPassword: string;
    userId: string;
  }) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userRepository.findOneByIdWithRoles(userId);

      const passwordMatches = user.comparePassword(oldPassword);

      if (!passwordMatches) {
        throw new UnprocessableEntityException('Senha atual está incorreta');
      }

      user.password = password;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      const userToSend = await this.userRepository.findById(userId);
      this.amqpService.sendUserCreated(userToSend);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateLastAccess(id: string) {
    const user = await this.userRepository.update(id, {
      lastLogin: new Date(),
    });

    const userToSend = await this.userRepository.findById(id);
    this.amqpService.sendUserCreated(userToSend);

    return user;
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        refreshToken: true,
      },
    });

    const password = this.refreshTokenRepository.create({
      token: refreshToken,
      user,
    });

    return this.refreshTokenRepository.save(password);
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      const updatedUser = await this.userRepository.save({
        ...user,
        ...dto,
      });

      const userToSend = await this.userRepository.findById(updatedUser.id);
      this.amqpService.sendUserCreated(userToSend);
    } catch (error) {}
  }

  async verifyCode(code: string) {
    await this.codeService.checkCode(code);
  }

  async updateUserStatus(id: string, status: UserStatus) {
    const user = await this.userRepository.findOneByCriteriaOrFail({
      id,
    });

    user.status = status;
    const updatedUser = await this.userRepository.save(user);

    const userToSend = await this.userRepository.findById(updatedUser.id);
    this.amqpService.sendUserCreated(userToSend);
  } */
}
