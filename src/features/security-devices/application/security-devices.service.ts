import { Injectable } from '@nestjs/common';
import { SecurityDevicesRepository } from '../infrastructure/security-devices.repository';

@Injectable()
export class SecurityDevicesService {
  constructor(
    private readonly securityDevicesRepository: SecurityDevicesRepository,
  ) {}
}